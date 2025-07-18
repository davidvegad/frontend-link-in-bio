import { Star, Quote } from 'lucide-react';
import RotatingTestimonials from '../../components/conversion/RotatingTestimonials';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Influencer de Lifestyle',
    company: '@mariavibe',
    image: '/testimonial-maria.jpg',
    rating: 5,
    testimonial: 'Desde que uso esta plataforma, he aumentado mis conversiones un 300%. Es súper fácil de usar y mis seguidores encuentran todo lo que necesitan en un solo lugar.',
    metrics: '300% más conversiones'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Coach de Fitness',
    company: 'FitLife Training',
    image: '/testimonial-carlos.jpg',
    rating: 5,
    testimonial: 'Perfecto para mi negocio de coaching. Mis clientes pueden acceder fácilmente a mis programas, calendario de citas y contenido exclusivo. Los analytics me ayudan a entender qué funciona mejor.',
    metrics: '50+ clientes nuevos'
  },
  {
    id: 3,
    name: 'Ana Ruiz',
    role: 'Emprendedora',
    company: 'AnaCreativa',
    image: '/testimonial-ana.jpg',
    rating: 5,
    testimonial: 'Como diseñadora gráfica, necesitaba algo que se viera profesional. Este servicio superó mis expectativas. Mis clientes siempre comentan lo elegante que se ve mi página.',
    metrics: 'Portfolio profesional'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    role: 'Músico',
    company: '@luismusic',
    image: '/testimonial-luis.jpg',
    rating: 5,
    testimonial: 'Increíble para artistas. Puedo mostrar mi música, fechas de conciertos y vender mi merchandise, todo desde un solo enlace. Mis fans lo aman.',
    metrics: '2M+ reproducciones'
  },
  {
    id: 5,
    name: 'Sofia Morales',
    role: 'Food Blogger',
    company: 'Sabores Únicos',
    image: '/testimonial-sofia.jpg',
    rating: 5,
    testimonial: 'La sección de recetas y el enlace a mi blog han transformado completamente mi alcance. Ahora dirijo tráfico de calidad directamente a mi contenido.',
    metrics: '500% más tráfico'
  },
  {
    id: 6,
    name: 'Pedro Vega',
    role: 'Consultor Digital',
    company: 'Digital Growth',
    image: '/testimonial-pedro.jpg',
    rating: 5,
    testimonial: 'Como consultor, necesitaba transmitir profesionalismo. Esta herramienta no solo se ve increíble, sino que los analytics detallados me ayudan a optimizar constantemente.',
    metrics: '40+ consultas mensuales'
  }
];

const stats = [
  { number: '50K+', label: 'Usuarios activos' },
  { number: '2M+', label: 'Enlaces creados' },
  { number: '99.9%', label: 'Uptime garantizado' },
  { number: '4.9/5', label: 'Valoración promedio' }
];

export default function Testimonials() {
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
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Miles de creadores, empresarios y profesionales confían en nosotros para hacer crecer su negocio
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
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
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
              Únete a miles de usuarios satisfechos
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Comienza a crear tu página profesional hoy mismo y descubre por qué somos la opción favorita de creadores y empresarios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/crear-pagina-gratis"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Crear mi página gratis
              </a>
              <a 
                href="/testimonios"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Ver más testimonios
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ⭐ Valoración promedio de 4.9/5 basada en más de 1,000 reseñas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}