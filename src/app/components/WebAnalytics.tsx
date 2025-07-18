'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface WebAnalyticsProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export default function WebAnalytics({ 
  googleAnalyticsId = 'G-XXXXXXXXXX', 
  facebookPixelId = 'YOUR_PIXEL_ID' 
}: WebAnalyticsProps) {
  
  useEffect(() => {
    if (typeof window !== 'undefined' && googleAnalyticsId) {
      window.gtag?.('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [googleAnalyticsId]);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackConversion = (conversionType: string, value?: number) => {
    trackEvent('conversion', {
      event_category: 'engagement',
      event_label: conversionType,
      value: value,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackEvent = trackEvent;
      (window as any).trackConversion = trackConversion;
    }
  }, []);

  return (
    <>
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  send_page_view: true
                });
                
                document.addEventListener('click', function(e) {
                  const target = e.target.closest('a[href*="crear-pagina-gratis"]');
                  if (target) {
                    gtag('event', 'cta_click', {
                      event_category: 'engagement',
                      event_label: 'crear_pagina_gratis',
                      page_location: window.location.href
                    });
                  }
                });

                let maxScroll = 0;
                window.addEventListener('scroll', function() {
                  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                  if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                    maxScroll = scrollPercent;
                    gtag('event', 'scroll_depth', {
                      event_category: 'engagement',
                      event_label: scrollPercent + '%',
                      value: scrollPercent
                    });
                  }
                });
              `,
            }}
          />
        </>
      )}

      {facebookPixelId && (
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    trackEvent?: (eventName: string, parameters?: Record<string, any>) => void;
    trackConversion?: (conversionType: string, value?: number) => void;
  }
}