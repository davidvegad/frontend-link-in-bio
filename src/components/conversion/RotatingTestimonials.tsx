'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Influencer de Lifestyle',
    company: '@mariavibe',
    rating: 5,
    testimonial: 'Desde que uso EnlacePro, he aumentado mis conversiones un 300%. Es súper fácil de usar y mis seguidores encuentran todo lo que necesitan en un solo lugar. ¡Lo recomiendo 100%!',
    metrics: '300% más conversiones',
    featured: true
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    role: 'Coach de Fitness',
    company: 'FitLife Training',
    rating: 5,
    testimonial: 'Perfecto para mi negocio de coaching. Mis clientes pueden acceder fácilmente a mis programas, calendario de citas y contenido exclusivo. Los analytics me ayudan a entender qué funciona mejor.',
    metrics: '50+ clientes nuevos/mes'
  },
  {
    id: '3',
    name: 'Ana Ruiz',
    role: 'Diseñadora Gráfica',
    company: 'AnaCreativa',
    rating: 5,
    testimonial: 'Como diseñadora, necesitaba algo que se viera profesional. Este servicio superó mis expectativas. Mis clientes siempre comentan lo elegante que se ve mi página.',
    metrics: 'Portfolio profesional'
  },
  {
    id: '4',
    name: 'Luis Fernández',
    role: 'Músico',
    company: '@luismusic',
    rating: 5,
    testimonial: 'Increíble para artistas. Puedo mostrar mi música, fechas de conciertos y vender mi merchandise, todo desde un solo enlace. Mis fans lo aman.',
    metrics: '2M+ reproducciones'
  },
  {
    id: '5',
    name: 'Sofia Morales',
    role: 'Food Blogger',
    company: 'Sabores Únicos',
    rating: 5,
    testimonial: 'La sección de recetas y el enlace a mi blog han transformado completamente mi alcance. Ahora dirijo tráfico de calidad directamente a mi contenido.',
    metrics: '500% más tráfico'
  },
  {
    id: '6',
    name: 'Pedro Vega',
    role: 'Consultor Digital',
    company: 'Digital Growth',
    rating: 5,
    testimonial: 'Como consultor, necesitaba transmitir profesionalismo. Esta herramienta no solo se ve increíble, sino que los analytics detallados me ayudan a optimizar constantemente.',
    metrics: '40+ consultas mensuales'
  }
];

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
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

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
          Lo que dicen nuestros usuarios
        </h3>
        <p className="text-gray-600">
          Testimonios reales de creadores que han transformado su negocio
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
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-gray-300"
              aria-label={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
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
            aria-label="Siguiente testimonio"
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
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Featured badge */}
      {currentTestimonial.featured && (
        <div className="absolute top-4 right-4">
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            DESTACADO
          </div>
        </div>
      )}
    </div>
  );
}

