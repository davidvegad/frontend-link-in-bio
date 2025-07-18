'use client';

import { Check, X, Star, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebAnalytics from '../components/WebAnalytics';
import StructuredData from '../components/StructuredData';

export default function PricingPage() {
  const { t } = useTranslation();

  const plans = [
    {
      id: 'free',
      name: t('pricing.plans.free.name'),
      price: t('pricing.plans.free.price'),
      period: t('pricing.plans.free.period'),
      description: t('pricing.plans.free.description'),
      features: [
        t('pricing.features.linksLimit'),
        t('pricing.features.basicTemplates'),
        t('pricing.features.basicAnalytics'),
        t('pricing.features.mobileFriendly'),
        t('pricing.features.basicCustomization'),
      ],
      limitations: [
        t('pricing.limitations.noCustomDomain'),
        t('pricing.limitations.basicSupport'),
        t('pricing.limitations.limitedAnalytics'),
      ],
      buttonText: t('pricing.plans.free.button'),
      buttonLink: '/crear-pagina-gratis',
      popular: false,
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 'pro',
      name: t('pricing.plans.pro.name'),
      price: t('pricing.plans.pro.price'),
      period: t('pricing.plans.pro.period'),
      description: t('pricing.plans.pro.description'),
      features: [
        t('pricing.features.unlimitedLinks'),
        t('pricing.features.allTemplates'),
        t('pricing.features.advancedAnalytics'),
        t('pricing.features.customDomain'),
        t('pricing.features.advancedCustomization'),
        t('pricing.features.prioritySupport'),
        t('pricing.features.removeWatermark'),
        t('pricing.features.socialIntegration'),
      ],
      limitations: [],
      buttonText: t('pricing.plans.pro.button'),
      buttonLink: '/crear-pagina-gratis?plan=pro',
      popular: true,
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'business',
      name: t('pricing.plans.business.name'),
      price: t('pricing.plans.business.price'),
      period: t('pricing.plans.business.period'),
      description: t('pricing.plans.business.description'),
      features: [
        t('pricing.features.everythingInPro'),
        t('pricing.features.teamCollaboration'),
        t('pricing.features.advancedIntegrations'),
        t('pricing.features.customBranding'),
        t('pricing.features.apiAccess'),
        t('pricing.features.dedicatedSupport'),
        t('pricing.features.customReports'),
        t('pricing.features.whitelabel'),
      ],
      limitations: [],
      buttonText: t('pricing.plans.business.button'),
      buttonLink: '/contactanos?plan=business',
      popular: false,
      icon: <Crown className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData />
      <WebAnalytics />
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('pricing.subtitle')}
            </p>
            
            {/* Money Back Guarantee */}
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Check className="w-4 h-4 mr-2" />
              {t('pricing.guarantee')}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-blue-500 transform scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      {t('pricing.mostPopular')}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-600 ml-2">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.buttonLink}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('pricing.faq.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('pricing.faq.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  question: t('pricing.faq.questions.paymentMethods.question'),
                  answer: t('pricing.faq.questions.paymentMethods.answer')
                },
                {
                  question: t('pricing.faq.questions.cancelAnytime.question'),
                  answer: t('pricing.faq.questions.cancelAnytime.answer')
                },
                {
                  question: t('pricing.faq.questions.freeTrial.question'),
                  answer: t('pricing.faq.questions.freeTrial.answer')
                },
                {
                  question: t('pricing.faq.questions.upgrade.question'),
                  answer: t('pricing.faq.questions.upgrade.answer')
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('pricing.cta.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('pricing.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/crear-pagina-gratis"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  {t('pricing.cta.startFree')}
                </Link>
                <Link
                  href="/contactanos"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  {t('pricing.cta.contactSales')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}