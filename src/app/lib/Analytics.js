'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;


  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  // Guard: don't render or error if GA_ID is missing
  if (!GA_ID) {
    console.warn('NEXT_PUBLIC_GA_ID is not defined');
    return null;
  }
 

  return (
    <>
      {/* Load gtag.js only after hydration */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
