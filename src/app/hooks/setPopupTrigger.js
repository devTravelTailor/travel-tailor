'use client';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const FORM_STATUS_KEY = 'formStatus';
const STATUS = {
  INITIAL: 'initial',
  EXIT_1: 'exit1',
  EXIT_2: 'exit2',
  DONE: 'done',
};

const DELAY_CONFIG = {
  [STATUS.INITIAL]: 10,
  [STATUS.EXIT_1]: 30,
  [STATUS.EXIT_2]: 60,
};

export const usePopupTrigger = (
  excludedRoutes = ['/tnc', '/privacy-policy', '/campaign/*'],
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if current route should be excluded
  const isExcludedRoute = useCallback(() => {
    return excludedRoutes.some((route) => {
      if (route.includes('*')) {
        // Handle wildcard routes like '/campaign/*'
        const baseRoute = route.replace('/*', '');
        return pathname.startsWith(baseRoute);
      }
      return pathname === route;
    });
  }, [pathname, excludedRoutes]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }

    // Don't show popup on excluded routes
    if (isExcludedRoute()) {
      return;
    }

    let status = sessionStorage.getItem(FORM_STATUS_KEY);

    if (!status) {
      status = STATUS.INITIAL;
      sessionStorage.setItem(FORM_STATUS_KEY, status);
    }

    if (status === STATUS.DONE) {
      return;
    }

    const delayInSeconds = DELAY_CONFIG[status];

    if (delayInSeconds) {
      console.log(
        `Setting timer for status: ${status} with delay: ${delayInSeconds}s`,
      );
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delayInSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [isMounted, refreshTrigger, isExcludedRoute]);

  const handleClose = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentStatus = sessionStorage.getItem(FORM_STATUS_KEY);
    let nextStatus = '';

    switch (currentStatus) {
      case STATUS.INITIAL:
        nextStatus = STATUS.EXIT_1;
        break;
      case STATUS.EXIT_1:
        nextStatus = STATUS.EXIT_2;
        break;
      case STATUS.EXIT_2:
        nextStatus = STATUS.DONE;
        break;
      default:
        break;
    }

    if (nextStatus) {
      sessionStorage.setItem(FORM_STATUS_KEY, nextStatus);
    }
    setIsVisible(false);

    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleSuccess = useCallback(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(FORM_STATUS_KEY, STATUS.DONE);
    setIsVisible(false);
  }, []);

  return { isVisible, handleClose, handleSuccess };
};
