'use client';

import { UserPlus, Palette, Share2 } from 'lucide-react';
import UrgencyButton from '../../components/conversion/UrgencyButton';
import { useTranslation } from '@/contexts/LanguageContext';

export default function HowItWorks() {
  const { t } = useTranslation();
  
  const getStepDetails = (stepKey: string) => {
    const details = t(`howItWorks.steps.${stepKey}.details`);
    return Array.isArray(details) ? details : [];
  };

  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: t('howItWorks.steps.step1.title'),
      description: t('howItWorks.steps.step1.description'),
      details: getStepDetails('step1')
    },
    {
      number: '02',
      icon: Palette,
      title: t('howItWorks.steps.step2.title'),
      description: t('howItWorks.steps.step2.description'),
      details: getStepDetails('step2')
    },
    {
      number: '03',
      icon: Share2,
      title: t('howItWorks.steps.step3.title'),
      description: t('howItWorks.steps.step3.description'),
      details: getStepDetails('step3')
    }
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Línea conectora (desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Número del paso */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Lista de características */}
                      <ul className="text-sm text-gray-500 space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center justify-center lg:justify-start">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Flecha conectora (móvil) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('howItWorks.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('howItWorks.cta.subtitle')}
            </p>
            <UrgencyButton
              href="/crear-pagina-gratis"
              text={t('howItWorks.cta.button')}
              urgencyType="social_proof"
              variant="primary"
              size="lg"
              usersViewing={47}
            >
              <UserPlus className="w-5 h-5 ml-2" />
            </UrgencyButton>
            <p className="text-sm text-gray-500 mt-3">
              {t('howItWorks.cta.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}