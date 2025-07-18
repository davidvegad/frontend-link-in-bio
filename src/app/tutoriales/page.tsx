'use client';

import { useState } from 'react';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Search, 
  Filter,
  Tag,
  ArrowRight,
  CheckCircle,
  Download,
  Video,
  FileText,
  Lightbulb,
  Target,
  Zap,
  Palette,
  BarChart3,
  Settings,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebAnalytics from '../components/WebAnalytics';
import StructuredData from '../components/StructuredData';

export default function TutorialsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: t('tutorials.categories.all'), icon: BookOpen },
    { id: 'getting-started', name: t('tutorials.categories.gettingStarted'), icon: Target },
    { id: 'design', name: t('tutorials.categories.design'), icon: Palette },
    { id: 'analytics', name: t('tutorials.categories.analytics'), icon: BarChart3 },
    { id: 'advanced', name: t('tutorials.categories.advanced'), icon: Settings },
    { id: 'marketing', name: t('tutorials.categories.marketing'), icon: Globe }
  ];

  const tutorials = [
    // Getting Started
    {
      id: 1,
      category: 'getting-started',
      title: t('tutorials.items.quickStart.title'),
      description: t('tutorials.items.quickStart.description'),
      duration: '5 min',
      difficulty: 'beginner',
      type: 'video',
      views: '12.5K',
      rating: 4.9,
      thumbnail: '/tutorials/quick-start.jpg',
      featured: true
    },
    {
      id: 2,
      category: 'getting-started',
      title: t('tutorials.items.firstPage.title'),
      description: t('tutorials.items.firstPage.description'),
      duration: '8 min',
      difficulty: 'beginner',
      type: 'video',
      views: '9.2K',
      rating: 4.8,
      thumbnail: '/tutorials/first-page.jpg'
    },
    {
      id: 3,
      category: 'getting-started',
      title: t('tutorials.items.addLinks.title'),
      description: t('tutorials.items.addLinks.description'),
      duration: '6 min',
      difficulty: 'beginner',
      type: 'guide',
      views: '15.1K',
      rating: 4.9,
      thumbnail: '/tutorials/add-links.jpg'
    },

    // Design
    {
      id: 4,
      category: 'design',
      title: t('tutorials.items.chooseTemplate.title'),
      description: t('tutorials.items.chooseTemplate.description'),
      duration: '10 min',
      difficulty: 'beginner',
      type: 'video',
      views: '8.7K',
      rating: 4.7,
      thumbnail: '/tutorials/choose-template.jpg'
    },
    {
      id: 5,
      category: 'design',
      title: t('tutorials.items.customColors.title'),
      description: t('tutorials.items.customColors.description'),
      duration: '12 min',
      difficulty: 'intermediate',
      type: 'guide',
      views: '6.3K',
      rating: 4.8,
      thumbnail: '/tutorials/custom-colors.jpg'
    },
    {
      id: 6,
      category: 'design',
      title: t('tutorials.items.mobileOptimization.title'),
      description: t('tutorials.items.mobileOptimization.description'),
      duration: '15 min',
      difficulty: 'intermediate',
      type: 'video',
      views: '7.9K',
      rating: 4.6,
      thumbnail: '/tutorials/mobile-optimization.jpg'
    },

    // Analytics
    {
      id: 7,
      category: 'analytics',
      title: t('tutorials.items.understandAnalytics.title'),
      description: t('tutorials.items.understandAnalytics.description'),
      duration: '14 min',
      difficulty: 'intermediate',
      type: 'guide',
      views: '5.4K',
      rating: 4.9,
      thumbnail: '/tutorials/analytics.jpg'
    },
    {
      id: 8,
      category: 'analytics',
      title: t('tutorials.items.trackConversions.title'),
      description: t('tutorials.items.trackConversions.description'),
      duration: '18 min',
      difficulty: 'advanced',
      type: 'video',
      views: '3.8K',
      rating: 4.7,
      thumbnail: '/tutorials/conversions.jpg'
    },

    // Advanced
    {
      id: 9,
      category: 'advanced',
      title: t('tutorials.items.customDomain.title'),
      description: t('tutorials.items.customDomain.description'),
      duration: '20 min',
      difficulty: 'advanced',
      type: 'guide',
      views: '4.2K',
      rating: 4.8,
      thumbnail: '/tutorials/custom-domain.jpg'
    },
    {
      id: 10,
      category: 'advanced',
      title: t('tutorials.items.apiIntegration.title'),
      description: t('tutorials.items.apiIntegration.description'),
      duration: '25 min',
      difficulty: 'advanced',
      type: 'guide',
      views: '2.1K',
      rating: 4.6,
      thumbnail: '/tutorials/api-integration.jpg'
    },

    // Marketing
    {
      id: 11,
      category: 'marketing',
      title: t('tutorials.items.socialMediaStrategy.title'),
      description: t('tutorials.items.socialMediaStrategy.description'),
      duration: '16 min',
      difficulty: 'intermediate',
      type: 'video',
      views: '11.2K',
      rating: 4.9,
      thumbnail: '/tutorials/social-strategy.jpg'
    },
    {
      id: 12,
      category: 'marketing',
      title: t('tutorials.items.seoOptimization.title'),
      description: t('tutorials.items.seoOptimization.description'),
      duration: '22 min',
      difficulty: 'advanced',
      type: 'guide',
      views: '6.7K',
      rating: 4.7,
      thumbnail: '/tutorials/seo.jpg'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'guide': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

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
              {t('tutorials.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('tutorials.subtitle')}
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('tutorials.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                {t('tutorials.filter')}
              </button>
            </div>
          </div>

          {/* Featured Tutorials */}
          {selectedCategory === 'all' && searchTerm === '' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                {t('tutorials.featured')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredTutorials.map((tutorial) => (
                  <div key={tutorial.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {t('tutorials.featured')}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/20 text-white px-2 py-1 rounded-full text-xs flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {tutorial.duration}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          {getTypeIcon(tutorial.type)}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {t(`tutorials.difficulty.${tutorial.difficulty}`)}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {tutorial.rating}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                      <p className="text-gray-600 mb-4">{tutorial.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{tutorial.views} views</span>
                        <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                          {t('tutorials.watch')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-600"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/20 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {tutorial.duration}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      {getTypeIcon(tutorial.type)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                      {t(`tutorials.difficulty.${tutorial.difficulty}`)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {tutorial.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{tutorial.views} views</span>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      {t('tutorials.watch')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('tutorials.noResults.title')}</h3>
              <p className="text-gray-600">{t('tutorials.noResults.description')}</p>
            </div>
          )}

          {/* Learning Path Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('tutorials.learningPath.title')}
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {t('tutorials.learningPath.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/crear-pagina-gratis"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  {t('tutorials.learningPath.start')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  {t('tutorials.learningPath.download')}
                </button>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('tutorials.help.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('tutorials.help.subtitle')}
            </p>
            <Link
              href="/contactanos"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              {t('tutorials.help.contact')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}