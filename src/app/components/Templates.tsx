'use client';

import { ExternalLink, Heart, Users, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Templates() {
  const { t } = useTranslation();
  
  const templates = [
    {
      id: 1,
      name: t('templates.templateNames.influencerLifestyle'),
      category: t('templates.categories.influencer'),
      description: t('templates.descriptions.influencerLifestyle'),
      preview: '/template-influencer.jpg',
      colors: ['bg-pink-500', 'bg-purple-500', 'bg-blue-500'],
      stats: { likes: '2.4k', users: '150+' },
      features: ['Instagram Stories', 'YouTube Videos', 'Blog Personal', 'Tienda Online']
    },
    {
      id: 2,
      name: t('templates.templateNames.businessPro'),
      category: t('templates.categories.business'),
      description: t('templates.descriptions.businessPro'),
      preview: '/template-business.jpg',
      colors: ['bg-blue-600', 'bg-gray-800', 'bg-green-600'],
      stats: { likes: '3.1k', users: '200+' },
      features: ['Servicios', 'Contacto', 'Portfolio', 'Testimonios']
    },
    {
      id: 3,
      name: t('templates.templateNames.creativeArtist'),
      category: t('templates.categories.art'),
      description: t('templates.descriptions.creativeArtist'),
      preview: '/template-creative.jpg',
      colors: ['bg-orange-500', 'bg-red-500', 'bg-yellow-500'],
      stats: { likes: '1.8k', users: '120+' },
      features: ['Galería', 'Música', 'Eventos', 'Comisiones']
    },
    {
      id: 4,
      name: t('templates.templateNames.foodRestaurant'),
      category: t('templates.categories.restaurant'),
      description: t('templates.descriptions.foodRestaurant'),
      preview: '/template-food.jpg',
      colors: ['bg-red-600', 'bg-orange-600', 'bg-yellow-600'],
      stats: { likes: '2.7k', users: '180+' },
      features: ['Menú', 'Reservas', 'Delivery', 'Reseñas']
    },
    {
      id: 5,
      name: t('templates.templateNames.fitnessCoach'),
      category: t('templates.categories.fitness'),
      description: t('templates.descriptions.fitnessCoach'),
      preview: '/template-fitness.jpg',
      colors: ['bg-green-600', 'bg-blue-600', 'bg-gray-800'],
      stats: { likes: '2.2k', users: '160+' },
      features: ['Programas', 'Nutrición', 'Coaching', 'Comunidad']
    },
    {
      id: 6,
      name: t('templates.templateNames.minimalist'),
      category: t('templates.categories.minimalist'),
      description: t('templates.descriptions.minimalist'),
      preview: '/template-minimal.jpg',
      colors: ['bg-gray-900', 'bg-gray-600', 'bg-gray-400'],
      stats: { likes: '3.5k', users: '250+' },
      features: ['Limpio', 'Rápido', 'Profesional', 'Versátil']
    }
  ];

  const categories = [
    t('templates.categories.all'),
    t('templates.categories.influencer'),
    t('templates.categories.business'),
    t('templates.categories.art'),
    t('templates.categories.restaurant'),
    t('templates.categories.fitness'),
    t('templates.categories.minimalist')
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('templates.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('templates.subtitle')}
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Template Preview */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {/* Placeholder for template preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
                <div className="absolute inset-4 bg-white rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <div className="w-16 h-2 bg-gray-300 rounded mb-1"></div>
                    <div className="w-12 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* Color palette */}
                <div className="absolute top-3 right-3 flex space-x-1">
                  {template.colors.map((color, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${color}`}></div>
                  ))}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {template.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    <ExternalLink className="w-4 h-4 inline mr-2" />
                    {t('templates.actions.preview')}
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="text-gray-400 text-xs px-2 py-1">
                        +{template.features.length - 3} {t('templates.actions.more')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {template.stats.likes}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {template.stats.users}
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    {t('templates.actions.useTemplate')}
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('templates.cta.title')}
            </h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              {t('templates.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/crear-pagina-gratis"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t('templates.cta.createFromScratch')}
              </a>
              <a 
                href="/templates"
                className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {t('templates.cta.viewAll')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}