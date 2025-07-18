'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Star, Users } from 'lucide-react';
import ABTestButton from '../../components/conversion/ABTestButton';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        {/* Top Stats Bar */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">{t('hero.rating')}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
          {/* Contenido de Texto */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              {t('hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                {t('hero.titleHighlight')}
              </span>
              {t('hero.titleEnd')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>
            
            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 text-left">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-lg">{t('hero.freeStart')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-lg">{t('hero.quickSetup')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <ABTestButton 
                testId="hero-cta"
                href="/crear-pagina-gratis"
                trackingGoal="signup_click"
                className="group flex items-center justify-center"
              >
                {t('hero.createFree')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </ABTestButton>
              <Link 
                href="/ver-demo" 
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center"
              >
                {t('hero.viewDemo')}
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm opacity-90">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>{t('hero.activeUsers')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
              <div>
                <span>{t('hero.usedBy')}</span>
              </div>
            </div>
          </div>

          {/* Imagen del Hero */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[2rem] w-80 h-[640px] overflow-hidden">
                  {/* Mock content */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                {t('hero.newBadge')}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                {t('hero.analytics')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="text-center mt-16">
          <p className="text-lg opacity-75 mb-4">
            {t('hero.joinCreators')}
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-sm">{t('hero.asSeenIn')}</div>
            <div className="flex space-x-8">
              <span className="font-semibold">TechCrunch</span>
              <span className="font-semibold">Product Hunt</span>
              <span className="font-semibold">Mashable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formas de fondo decorativas mejoradas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
    </section>
  );
}
