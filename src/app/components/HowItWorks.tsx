import { UserPlus, Palette, Share2 } from 'lucide-react';
import UrgencyButton from '../../components/conversion/UrgencyButton';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Regístrate Gratis',
    description: 'Crea tu cuenta en menos de 30 segundos. No necesitas tarjeta de crédito.',
    details: [
      'Registro con email o Google',
      'Verificación instantánea',
      'Acceso inmediato al dashboard'
    ]
  },
  {
    number: '02',
    icon: Palette,
    title: 'Personaliza tu Página',
    description: 'Elige tu tema, añade tus enlaces y personaliza el diseño a tu gusto.',
    details: [
      'Más de 20 temas profesionales',
      'Editor visual intuitivo',
      'Vista previa en tiempo real'
    ]
  },
  {
    number: '03',
    icon: Share2,
    title: 'Comparte y Crece',
    description: 'Publica tu enlace único y comienza a dirigir tráfico a donde más importa.',
    details: [
      'URL personalizada (tu-nombre.com)',
      'Perfecto para bio de Instagram',
      'Analytics detallado incluido'
    ]
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cómo funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En solo 3 pasos simples tendrás tu página profesional lista para compartir
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Línea conectora (desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Número del paso */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Lista de características */}
                      <ul className="text-sm text-gray-500 space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center justify-center lg:justify-start">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Flecha conectora (móvil) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-gray-600 mb-6">
              Miles de creadores ya están usando nuestra plataforma para hacer crecer su audiencia
            </p>
            <UrgencyButton
              href="/crear-pagina-gratis"
              text="Crear mi página gratis"
              urgencyType="social_proof"
              variant="primary"
              size="lg"
              usersViewing={47}
            >
              <UserPlus className="w-5 h-5 ml-2" />
            </UrgencyButton>
            <p className="text-sm text-gray-500 mt-3">
              No se requiere tarjeta de crédito • Configuración en 2 minutos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}