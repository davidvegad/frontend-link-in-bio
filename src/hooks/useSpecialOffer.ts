'use client';

import { useState, useEffect, useCallback } from 'react';

interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  originalPrice: string;
  salePrice: string;
  features: string[];
  urgencyText: string;
  timeLeft: number; // seconds
  trigger: {
    type: 'time' | 'scroll' | 'exit_intent' | 'page_count';
    value: number; // seconds for time, percentage for scroll, page count for page_count
  };
}

const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'black-friday',
    title: '¡OFERTA ESPECIAL!',
    subtitle: 'Solo por tiempo limitado',
    discount: '70%',
    originalPrice: '$29.99',
    salePrice: '$8.99',
    features: [
      'Páginas ilimitadas',
      'Dominio personalizado incluido',
      'Analytics avanzados',
      'Plantillas premium',
      'Soporte prioritario',
      'Sin anuncios de por vida'
    ],
    urgencyText: '¡Solo quedan 12 horas!',
    timeLeft: 43200, // 12 hours
    trigger: {
      type: 'time',
      value: 30 // Show after 30 seconds
    }
  },
  {
    id: 'scroll-offer',
    title: '¡Te gustó lo que viste!',
    subtitle: 'Oferta exclusiva para ti',
    discount: '50%',
    originalPrice: '$19.99',
    salePrice: '$9.99',
    features: [
      'Todo del plan gratuito',
      'Plantillas premium',
      'Analytics detallados',
      'Soporte por email',
      'Sin marca de agua'
    ],
    urgencyText: 'Oferta válida solo hoy',
    timeLeft: 7200, // 2 hours
    trigger: {
      type: 'scroll',
      value: 75 // Show after scrolling 75%
    }
  }
];

export function useSpecialOffer() {
  const [currentOffer, setCurrentOffer] = useState<SpecialOffer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [shownOffers, setShownOffers] = useState<Set<string>>(new Set());

  // Load shown offers from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('shown_special_offers');
        if (stored) {
          setShownOffers(new Set(JSON.parse(stored)));
        }
        
        const storedPageCount = localStorage.getItem('page_visit_count');
        setPageCount(storedPageCount ? parseInt(storedPageCount, 10) : 0);
      } catch {
        // Ignore errors
      }
    }
  }, []);

  // Increment page count
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newPageCount = pageCount + 1;
      setPageCount(newPageCount);
      localStorage.setItem('page_visit_count', newPageCount.toString());
    }
  }, []);

  // Time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      setMaxScroll(prev => Math.max(prev, scrollPercent));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for offer triggers
  useEffect(() => {
    const checkOffers = () => {
      for (const offer of SPECIAL_OFFERS) {
        if (shownOffers.has(offer.id)) continue;

        let shouldShow = false;

        switch (offer.trigger.type) {
          case 'time':
            shouldShow = timeOnPage >= offer.trigger.value;
            break;
          case 'scroll':
            shouldShow = maxScroll >= offer.trigger.value;
            break;
          case 'page_count':
            shouldShow = pageCount >= offer.trigger.value;
            break;
        }

        if (shouldShow) {
          setCurrentOffer(offer);
          setIsModalOpen(true);
          
          // Mark as shown
          const newShownOffers = new Set(shownOffers);
          newShownOffers.add(offer.id);
          setShownOffers(newShownOffers);
          
          try {
            localStorage.setItem('shown_special_offers', JSON.stringify([...newShownOffers]));
          } catch {
            // Ignore errors
          }
          
          break; // Show only one offer at a time
        }
      }
    };

    checkOffers();
  }, [timeOnPage, maxScroll, pageCount, shownOffers]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const acceptOffer = useCallback(() => {
    if (currentOffer) {
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'special_offer_conversion', {
          event_category: 'conversion',
          event_label: currentOffer.id,
          value: parseFloat(currentOffer.salePrice.replace('$', ''))
        });
      }

      // Redirect to checkout or signup with offer
      window.location.href = `/crear-pagina-gratis?offer=${currentOffer.id}&price=${currentOffer.salePrice}`;
    }
    setIsModalOpen(false);
  }, [currentOffer]);

  const forceShowOffer = useCallback((offerId: string) => {
    const offer = SPECIAL_OFFERS.find(o => o.id === offerId);
    if (offer) {
      setCurrentOffer(offer);
      setIsModalOpen(true);
    }
  }, []);

  const resetOffers = useCallback(() => {
    setShownOffers(new Set());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shown_special_offers');
      localStorage.removeItem('page_visit_count');
    }
    setPageCount(0);
  }, []);

  return {
    currentOffer,
    isModalOpen,
    closeModal,
    acceptOffer,
    forceShowOffer,
    resetOffers,
    stats: {
      timeOnPage,
      maxScroll,
      pageCount,
      shownOffers: [...shownOffers]
    }
  };
}