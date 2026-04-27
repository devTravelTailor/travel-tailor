'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis for premium, cinematic smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.8, // Slower base scroll duration 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9, // Make standard wheel scroll slightly less aggressive
    });

    const handleScroll = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
          // Lenis smooth scroll method bypassing browser native
          lenis.scrollTo(element, { 
            offset: -96,
            duration: 2.5, // Explicitly slow sweeping duration for anchor links
            easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          }); 
        }
      }
    };
    
    // Attach to all relative anchor links starting with `#`
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleScroll));

    // Clean up
    return () => {
      links.forEach(link => link.removeEventListener('click', handleScroll));
      lenis.destroy();
    };
  }, []);
  
  return null;
}
