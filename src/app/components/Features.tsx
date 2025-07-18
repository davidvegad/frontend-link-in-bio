'use client';

import { Palette, Smartphone, BarChart3, Share2, Zap, Shield } from 'lucide-react';
import UrgencyButton from '../../components/conversion/UrgencyButton';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Features() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Palette,
      title: t('features.customDesign.title'),
      description: t('features.customDesign.description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Smartphone,
      title: t('features.responsive.title'),
      description: t('features.responsive.description'),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Share2,
      title: t('features.sharing.title'),
      description: t('features.sharing.description'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Zap,
      title: t('features.quickSetup.title'),
      description: t('features.quickSetup.description'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('features.ctaTitle')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('features.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <UrgencyButton
                href="/crear-pagina-gratis"
                text={t('features.startFree')}
                urgencyType="scarcity"
                variant="primary"
                size="lg"
                spotsLeft={27}
              />
              <a 
                href="/funcionalidades"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {t('features.viewAll')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}