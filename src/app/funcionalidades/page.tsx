'use client';

import { 
  Palette, 
  BarChart3, 
  Globe, 
  Smartphone, 
  Zap, 
  Shield, 
  Users, 
  Settings,
  Eye,
  Link as LinkIcon,
  Image,
  Share2,
  Bell,
  Code,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Layers,
  Target,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebAnalytics from '../components/WebAnalytics';
import StructuredData from '../components/StructuredData';

export default function FeaturesPage() {
  const { t } = useTranslation();

  const featuresCategories = [
    {
      id: 'design',
      title: t('featuresPage.categories.design.title'),
      description: t('featuresPage.categories.design.description'),
      icon: <Palette className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        {
          icon: <Layers className="w-6 h-6" />,
          title: t('featuresPage.design.templates.title'),
          description: t('featuresPage.design.templates.description')
        },
        {
          icon: <Palette className="w-6 h-6" />,
          title: t('featuresPage.design.customization.title'),
          description: t('featuresPage.design.customization.description')
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: t('featuresPage.design.responsive.title'),
          description: t('featuresPage.design.responsive.description')
        },
        {
          icon: <Image className="w-6 h-6" />,
          title: t('featuresPage.design.media.title'),
          description: t('featuresPage.design.media.description')
        }
      ]
    },
    {
      id: 'analytics',
      title: t('featuresPage.categories.analytics.title'),
      description: t('featuresPage.categories.analytics.description'),
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: t('featuresPage.analytics.realtime.title'),
          description: t('featuresPage.analytics.realtime.description')
        },
        {
          icon: <Target className="w-6 h-6" />,
          title: t('featuresPage.analytics.clicks.title'),
          description: t('featuresPage.analytics.clicks.description')
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: t('featuresPage.analytics.audience.title'),
          description: t('featuresPage.analytics.audience.description')
        },
        {
          icon: <Download className="w-6 h-6" />,
          title: t('featuresPage.analytics.export.title'),
          description: t('featuresPage.analytics.export.description')
        }
      ]
    },
    {
      id: 'management',
      title: t('featuresPage.categories.management.title'),
      description: t('featuresPage.categories.management.description'),
      icon: <Settings className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      features: [
        {
          icon: <LinkIcon className="w-6 h-6" />,
          title: t('featuresPage.management.unlimited.title'),
          description: t('featuresPage.management.unlimited.description')
        },
        {
          icon: <Eye className="w-6 h-6" />,
          title: t('featuresPage.management.preview.title'),
          description: t('featuresPage.management.preview.description')
        },
        {
          icon: <Share2 className="w-6 h-6" />,
          title: t('featuresPage.management.social.title'),
          description: t('featuresPage.management.social.description')
        },
        {
          icon: <Settings className="w-6 h-6" />,
          title: t('featuresPage.management.automation.title'),
          description: t('featuresPage.management.automation.description')
        }
      ]
    },
    {
      id: 'advanced',
      title: t('featuresPage.categories.advanced.title'),
      description: t('featuresPage.categories.advanced.description'),
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      features: [
        {
          icon: <Globe className="w-6 h-6" />,
          title: t('featuresPage.advanced.domain.title'),
          description: t('featuresPage.advanced.domain.description')
        },
        {
          icon: <Code className="w-6 h-6" />,
          title: t('featuresPage.advanced.integrations.title'),
          description: t('featuresPage.advanced.integrations.description')
        },
        {
          icon: <Bell className="w-6 h-6" />,
          title: t('featuresPage.advanced.notifications.title'),
          description: t('featuresPage.advanced.notifications.description')
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: t('featuresPage.advanced.security.title'),
          description: t('featuresPage.advanced.security.description')
        }
      ]
    }
  ];

  const comparisonFeatures = [
    {
      feature: t('featuresPage.comparison.customDomain'),
      free: false,
      pro: true,
      business: true
    },
    {
      feature: t('featuresPage.comparison.analytics'),
      free: 'basic',
      pro: 'advanced',
      business: 'premium'
    },
    {
      feature: t('featuresPage.comparison.templates'),
      free: '10+',
      pro: '50+',
      business: 'unlimited'
    },
    {
      feature: t('featuresPage.comparison.links'),
      free: '20',
      pro: 'unlimited',
      business: 'unlimited'
    },
    {
      feature: t('featuresPage.comparison.support'),
      free: 'email',
      pro: 'priority',
      business: 'dedicated'
    }
  ];

  const testimonialFeatures = [
    {
      user: t('featuresPage.testimonials.maria.name'),
      role: t('featuresPage.testimonials.maria.role'),
      feature: t('featuresPage.testimonials.maria.feature'),
      quote: t('featuresPage.testimonials.maria.quote')
    },
    {
      user: t('featuresPage.testimonials.carlos.name'),
      role: t('featuresPage.testimonials.carlos.role'),
      feature: t('featuresPage.testimonials.carlos.feature'),
      quote: t('featuresPage.testimonials.carlos.quote')
    },
    {
      user: t('featuresPage.testimonials.ana.name'),
      role: t('featuresPage.testimonials.ana.role'),
      feature: t('featuresPage.testimonials.ana.feature'),
      quote: t('featuresPage.testimonials.ana.quote')
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
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('featuresPage.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('featuresPage.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/crear-pagina-gratis"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('featuresPage.cta.try')}
              </Link>
              <Link
                href="/ver-demo"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                {t('featuresPage.cta.demo')}
              </Link>
            </div>
          </div>

          {/* Features Categories */}
          <div className="space-y-20">
            {featuresCategories.map((category, categoryIndex) => (
              <div key={category.id} className="relative">
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} text-white mb-6`}>
                    {category.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {category.title}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-6`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {categoryIndex < featuresCategories.length - 1 && (
                  <div className="mt-20 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('featuresPage.comparison.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('featuresPage.comparison.subtitle')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {t('featuresPage.comparison.feature')}
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {t('featuresPage.comparison.free')}
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {t('featuresPage.comparison.pro')}
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {t('featuresPage.comparison.business')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.feature}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {typeof item.free === 'boolean' ? (
                            item.free ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )
                          ) : (
                            <span className="text-sm text-gray-700">{item.free}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )
                          ) : (
                            <span className="text-sm text-gray-700 font-medium">{item.pro}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {typeof item.business === 'boolean' ? (
                            item.business ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )
                          ) : (
                            <span className="text-sm text-gray-700 font-medium">{item.business}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Feature Testimonials */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('featuresPage.testimonials.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('featuresPage.testimonials.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialFeatures.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.user}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600 font-medium mt-1">{testimonial.feature}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('featuresPage.finalCta.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {t('featuresPage.finalCta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/crear-pagina-gratis"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  {t('featuresPage.finalCta.start')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/precios"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                  {t('featuresPage.finalCta.plans')}
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