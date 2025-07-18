'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, Users, Headphones } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebAnalytics from '../components/WebAnalytics';
import StructuredData from '../components/StructuredData';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.methods.email.title'),
      description: t('contact.methods.email.description'),
      value: 'soporte@enlacepro.com',
      action: 'mailto:soporte@enlacepro.com',
      actionText: t('contact.methods.email.action')
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: t('contact.methods.chat.title'),
      description: t('contact.methods.chat.description'),
      value: t('contact.methods.chat.hours'),
      action: '#',
      actionText: t('contact.methods.chat.action')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.methods.phone.title'),
      description: t('contact.methods.phone.description'),
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      actionText: t('contact.methods.phone.action')
    }
  ];

  const supportTopics = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t('contact.topics.account.title'),
      description: t('contact.topics.account.description'),
      responseTime: t('contact.topics.account.responseTime')
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: t('contact.topics.technical.title'),
      description: t('contact.topics.technical.description'),
      responseTime: t('contact.topics.technical.responseTime')
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t('contact.topics.billing.title'),
      description: t('contact.topics.billing.description'),
      responseTime: t('contact.topics.billing.responseTime')
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
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.form.title')}
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t('contact.form.successMessage')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {t('contact.form.errorMessage')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.type')}
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">{t('contact.form.types.general')}</option>
                    <option value="technical">{t('contact.form.types.technical')}</option>
                    <option value="billing">{t('contact.form.types.billing')}</option>
                    <option value="feature">{t('contact.form.types.feature')}</option>
                    <option value="partnership">{t('contact.form.types.partnership')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('contact.methods.title')}
                </h3>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{method.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                        <p className="text-gray-800 font-medium mb-2">{method.value}</p>
                        <a
                          href={method.action}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {method.actionText}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Topics */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('contact.topics.title')}
                </h3>
                <div className="space-y-6">
                  {supportTopics.map((topic, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6">
                      <div className="flex items-center mb-2">
                        <div className="text-blue-600 mr-3">
                          {topic.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{topic.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {topic.responseTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('contact.office.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">{t('contact.office.address.title')}</p>
                      <p className="text-gray-600 text-sm">{t('contact.office.address.line1')}</p>
                      <p className="text-gray-600 text-sm">{t('contact.office.address.line2')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium">{t('contact.office.hours.title')}</p>
                      <p className="text-gray-600 text-sm">{t('contact.office.hours.weekdays')}</p>
                      <p className="text-gray-600 text-sm">{t('contact.office.hours.weekends')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('contact.faq.subtitle')}
            </p>
            <Link
              href="/tutoriales"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg border-2 border-blue-600"
            >
              {t('contact.faq.viewAll')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}