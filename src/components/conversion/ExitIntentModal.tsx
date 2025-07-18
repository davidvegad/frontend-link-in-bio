'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Clock, Star } from 'lucide-react';
import { useExitIntent } from '@/hooks/useExitIntent';
import { cn } from '@/lib/utils';

interface ExitIntentModalProps {
  onClose?: () => void;
  onConvert?: (email: string) => void;
  className?: string;
}

export default function ExitIntentModal({ 
  onClose, 
  onConvert,
  className 
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isTriggered, reset } = useExitIntent({ 
    onlyOnce: true,
    sensitivity: 15 
  });

  useEffect(() => {
    if (isTriggered) {
      setIsVisible(true);
      
      // Track event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_triggered', {
          event_category: 'engagement',
          event_label: 'exit_intent_modal'
        });
      }
    }
  }, [isTriggered]);

  const handleClose = () => {
    setIsVisible(false);
    reset();
    onClose?.();
    
    // Track close event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exit_intent_closed', {
        event_category: 'engagement',
        event_label: 'modal_closed'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      onConvert?.(email);
      
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_conversion', {
          event_category: 'conversion',
          event_label: 'email_signup',
          value: 1
        });
      }

      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch (error) {
      console.error('Failed to submit email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-black/60 backdrop-blur-sm animate-in fade-in duration-300',
      className
    )}>
      <div 
        className="absolute inset-0"
        onClick={handleClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Espera! No te vayas aún
                </h2>
                <p className="text-gray-600">
                  Recibe una guía exclusiva para crear la página perfecta
                </p>
              </div>

              {/* Offer Details */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3 mb-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Guía gratuita</h3>
                    <p className="text-sm text-gray-600">10 plantillas premium + tips de conversión</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Oferta limitada</h3>
                    <p className="text-sm text-gray-600">Solo para los primeros 100 usuarios</p>
                  </div>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu mejor email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={cn(
                    'w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200',
                    'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
                    'hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    isSubmitting && 'animate-pulse'
                  )}
                >
                  {isSubmitting ? 'Enviando...' : '🎁 Quiero mi guía gratuita'}
                </button>
              </form>

              {/* Trust Signals */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  🔒 100% seguro. No spam. Puedes cancelar en cualquier momento.
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Perfecto! 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                Revisa tu email en los próximos minutos. Te hemos enviado tu guía exclusiva.
              </p>
              <p className="text-sm text-gray-500">
                Mientras tanto, ¿por qué no creas tu página gratis?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}