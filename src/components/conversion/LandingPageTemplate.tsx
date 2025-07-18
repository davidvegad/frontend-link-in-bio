'use client';

import { useEffect } from 'react';
import { Star, CheckCircle, ArrowRight, Users, Zap, Shield } from 'lucide-react';
import { conversionAnalytics } from '@/lib/conversion-analytics';
import { cn } from '@/lib/utils';

interface LandingPageConfig {
  title: string;
  description: string;
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    badge: string;
  };
  features: string[];
  testimonial: {
    text: string;
    author: string;
    role: string;
    followers: string;
  };
}

interface LandingPageTemplateProps {
  config: LandingPageConfig;
  source: string;
  utmParams: Record<string, string | undefined>;
}

export default function LandingPageTemplate({ 
  config, 
  source, 
  utmParams 
}: LandingPageTemplateProps) {
  
  useEffect(() => {
    // Track landing page visit
    conversionAnalytics.trackStep('signup-funnel', 'landing-visit', {
      source,
      utm_campaign: utmParams.utm_campaign,
      utm_medium: utmParams.utm_medium,
      utm_content: utmParams.utm_content,
      referrer: utmParams.ref
    });
  }, [source, utmParams]);

  const handleCTAClick = () => {
    conversionAnalytics.trackStep('signup-funnel', 'cta-click', {
      source,
      location: 'hero'
    });
  };

  const getSourceIcon = () => {
    const icons = {
      instagram: '📷',
      tiktok: '🎵',
      youtube: '📺',
      facebook: '👥',
      twitter: '🐦',
      linkedin: '💼'
    };
    return icons[source as keyof typeof icons] || '🔗';
  };

  const getSourceColor = () => {
    const colors = {
      instagram: 'from-pink-500 to-purple-600',
      tiktok: 'from-black to-red-500',
      youtube: 'from-red-500 to-red-600',
      facebook: 'from-blue-600 to-blue-700',
      twitter: 'from-blue-400 to-blue-500',
      linkedin: 'from-blue-700 to-blue-800'
    };
    return colors[source as keyof typeof colors] || 'from-blue-600 to-purple-600';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={cn(
        'relative bg-gradient-to-br text-white py-20 px-4 overflow-hidden',
        getSourceColor()
      )}>
        <div className="container mx-auto">
          {/* Source Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-2xl mr-2">{getSourceIcon()}</span>
              <span className="font-semibold">{config.hero.badge}</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              {config.hero.headline}
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              {config.hero.subheadline}
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 mb-8 text-sm opacity-90">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>50K+ usuarios activos</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span>4.9/5 valoración</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>100% seguro</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              <a
                href={`/crear-pagina-gratis?source=${source}&utm_campaign=${utmParams.utm_campaign || ''}`}
                onClick={handleCTAClick}
                className="group inline-flex items-center bg-white text-gray-900 px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                {config.hero.cta}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Signals */}
            <p className="text-sm opacity-75">
              ✅ Gratis para siempre • ✅ Sin tarjeta requerida • ✅ Setup en 2 minutos
            </p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Todo lo que necesitas para {source === 'instagram' ? 'Instagram' : source === 'tiktok' ? 'TikTok' : source === 'youtube' ? 'YouTube' : source === 'facebook' ? 'Facebook' : source === 'twitter' ? 'Twitter/X' : 'LinkedIn'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                "{config.testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {config.testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{config.testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{config.testimonial.role}</div>
                  <div className="text-blue-600 text-sm font-medium">{config.testimonial.followers}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Usuarios Activos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">2M+</div>
              <div className="text-gray-600">Enlaces Creados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Valoración</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={cn(
        'py-20 text-white text-center',
        `bg-gradient-to-r ${getSourceColor()}`
      )}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar tu {source}?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a miles de creadores que ya están generando más ingresos con EnlacePro
          </p>
          
          <a
            href={`/crear-pagina-gratis?source=${source}&utm_campaign=${utmParams.utm_campaign || ''}`}
            onClick={handleCTAClick}
            className="inline-flex items-center bg-white text-gray-900 px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <Zap className="w-6 h-6 mr-3" />
            {config.hero.cta}
          </a>

          <p className="text-sm mt-6 opacity-75">
            🎉 Oferta especial: 50% descuento en tu primer mes premium
          </p>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 EnlacePro. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}