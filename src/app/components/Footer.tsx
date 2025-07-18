import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

const footerSections = {
  product: {
    title: 'Producto',
    links: [
      { name: 'Funcionalidades', href: '/funcionalidades' },
      { name: 'Plantillas', href: '/templates' },
      { name: 'Precios', href: '/precios' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Integraciones', href: '/integraciones' },
      { name: 'API', href: '/api' }
    ]
  },
  support: {
    title: 'Soporte',
    links: [
      { name: 'Centro de Ayuda', href: '/ayuda' },
      { name: 'Tutoriales', href: '/tutoriales' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contáctanos', href: '/contactanos' },
      { name: 'Estado del Servicio', href: '/status' },
      { name: 'Reportar Bug', href: '/reportar-bug' }
    ]
  },
  company: {
    title: 'Empresa',
    links: [
      { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { name: 'Blog', href: '/blog' },
      { name: 'Carreras', href: '/carreras' },
      { name: 'Prensa', href: '/prensa' },
      { name: 'Partners', href: '/partners' },
      { name: 'Afiliados', href: '/afiliados' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Términos de Servicio', href: '/terminos' },
      { name: 'Política de Privacidad', href: '/privacidad' },
      { name: 'Política de Cookies', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Seguridad', href: '/seguridad' },
      { name: 'Compliance', href: '/compliance' }
    ]
  }
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/enlacepro' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/enlacepro' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/enlacepro' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/enlacepro' }
];

const contactInfo = [
  { icon: Mail, text: 'soporte@enlacepro.com', href: 'mailto:soporte@enlacepro.com' },
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, text: 'San Francisco, CA', href: '#' }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image 
                src="/logo-white.png" 
                alt="EnlacePro Logo" 
                width={180} 
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              La plataforma más fácil y profesional para crear tu página de enlaces. 
              Conecta todas tus redes sociales y contenido en un solo lugar.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <contact.icon className="w-4 h-4 mr-3" />
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Mantente al día con las últimas novedades
              </h3>
              <p className="text-gray-400">
                Recibe tips, tutoriales y noticias sobre nuevas funcionalidades
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">50K+</div>
              <div className="text-gray-400 text-sm">Usuarios Activos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">2M+</div>
              <div className="text-gray-400 text-sm">Enlaces Creados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">150+</div>
              <div className="text-gray-400 text-sm">Países</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 EnlacePro. Todos los derechos reservados.
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                <span>Hecho con</span>
                <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                <span>para creadores</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">Todos los sistemas operativos</span>
              </div>
              <div className="text-gray-400 text-sm">
                v2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}