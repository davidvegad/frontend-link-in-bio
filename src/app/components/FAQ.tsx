'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: '¿Es realmente gratis crear mi página?',
    answer: 'Sí, puedes crear y publicar tu página completamente gratis. Incluye hosting, SSL y todas las funciones básicas. Solo pagas si quieres funciones premium como dominio personalizado o analytics avanzados.'
  },
  {
    id: 2,
    question: '¿Necesito conocimientos técnicos para usar la plataforma?',
    answer: 'Para nada. Nuestra plataforma está diseñada para ser súper fácil de usar. Con nuestro editor visual de arrastrar y soltar, puedes crear tu página en minutos sin escribir una sola línea de código.'
  },
  {
    id: 3,
    question: '¿Puedo usar mi propio dominio personalizado?',
    answer: 'Sí, con nuestro plan premium puedes conectar tu propio dominio (ej: tuempresa.com). También ofrecemos subdominios personalizados gratuitos (ej: tunombre.enlacepro.com).'
  },
  {
    id: 4,
    question: '¿Qué tipo de analytics puedo obtener?',
    answer: 'Obtienes estadísticas detalladas sobre visitantes, clicks en enlaces, dispositivos más usados, países de origen, y mucho más. Los analytics premium incluyen datos históricos y exportación de reportes.'
  },
  {
    id: 5,
    question: '¿Puedo cambiar el diseño de mi página cuando quiera?',
    answer: 'Por supuesto. Puedes cambiar temas, colores, fuentes y layout en cualquier momento. Todos los cambios se aplican instantáneamente y tu enlace sigue siendo el mismo.'
  },
  {
    id: 6,
    question: '¿Hay límites en la cantidad de enlaces que puedo agregar?',
    answer: 'En el plan gratuito puedes agregar hasta 20 enlaces. Los planes premium no tienen límites y incluyen funciones adicionales como botones de acción, integración con redes sociales y más.'
  },
  {
    id: 7,
    question: '¿Mi página será responsive (se verá bien en móviles)?',
    answer: 'Absolutamente. Todos nuestros temas están optimizados para verse perfectos en cualquier dispositivo: móviles, tablets y computadoras. El 80% de tus visitantes vendrán desde móviles.'
  },
  {
    id: 8,
    question: '¿Puedo integrar mi tienda online o sistema de pagos?',
    answer: 'Sí, puedes integrar enlaces a tu tienda, PayPal, Stripe, o cualquier plataforma de pagos. También ofrecemos widgets especiales para mostrar productos destacados.'
  },
  {
    id: 9,
    question: '¿Qué pasa si cancelo mi suscripción premium?',
    answer: 'Tu página seguirá funcionando con las funciones del plan gratuito. No perderás tu contenido ni tu enlace, solo las funciones premium como dominio personalizado y analytics avanzados.'
  },
  {
    id: 10,
    question: '¿Ofrecen soporte técnico si tengo problemas?',
    answer: 'Sí, ofrecemos soporte por email para todos los usuarios. Los usuarios premium tienen acceso a soporte prioritario y chat en vivo. También tenemos una base de conocimientos completa.'
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Resolvemos todas tus dudas sobre nuestra plataforma y cómo puede ayudarte a hacer crecer tu negocio
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-4 bg-gray-50 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No encuentras la respuesta que buscas?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestro equipo de soporte está aquí para ayudarte. Contáctanos y resolveremos todas tus dudas personalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contactanos"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Contactar Soporte
              </a>
              <a 
                href="/tutoriales"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Ver Tutoriales
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              📧 Respuesta promedio en menos de 2 horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}