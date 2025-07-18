'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/LanguageContext';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  testimonial: string;
  metrics: string;
  video?: string; // URL to video testimonial
  featured?: boolean;
}

// Testimonials will be dynamically populated using translations

interface RotatingTestimonialsProps {
  autoRotate?: boolean;
  rotationInterval?: number; // milliseconds
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
}

export default function RotatingTestimonials({
  autoRotate = true,
  rotationInterval = 5000,
  showControls = true,
  showDots = true,
  className
}: RotatingTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Create testimonials array using translations
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: t('testimonials.users.maria.name'),
      role: t('testimonials.users.maria.role'),
      company: '@mariavibe',
      rating: 5,
      testimonial: t('testimonials.users.maria.testimonial'),
      metrics: t('testimonials.users.maria.metric'),
      featured: true
    },
    {
      id: '2',
      name: t('testimonials.users.carlos.name'),
      role: t('testimonials.users.carlos.role'),
      company: 'FitLife Training',
      rating: 5,
      testimonial: t('testimonials.users.carlos.testimonial'),
      metrics: t('testimonials.users.carlos.metric')
    },
    {
      id: '3',
      name: t('testimonials.users.ana.name'),
      role: t('testimonials.users.ana.role'),
      company: 'AnaCreativa',
      rating: 5,
      testimonial: t('testimonials.users.ana.testimonial'),
      metrics: t('testimonials.users.ana.metric')
    },
    {
      id: '4',
      name: t('testimonials.users.luis.name'),
      role: t('testimonials.users.luis.role'),
      company: '@luismusic',
      rating: 5,
      testimonial: t('testimonials.users.luis.testimonial'),
      metrics: t('testimonials.users.luis.metric')
    },
    {
      id: '5',
      name: t('testimonials.users.sofia.name'),
      role: t('testimonials.users.sofia.role'),
      company: 'Sabores Únicos',
      rating: 5,
      testimonial: t('testimonials.users.sofia.testimonial'),
      metrics: t('testimonials.users.sofia.metric')
    },
    {
      id: '6',
      name: t('testimonials.users.pedro.name'),
      role: t('testimonials.users.pedro.role'),
      company: 'Digital Growth',
      rating: 5,
      testimonial: t('testimonials.users.pedro.testimonial'),
      metrics: t('testimonials.users.pedro.metric')
    }
  ];

  const currentTestimonial = testimonials[currentIndex];

  // Auto rotation
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection('right');
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [isPlaying, rotationInterval]);

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-5 h-5',
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        )}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className={cn('relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('testimonials.title')}
        </h3>
        <p className="text-gray-600">
          {t('testimonials.subtitle')}
        </p>
      </div>

      {/* Main Testimonial */}
      <div className="relative overflow-hidden">
        <div 
          className={cn(
            'transition-all duration-500 ease-in-out transform',
            direction === 'right' ? 'animate-in slide-in-from-right' : 'animate-in slide-in-from-left'
          )}
          key={currentIndex}
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-center mb-6">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "{currentTestimonial.testimonial}"
              </p>
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-4">
              {renderStars(currentTestimonial.rating)}
            </div>

            {/* Metric Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                {currentTestimonial.metrics}
              </span>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(currentTestimonial.name)}
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900">
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {currentTestimonial.role}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
            aria-label={t('testimonials.controls.previous')}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
              aria-label={isPlaying ? t('testimonials.controls.pause') : t('testimonials.controls.play')}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gray-600" />
              ) : (
                <Play className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {/* Progress indicator */}
            <div className="text-sm text-gray-500">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
            aria-label={t('testimonials.controls.next')}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`${t('testimonials.controls.goTo')} ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Featured badge */}
      {currentTestimonial.featured && (
        <div className="absolute top-4 right-4">
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
{t('testimonials.featured')}
          </div>
        </div>
      )}
    </div>
  );
}

