'use client';

import { useState, useEffect } from 'react';
import { X, Zap, Gift, Clock, Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpecialOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  offer: {
    title: string;
    subtitle: string;
    discount: string;
    originalPrice: string;
    salePrice: string;
    features: string[];
    urgencyText: string;
    timeLeft?: number; // seconds
  };
  className?: string;
}

export default function SpecialOfferModal({
  isOpen,
  onClose,
  onAccept,
  offer,
  className
}: SpecialOfferModalProps) {
  const [timeLeft, setTimeLeft] = useState(offer.timeLeft || 0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      
      // Track event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'special_offer_shown', {
          event_category: 'conversion',
          event_label: 'modal_opened'
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleClose = () => {
    setIsAnimating(false);
    onClose();
    
    // Track close event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'special_offer_closed', {
        event_category: 'conversion',
        event_label: 'modal_closed'
      });
    }
  };

  const handleAccept = () => {
    onAccept();
    
    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'special_offer_accepted', {
        event_category: 'conversion',
        event_label: 'offer_accepted',
        value: parseFloat(offer.salePrice.replace('$', ''))
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-black/70 backdrop-blur-sm',
      isAnimating ? 'animate-in fade-in duration-300' : 'animate-out fade-out duration-200',
      className
    )}>
      <div 
        className="absolute inset-0"
        onClick={handleClose}
      />
      
      <div className={cn(
        'relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden',
        isAnimating 
          ? 'animate-in slide-in-from-bottom-4 zoom-in-95 duration-300' 
          : 'animate-out slide-out-to-bottom-4 zoom-out-95 duration-200'
      )}>
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6 relative overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mr-4">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{offer.title}</h2>
                <p className="text-white/90">{offer.subtitle}</p>
              </div>
            </div>

            {/* Timer */}
            {timeLeft > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-bold">¡Oferta termina en:</span>
                  <span className="text-2xl font-mono bg-white/30 px-3 py-1 rounded-lg">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            )}

            {/* Discount Badge */}
            <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
              <Gift className="w-5 h-5 mr-2" />
              {offer.discount} DE DESCUENTO
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-2xl text-gray-500 line-through">
                {offer.originalPrice}
              </span>
              <span className="text-4xl font-bold text-green-600">
                {offer.salePrice}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{offer.urgencyText}</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900 text-center mb-4">
              Lo que obtienes:
            </h3>
            {offer.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">+5,000 usuarios ya aprovecharon esta oferta</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className={cn(
                'w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 transform',
                'bg-gradient-to-r from-green-500 to-green-600 text-white',
                'hover:from-green-600 hover:to-green-700 hover:scale-105',
                'focus:outline-none focus:ring-4 focus:ring-green-300',
                'shadow-lg hover:shadow-xl animate-pulse'
              )}
            >
              🔥 ¡SÍ, QUIERO MI DESCUENTO!
            </button>
            
            <button
              onClick={handleClose}
              className="w-full py-2 px-4 text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              No gracias, prefiero pagar precio completo
            </button>
          </div>

          {/* Trust Signals */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              🔒 Pago 100% seguro • 💰 Garantía de 30 días • ❌ Sin compromisos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}