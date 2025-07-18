import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPageTemplate from '@/components/conversion/LandingPageTemplate';

interface PageProps {
  params: Promise<{
    source: string;
  }>;
  searchParams: Promise<{
    utm_campaign?: string;
    utm_medium?: string;
    utm_content?: string;
    ref?: string;
  }>;
}

// Landing page configurations for different sources
const LANDING_PAGES = {
  'instagram': {
    title: 'EnlacePro - La herramienta perfecta para tu Instagram Bio',
    description: 'Convierte tu bio de Instagram en una página profesional que genera más seguidores y ventas. Usado por +10,000 influencers.',
    hero: {
      headline: 'Transforma tu Bio de Instagram en una Máquina de Ventas',
      subheadline: 'Únete a más de 10,000 influencers que ya están convirtiendo sus seguidores en clientes con EnlacePro',
      cta: '¡Crear mi Link en Bio GRATIS!',
      badge: 'Perfecto para Instagram'
    },
    features: [
      '✨ Diseños optimizados para Instagram',
      '📱 100% mobile-first',
      '📊 Analytics de stories e IG',
      '🎨 +20 plantillas para influencers',
      '🔗 Enlaces ilimitados',
      '💰 Integración con tiendas online'
    ],
    testimonial: {
      text: 'Desde que uso EnlacePro en mi bio, he aumentado mis ventas un 300%. ¡Es increíble!',
      author: 'María González',
      role: 'Influencer de Lifestyle',
      followers: '250K seguidores'
    }
  },
  'tiktok': {
    title: 'EnlacePro - Convierte tu TikTok en Ingresos Reales',
    description: 'La plataforma favorita de los TikTokers para monetizar su audiencia. Fácil, rápido y efectivo.',
    hero: {
      headline: 'De TikTok Viral a Ingresos Reales',
      subheadline: 'Convierte esos millones de views en ventas reales. La herramienta que usan los TikTokers más exitosos',
      cta: '🚀 Empezar a Monetizar',
      badge: 'Viral en TikTok'
    },
    features: [
      '🎬 Optimizado para TikTokers',
      '⚡ Setup súper rápido (2 min)',
      '💸 Monetiza tu audiencia',
      '🔥 Diseños trending',
      '📈 Tracking de conversiones',
      '🎯 Perfecto para Gen Z'
    ],
    testimonial: {
      text: 'Con 5M de views pero $0 de ingresos... hasta que descubrí EnlacePro. Ahora genero $2K/mes!',
      author: 'Carlos Vibe',
      role: 'TikToker',
      followers: '1.2M seguidores'
    }
  },
  'youtube': {
    title: 'EnlacePro - Centraliza todos tus enlaces de YouTube',
    description: 'Lleva a tus suscriptores desde YouTube hacia todas tus plataformas y productos con una página profesional.',
    hero: {
      headline: 'Conecta tu Audiencia de YouTube con Todo tu Ecosistema',
      subheadline: 'Una página profesional que conecta tus videos con tus productos, cursos, redes sociales y más',
      cta: 'Crear mi Hub de Creator',
      badge: 'Para YouTubers'
    },
    features: [
      '🎥 Integración con YouTube',
      '📚 Showcase de cursos/productos',
      '🔗 Enlaces a todos tus canales',
      '📊 Analytics avanzados',
      '💼 Look profesional',
      '🎯 Aumenta suscriptores'
    ],
    testimonial: {
      text: 'Mi canal creció 50% más rápido cuando empecé a usar EnlacePro para dirigir tráfico entre plataformas.',
      author: 'Ana Tech',
      role: 'YouTuber Tech',
      followers: '500K suscriptores'
    }
  },
  'facebook': {
    title: 'EnlacePro - Perfecto para tu Negocio en Facebook',
    description: 'Convierte tu página de Facebook en un hub profesional que genere más leads y ventas para tu negocio.',
    hero: {
      headline: 'Impulsa tu Negocio de Facebook al Siguiente Nivel',
      subheadline: 'Profesionaliza tu presencia online y convierte más seguidores en clientes reales',
      cta: 'Crear Página Profesional',
      badge: 'Para Negocios'
    },
    features: [
      '💼 Perfecto para negocios',
      '📋 Captura de leads',
      '🛒 Integración con catálogos',
      '📊 Analytics de negocio',
      '👥 Ideal para B2B',
      '🎯 Genera más ventas'
    ],
    testimonial: {
      text: 'Nuestro negocio local triplicó las consultas desde que usamos EnlacePro en nuestro Facebook.',
      author: 'Roberto Empresa',
      role: 'Dueño de Negocio',
      followers: 'Local Business'
    }
  },
  'twitter': {
    title: 'EnlacePro - Optimiza tu Presencia en Twitter/X',
    description: 'Para creadores, emprendedores y profesionales que quieren maximizar su impacto en Twitter/X.',
    hero: {
      headline: 'Convierte tus Tweets en Oportunidades Reales',
      subheadline: 'La herramienta que usan los influencers de Twitter para construir su imperio digital',
      cta: 'Build in Public 🚀',
      badge: 'Twitter/X Approved'
    },
    features: [
      '🐦 Optimizado para Twitter/X',
      '🚀 Perfecto para builders',
      '💼 Networking profesional',
      '📈 Construye tu marca personal',
      '🔗 Thread to conversion',
      '⚡ Setup instantáneo'
    ],
    testimonial: {
      text: 'Mi personal brand en Twitter creció 10x cuando empecé a dirigir todo mi tráfico a mi EnlacePro.',
      author: 'Luis Builder',
      role: 'Entrepreneur',
      followers: '50K followers'
    }
  },
  'linkedin': {
    title: 'EnlacePro - Tu Presencia Profesional Amplificada',
    description: 'Para profesionales y empresarios que quieren construir autoridad y generar oportunidades de negocio.',
    hero: {
      headline: 'Amplifica tu Autoridad Profesional',
      subheadline: 'La plataforma que usan los líderes de industria para convertir conexiones en oportunidades',
      cta: 'Elevar mi Perfil Profesional',
      badge: 'LinkedIn Optimized'
    },
    features: [
      '💼 Imagen súper profesional',
      '🎯 Generación de leads B2B',
      '📈 Construye autoridad',
      '🤝 Networking efectivo',
      '📊 Analytics profesionales',
      '🏆 Destaca en tu industria'
    ],
    testimonial: {
      text: 'Conseguí 3 clientes enterprise gracias a mi página EnlacePro en mi bio de LinkedIn.',
      author: 'Patricia Consultora',
      role: 'Business Consultant',
      followers: 'CEO & Consultant'
    }
  }
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const config = LANDING_PAGES[resolvedParams.source as keyof typeof LANDING_PAGES];
  
  if (!config) {
    return {
      title: 'Página no encontrada',
      description: 'La página que buscas no existe.'
    };
  }

  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      images: [`/og-${resolvedParams.source}.png`]
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [`/og-${resolvedParams.source}.png`]
    }
  };
}

export default async function SourceLandingPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const config = LANDING_PAGES[resolvedParams.source as keyof typeof LANDING_PAGES];
  
  if (!config) {
    notFound();
  }

  return (
    <LandingPageTemplate 
      config={config}
      source={resolvedParams.source}
      utmParams={resolvedSearchParams}
    />
  );
}

// Generate static paths for known sources
export async function generateStaticParams() {
  return Object.keys(LANDING_PAGES).map((source) => ({
    source
  }));
}