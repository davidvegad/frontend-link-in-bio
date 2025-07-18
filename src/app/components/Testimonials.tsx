'use client';

import { Star, Quote } from 'lucide-react';
import RotatingTestimonials from '../../components/conversion/RotatingTestimonials';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Testimonials() {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      id: 1,
      name: t('testimonials.users.maria.name'),
      role: t('testimonials.users.maria.role'),
      company: '@mariavibe',
      image: '/testimonial-maria.jpg',
      rating: 5,
      testimonial: t('testimonials.users.maria.testimonial'),
      metrics: t('testimonials.users.maria.metric')
    },
    {
      id: 2,
      name: t('testimonials.users.carlos.name'),
      role: t('testimonials.users.carlos.role'),
      company: 'FitLife Training',
      image: '/testimonial-carlos.jpg',
      rating: 5,
      testimonial: t('testimonials.users.carlos.testimonial'),
      metrics: t('testimonials.users.carlos.metric')
    },
    {
      id: 3,
      name: t('testimonials.users.ana.name'),
      role: t('testimonials.users.ana.role'),
      company: 'AnaCreativa',
      image: '/testimonial-ana.jpg',
      rating: 5,
      testimonial: t('testimonials.users.ana.testimonial'),
      metrics: t('testimonials.users.ana.metric')
    },
    {
      id: 4,
      name: t('testimonials.users.luis.name'),
      role: t('testimonials.users.luis.role'),
      company: '@luismusic',
      image: '/testimonial-luis.jpg',
      rating: 5,
      testimonial: t('testimonials.users.luis.testimonial'),
      metrics: t('testimonials.users.luis.metric')
    },
    {
      id: 5,
      name: t('testimonials.users.sofia.name'),
      role: t('testimonials.users.sofia.role'),
      company: 'Sabores Únicos',
      image: '/testimonial-sofia.jpg',
      rating: 5,
      testimonial: t('testimonials.users.sofia.testimonial'),
      metrics: t('testimonials.users.sofia.metric')
    },
    {
      id: 6,
      name: t('testimonials.users.pedro.name'),
      role: t('testimonials.users.pedro.role'),
      company: 'Digital Growth',
      image: '/testimonial-pedro.jpg',
      rating: 5,
      testimonial: t('testimonials.users.pedro.testimonial'),
      metrics: t('testimonials.users.pedro.metric')
    }
  ];

  const stats = [
    { number: '50K+', label: t('testimonials.stats.activeUsers') },
    { number: '2M+', label: t('testimonials.stats.linksCreated') },
    { number: '99.9%', label: t('testimonials.stats.uptimeGuaranteed') },
    { number: '4.9/5', label: t('testimonials.stats.averageRating') }
  ];
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.originalSubtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Rotating Testimonials */}
        <div className="mb-16">
          <RotatingTestimonials />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-blue-600 opacity-50" />
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.testimonial}"
              </p>

              {/* Metric Badge */}
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {testimonial.metrics}
              </div>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                  {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-blue-600 text-sm font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('testimonials.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('testimonials.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/crear-pagina-gratis"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('testimonials.cta.createPage')}
              </a>
              <a 
                href="/testimonios"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {t('testimonials.cta.viewMore')}
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {t('testimonials.cta.rating')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}