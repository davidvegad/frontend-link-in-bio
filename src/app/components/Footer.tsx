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
import { useTranslation } from '@/contexts/LanguageContext';

const getFooterSections = (t: (key: string) => string) => ({
  product: {
    title: t('footer.sections.product'),
    links: [
      { name: t('footer.links.features'), href: '/funcionalidades' },
      { name: t('footer.links.templates'), href: '/templates' },
      { name: t('footer.links.pricing'), href: '/precios' },
      { name: t('footer.links.analytics'), href: '/analytics' },
      { name: t('footer.links.integrations'), href: '/integraciones' },
      { name: t('footer.links.api'), href: '/api' }
    ]
  },
  support: {
    title: t('footer.sections.support'),
    links: [
      { name: t('footer.links.helpCenter'), href: '/ayuda' },
      { name: t('footer.links.tutorials'), href: '/tutoriales' },
      { name: t('footer.links.faq'), href: '/faq' },
      { name: t('footer.links.contact'), href: '/contactanos' },
      { name: t('footer.links.status'), href: '/status' },
      { name: t('footer.links.reportBug'), href: '/reportar-bug' }
    ]
  },
  company: {
    title: t('footer.sections.company'),
    links: [
      { name: t('footer.links.about'), href: '/sobre-nosotros' },
      { name: t('footer.links.blog'), href: '/blog' },
      { name: t('footer.links.careers'), href: '/carreras' },
      { name: t('footer.links.press'), href: '/prensa' },
      { name: t('footer.links.partners'), href: '/partners' },
      { name: t('footer.links.affiliates'), href: '/afiliados' }
    ]
  },
  legal: {
    title: t('footer.sections.legal'),
    links: [
      { name: t('footer.links.terms'), href: '/terminos' },
      { name: t('footer.links.privacy'), href: '/privacidad' },
      { name: t('footer.links.cookies'), href: '/cookies' },
      { name: t('footer.links.gdpr'), href: '/gdpr' },
      { name: t('footer.links.security'), href: '/seguridad' },
      { name: t('footer.links.compliance'), href: '/compliance' }
    ]
  }
});

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
  const { t } = useTranslation();
  const footerSections = getFooterSections(t);
  
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
              {t('footer.description')}
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
                {t('footer.newsletter.title')}
              </h3>
              <p className="text-gray-400">
                {t('footer.newsletter.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                {t('footer.newsletter.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">50K+</div>
              <div className="text-gray-400 text-sm">{t('footer.stats.activeUsers')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">2M+</div>
              <div className="text-gray-400 text-sm">{t('footer.stats.linksCreated')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">{t('footer.stats.uptime')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">150+</div>
              <div className="text-gray-400 text-sm">{t('footer.stats.countries')}</div>
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
                {t('footer.copyright')}
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                <span>{t('footer.madeWith')}</span>
                <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                <span>{t('footer.forCreators')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">{t('footer.allSystems')}</span>
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