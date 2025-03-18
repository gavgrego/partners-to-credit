'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function GA() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-578C069X6P`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-578C069X6P');

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
