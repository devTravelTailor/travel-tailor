'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from './gtm'; 

export default function Gtag() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  return null; 
}