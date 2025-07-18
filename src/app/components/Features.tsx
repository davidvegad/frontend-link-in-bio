import { Palette, Smartphone, BarChart3, Share2, Zap, Shield } from 'lucide-react';
import UrgencyButton from '../../components/conversion/UrgencyButton';

const features = [
  {
    icon: Palette,
    title: 'Diseño Personalizable',
    description: 'Más de 20 temas profesionales y herramientas de personalización completas para que tu página refleje tu marca única.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Smartphone,
    title: 'Totalmente Responsive',
    description: 'Tu página se ve perfecta en cualquier dispositivo. Optimizada para móviles, tablets y escritorio.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: BarChart3,
    title: 'Analytics Integrado',
    description: 'Seguimiento detallado de clicks, visitantes y rendimiento de tus enlaces. Toma decisiones basadas en datos.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Share2,
    title: 'Fácil de Compartir',
    description: 'Un solo enlace para todas tus redes sociales. Perfecto para Instagram, TikTok, Twitter y más.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    icon: Zap,
    title: 'Configuración Rápida',
    description: 'Crea tu página en menos de 5 minutos. Sin código, sin complicaciones. Solo arrastra, suelta y publica.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    icon: Shield,
    title: 'Seguro y Confiable',
    description: 'Hosting seguro con SSL incluido. Uptime del 99.9% garantizado para que tus enlaces siempre funcionen.',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para destacar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas profesionales diseñadas para ayudarte a convertir tus seguidores en clientes
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para probarlo gratis?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a más de 10,000 creadores que ya están usando nuestra plataforma para hacer crecer su negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <UrgencyButton
                href="/crear-pagina-gratis"
                text="¡Empezar GRATIS ahora!"
                urgencyType="scarcity"
                variant="primary"
                size="lg"
                spotsLeft={27}
              />
              <a 
                href="/funcionalidades"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Ver todas las funciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}