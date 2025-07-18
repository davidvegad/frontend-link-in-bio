'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import { lazy, Suspense, useEffect } from 'react';
import { conversionAnalytics } from '@/lib/conversion-analytics';

// Lazy load components for better performance
const Features = lazy(() => import('./components/Features'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Templates = lazy(() => import('./components/Templates'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import LoadingSpinner from './components/LoadingSpinner';
import WebAnalytics from './components/WebAnalytics';
import ExitIntentModal from '../components/conversion/ExitIntentModal';
import SpecialOfferModal from '../components/conversion/SpecialOfferModal';
import LiveChatWidget from '../components/conversion/LiveChatWidget';
import { useSpecialOffer } from '@/hooks/useSpecialOffer';

export default function HomePage() {
  const { 
    currentOffer, 
    isModalOpen, 
    closeModal, 
    acceptOffer 
  } = useSpecialOffer();

  useEffect(() => {
    // Initialize conversion tracking
    conversionAnalytics.initializePageTracking();
  }, []);

  const handleExitIntentConversion = (email: string) => {
    console.log('Exit intent conversion:', email);
    // Track exit intent conversion
    conversionAnalytics.trackConversion('engagement-funnel', 1, {
      conversion_type: 'exit_intent_email',
      email
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <WebAnalytics />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <div id="features-section">
            <Features />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <div id="templates-section">
            <Templates />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <FAQ />
        </Suspense>
      </main>
      <Footer />
      <ExitIntentModal onConvert={handleExitIntentConversion} />
      {currentOffer && (
        <SpecialOfferModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAccept={acceptOffer}
          offer={currentOffer}
        />
      )}
      <LiveChatWidget />
    </div>
  );
}
