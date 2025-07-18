// Internationalization System
export type Language = 'es' | 'en';

export interface Translations {
  [key: string]: any;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Navigation
    nav: {
      profile: 'Perfil',
      design: 'Diseño',
      stats: 'Estadísticas',
      notifications: 'Notificaciones',
      settings: 'Ajustes'
    },
    
    // Common
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Añadir',
      remove: 'Quitar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      yes: 'Sí',
      no: 'No',
      close: 'Cerrar',
      open: 'Abrir',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      import: 'Importar',
      settings: 'Configuración',
      preview: 'Vista previa',
      publish: 'Publicar',
      share: 'Compartir'
    },
    
    // Profile
    profile: {
      title: 'Tu Perfil',
      name: 'Nombre',
      bio: 'Biografía',
      avatar: 'Avatar',
      cover: 'Portada',
      links: 'Enlaces',
      socialIcons: 'Redes Sociales',
      addLink: 'Añadir Enlace',
      addSocial: 'Añadir Red Social',
      dragToReorder: 'Arrastra para reordenar',
      uploadImage: 'Subir Imagen',
      changeImage: 'Cambiar Imagen',
      removeImage: 'Quitar Imagen'
    },
    
    // Design
    design: {
      title: 'Personalización',
      theme: 'Tema',
      colors: 'Colores',
      background: 'Fondo',
      buttons: 'Botones',
      fonts: 'Fuentes',
      gradients: 'Degradados',
      customColor: 'Color Personalizado',
      backgroundImage: 'Imagen de Fondo',
      buttonStyle: 'Estilo de Botón',
      fontFamily: 'Familia de Fuente',
      opacity: 'Opacidad',
      overlay: 'Superposición'
    },
    
    // Analytics
    analytics: {
      title: 'Analytics',
      views: 'Vistas',
      clicks: 'Clicks',
      visitors: 'Visitantes',
      conversionRate: 'Tasa de Conversión',
      topLinks: 'Enlaces Principales',
      traffic: 'Tráfico',
      performance: 'Rendimiento',
      overview: 'Resumen',
      daily: 'Diario',
      weekly: 'Semanal',
      monthly: 'Mensual',
      yearly: 'Anual',
      realTime: 'Tiempo Real',
      sources: 'Fuentes de Tráfico',
      devices: 'Dispositivos',
      locations: 'Ubicaciones'
    },
    
    // Notifications
    notifications: {
      title: 'Notificaciones Push',
      subtitle: 'Mantén a tus usuarios conectados con notificaciones inteligentes',
      enable: 'Activar',
      disable: 'Desactivar',
      test: 'Probar',
      campaigns: 'Campañas',
      templates: 'Plantillas',
      subscribers: 'Suscriptores',
      settings: 'Configuración',
      supported: 'Soportado',
      notSupported: 'No soportado',
      permissionGranted: 'Permisos concedidos',
      permissionDenied: 'Permisos denegados',
      permissionPending: 'Permisos pendientes',
      subscribed: 'Suscrito',
      newCampaign: 'Nueva Campaña',
      newTemplate: 'Nueva Plantilla',
      activeCampaigns: 'Campañas Activas',
      totalSent: 'Notificaciones Enviadas',
      clickRate: 'Tasa de Clicks',
      generalSettings: 'Configuración General',
      categories: 'Categorías de Notificaciones',
      quietHours: 'Horario Silencioso',
      frequency: 'Frecuencia',
      immediate: 'Inmediata',
      daily: 'Diaria',
      weekly: 'Semanal',
      never: 'Nunca',
      marketing: 'Marketing',
      updates: 'Actualizaciones',
      reminders: 'Recordatorios',
      promotions: 'Promociones',
      personalized: 'Personalizado'
    },
    
    // CRM
    crm: {
      title: 'CRM Dashboard',
      subtitle: 'Gestiona tus contactos y leads',
      contacts: 'Contactos',
      leads: 'Leads',
      activities: 'Actividades',
      pipeline: 'Pipeline',
      newContact: 'Nuevo Contacto',
      newLead: 'Nuevo Lead',
      newActivity: 'Nueva Actividad',
      leadScore: 'Puntuación de Lead',
      lastInteraction: 'Última Interacción',
      conversionRate: 'Tasa de Conversión',
      pipelineValue: 'Valor del Pipeline',
      hotLeads: 'Leads Calientes',
      stages: {
        awareness: 'Conocimiento',
        interest: 'Interés',
        consideration: 'Consideración',
        intent: 'Intención',
        evaluation: 'Evaluación',
        purchase: 'Compra'
      },
      status: {
        cold: 'Frío',
        warm: 'Tibio',
        hot: 'Caliente',
        customer: 'Cliente',
        churned: 'Perdido'
      }
    },
    
    // Email Marketing
    email: {
      title: 'Email Marketing',
      subtitle: 'Automatiza y optimiza tus campañas de email',
      campaigns: 'Campañas',
      sequences: 'Secuencias',
      templates: 'Plantillas',
      subscribers: 'Suscriptores',
      newCampaign: 'Nueva Campaña',
      newSequence: 'Nueva Secuencia',
      newTemplate: 'Nueva Plantilla',
      addSubscriber: 'Añadir Suscriptor',
      openRate: 'Tasa de Apertura',
      clickRate: 'Tasa de Clicks',
      unsubscribeRate: 'Tasa de Baja',
      automatedSequences: 'Secuencias Automatizadas',
      emailsSent: 'Emails Enviados',
      performance: 'Rendimiento',
      recentCampaigns: 'Campañas Recientes',
      campaignPerformance: 'Rendimiento por Campaña'
    },
    
    // Settings
    settings: {
      title: 'Configuración',
      account: 'Cuenta',
      privacy: 'Privacidad',
      language: 'Idioma',
      customUrl: 'URL Personalizada',
      deleteAccount: 'Eliminar Cuenta',
      logout: 'Cerrar Sesión',
      changePassword: 'Cambiar Contraseña',
      notifications: 'Notificaciones',
      theme: 'Tema',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      autoMode: 'Automático'
    },
    
    // Welcome Flow
    welcome: {
      category: {
        title: '¿Qué tipo de perfil quieres crear?',
        subtitle: 'Elige la opción que mejor describa tu objetivo',
        personal: 'Personal',
        business: 'Negocio',
        creator: 'Creador',
        influencer: 'Influencer',
        artist: 'Artista',
        professional: 'Profesional'
      },
      style: {
        title: 'Elige tu estilo',
        subtitle: 'Selecciona el diseño que más te guste',
        minimal: 'Minimalista',
        modern: 'Moderno',
        colorful: 'Colorido',
        elegant: 'Elegante',
        bold: 'Audaz',
        creative: 'Creativo'
      },
      info: {
        title: 'Cuéntanos sobre ti',
        subtitle: 'Esta información aparecerá en tu perfil',
        fullName: 'Nombre Completo',
        bio: 'Biografía',
        location: 'Ubicación',
        website: 'Sitio Web'
      },
      theme: {
        title: 'Personaliza tu tema',
        subtitle: 'Ajusta los colores y el diseño',
        selectTheme: 'Seleccionar Tema',
        customize: 'Personalizar',
        preview: 'Vista Previa'
      },
      buttons: {
        title: 'Configura tus botones',
        subtitle: 'Elige el estilo de tus botones',
        style: 'Estilo',
        color: 'Color',
        shape: 'Forma',
        size: 'Tamaño'
      },
      links: {
        title: 'Añade tus enlaces',
        subtitle: 'Conecta con tu audiencia',
        addLink: 'Añadir Enlace',
        linkTitle: 'Título del Enlace',
        linkUrl: 'URL del Enlace',
        socialMedia: 'Redes Sociales'
      },
      publish: {
        title: '¡Todo listo!',
        subtitle: 'Tu perfil está configurado y listo para compartir',
        yourUrl: 'Tu URL',
        share: 'Compartir',
        copyLink: 'Copiar Enlace',
        viewProfile: 'Ver Perfil'
      }
    },
    
    // Header
    header: {
      contactUs: 'Contáctanos',
      pricing: 'Precios',
      features: 'Funcionalidades',
      tutorials: 'Tutoriales',
      login: 'Login',
      createFree: 'Crear página gratis'
    },

    // Hero
    hero: {
      rating: 'Valorado 4.9/5 por más de 10,000 usuarios',
      title: 'Tu enlace,',
      titleHighlight: 'infinitas',
      titleEnd: 'posibilidades',
      subtitle: 'Convierte tus seguidores en clientes con una página profesional que centraliza todos tus enlaces, productos y contenido.',
      freeStart: '100% Gratis para empezar',
      quickSetup: 'Configuración en 2 minutos',
      viewDemo: 'Ver demo en vivo',
      activeUsers: '50K+ usuarios activos',
      usedBy: 'Usado por creadores de Netflix, Spotify y más',
      newBadge: '¡Nuevo!',
      analytics: 'Analytics',
      joinCreators: 'Únete a creadores de contenido que ya están generando más ingresos',
      asSeenIn: 'Como aparece en:',
      createFree: 'Crear mi página gratis'
    },

    // Features
    features: {
      title: 'Todo lo que necesitas para destacar',
      subtitle: 'Herramientas profesionales diseñadas para ayudarte a convertir tus seguidores en clientes',
      customDesign: {
        title: 'Diseño Personalizable',
        description: 'Más de 20 temas profesionales y herramientas de personalización completas para que tu página refleje tu marca única.'
      },
      responsive: {
        title: 'Totalmente Responsive',
        description: 'Tu página se ve perfecta en cualquier dispositivo. Optimizada para móviles, tablets y escritorio.'
      },
      analytics: {
        title: 'Analytics Integrado',
        description: 'Seguimiento detallado de clicks, visitantes y rendimiento de tus enlaces. Toma decisiones basadas en datos.'
      },
      sharing: {
        title: 'Fácil de Compartir',
        description: 'Un solo enlace para todas tus redes sociales. Perfecto para Instagram, TikTok, Twitter y más.'
      },
      quickSetup: {
        title: 'Configuración Rápida',
        description: 'Crea tu página en menos de 5 minutos. Sin código, sin complicaciones. Solo arrastra, suelta y publica.'
      },
      secure: {
        title: 'Seguro y Confiable',
        description: 'Hosting seguro con SSL incluido. Uptime del 99.9% garantizado para que tus enlaces siempre funcionen.'
      },
      ctaTitle: '¿Listo para probarlo gratis?',
      ctaSubtitle: 'Únete a más de 10,000 creadores que ya están usando nuestra plataforma para hacer crecer su negocio',
      startFree: '¡Empezar GRATIS ahora!',
      viewAll: 'Ver todas las funciones'
    },

    // Footer
    footer: {
      description: 'La plataforma más fácil y profesional para crear tu página de enlaces. Conecta todas tus redes sociales y contenido en un solo lugar.',
      sections: {
        product: 'Producto',
        support: 'Soporte',
        company: 'Empresa',
        legal: 'Legal'
      },
      links: {
        features: 'Funcionalidades',
        templates: 'Plantillas',
        pricing: 'Precios',
        analytics: 'Analytics',
        integrations: 'Integraciones',
        api: 'API',
        helpCenter: 'Centro de Ayuda',
        tutorials: 'Tutoriales',
        faq: 'FAQ',
        contact: 'Contáctanos',
        status: 'Estado del Servicio',
        reportBug: 'Reportar Bug',
        about: 'Sobre Nosotros',
        blog: 'Blog',
        careers: 'Carreras',
        press: 'Prensa',
        partners: 'Partners',
        affiliates: 'Afiliados',
        terms: 'Términos de Servicio',
        privacy: 'Política de Privacidad',
        cookies: 'Política de Cookies',
        gdpr: 'GDPR',
        security: 'Seguridad',
        compliance: 'Compliance'
      },
      newsletter: {
        title: 'Mantente al día con las últimas novedades',
        subtitle: 'Recibe tips, tutoriales y noticias sobre nuevas funcionalidades',
        placeholder: 'Tu email',
        subscribe: 'Suscribirse'
      },
      stats: {
        activeUsers: 'Usuarios Activos',
        linksCreated: 'Enlaces Creados',
        uptime: 'Uptime',
        countries: 'Países'
      },
      copyright: '© 2024 EnlacePro. Todos los derechos reservados.',
      madeWith: 'Hecho con',
      forCreators: 'para creadores',
      allSystems: 'Todos los sistemas operativos'
    },

    // How It Works
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'En solo 3 pasos simples tendrás tu página profesional lista para compartir',
      steps: {
        step1: {
          title: 'Regístrate Gratis',
          description: 'Crea tu cuenta en menos de 30 segundos. No necesitas tarjeta de crédito.',
          details: [
            'Registro con email o Google',
            'Verificación instantánea',
            'Acceso inmediato al dashboard'
          ]
        },
        step2: {
          title: 'Personaliza tu Página',
          description: 'Elige tu tema, añade tus enlaces y personaliza el diseño a tu gusto.',
          details: [
            'Más de 20 temas profesionales',
            'Editor visual intuitivo',
            'Vista previa en tiempo real'
          ]
        },
        step3: {
          title: 'Comparte y Crece',
          description: 'Publica tu enlace único y comienza a dirigir tráfico a donde más importa.',
          details: [
            'URL personalizada (tu-nombre.com)',
            'Perfecto para bio de Instagram',
            'Analytics detallado incluido'
          ]
        }
      },
      cta: {
        title: '¿Listo para comenzar?',
        subtitle: 'Miles de creadores ya están usando nuestra plataforma para hacer crecer su audiencia',
        button: 'Crear mi página gratis',
        disclaimer: 'No se requiere tarjeta de crédito • Configuración en 2 minutos'
      }
    },

    // Templates
    templates: {
      title: 'Plantillas que inspiran',
      subtitle: 'Descubre diseños profesionales creados especialmente para diferentes industrias y estilos',
      categories: {
        all: 'Todos',
        influencer: 'Influencer',
        business: 'Negocio',
        art: 'Arte',
        restaurant: 'Restaurante',
        fitness: 'Fitness',
        minimalist: 'Minimalista'
      },
      templateNames: {
        influencerLifestyle: 'Influencer Lifestyle',
        businessPro: 'Business Pro',
        creativeArtist: 'Creative Artist',
        foodRestaurant: 'Food & Restaurant',
        fitnessCoach: 'Fitness Coach',
        minimalist: 'Minimalist'
      },
      descriptions: {
        influencerLifestyle: 'Perfecto para creadores de contenido y lifestyle bloggers',
        businessPro: 'Ideal para empresas y profesionales independientes',
        creativeArtist: 'Para artistas, músicos y creativos que buscan destacar',
        foodRestaurant: 'Especializado para restaurantes y food bloggers',
        fitnessCoach: 'Diseñado para entrenadores y coaches de fitness',
        minimalist: 'Elegante y simple, para cualquier tipo de profesional'
      },
      actions: {
        preview: 'Vista Previa',
        useTemplate: 'Usar Plantilla',
        more: 'más'
      },
      cta: {
        title: '¿No encuentras lo que buscas?',
        subtitle: 'Nuestro editor visual te permite crear diseños únicos desde cero o personalizar cualquier plantilla a tu gusto',
        createFromScratch: 'Crear desde cero',
        viewAll: 'Ver todas las plantillas'
      }
    },

    // Testimonials
    testimonials: {
      title: 'Lo que dicen nuestros usuarios',
      subtitle: 'Testimonios reales de creadores que han transformado su negocio',
      originalSubtitle: 'Miles de creadores, empresarios y profesionales confían en nosotros para hacer crecer su negocio',
      stats: {
        activeUsers: 'Usuarios activos',
        linksCreated: 'Enlaces creados',
        uptimeGuaranteed: 'Uptime garantizado',
        averageRating: 'Valoración promedio'
      },
      users: {
        maria: {
          name: 'María González',
          role: 'Influencer de Lifestyle',
          testimonial: 'Desde que uso esta plataforma, he aumentado mis conversiones un 300%. Es súper fácil de usar y mis seguidores encuentran todo lo que necesitan en un solo lugar.',
          metric: '300% más conversiones'
        },
        carlos: {
          name: 'Carlos Mendoza',
          role: 'Coach de Fitness',
          testimonial: 'Perfecto para mi negocio de coaching. Mis clientes pueden acceder fácilmente a mis programas, calendario de citas y contenido exclusivo. Los analytics me ayudan a entender qué funciona mejor.',
          metric: '50+ clientes nuevos'
        },
        ana: {
          name: 'Ana Ruiz',
          role: 'Emprendedora',
          testimonial: 'Como diseñadora gráfica, necesitaba algo que se viera profesional. Este servicio superó mis expectativas. Mis clientes siempre comentan lo elegante que se ve mi página.',
          metric: 'Portfolio profesional'
        },
        luis: {
          name: 'Luis Fernández',
          role: 'Músico',
          testimonial: 'Increíble para artistas. Puedo mostrar mi música, fechas de conciertos y vender mi merchandise, todo desde un solo enlace. Mis fans lo aman.',
          metric: '2M+ reproducciones'
        },
        sofia: {
          name: 'Sofia Morales',
          role: 'Food Blogger',
          testimonial: 'La sección de recetas y el enlace a mi blog han transformado completamente mi alcance. Ahora dirijo tráfico de calidad directamente a mi contenido.',
          metric: '500% más tráfico'
        },
        pedro: {
          name: 'Pedro Vega',
          role: 'Consultor Digital',
          testimonial: 'Como consultor, necesitaba transmitir profesionalismo. Esta herramienta no solo se ve increíble, sino que los analytics detallados me ayudan a optimizar constantemente.',
          metric: '40+ consultas mensuales'
        }
      },
      cta: {
        title: 'Únete a miles de usuarios satisfechos',
        subtitle: 'Comienza a crear tu página profesional hoy mismo y descubre por qué somos la opción favorita de creadores y empresarios',
        createPage: 'Crear mi página gratis',
        viewMore: 'Ver más testimonios',
        rating: '⭐ Valoración promedio de 4.9/5 basada en más de 1,000 reseñas'
      },
      controls: {
        previous: 'Testimonio anterior',
        next: 'Siguiente testimonio',
        play: 'Reanudar rotación',
        pause: 'Pausar rotación',
        goTo: 'Ir al testimonio'
      },
      featured: 'DESTACADO'
    },

    // FAQ
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Resolvemos todas tus dudas sobre nuestra plataforma y cómo puede ayudarte a hacer crecer tu negocio',
      questions: [
        {
          question: '¿Es realmente gratis crear mi página?',
          answer: 'Sí, puedes crear y publicar tu página completamente gratis. Incluye hosting, SSL y todas las funciones básicas. Solo pagas si quieres funciones premium como dominio personalizado o analytics avanzados.'
        },
        {
          question: '¿Necesito conocimientos técnicos para usar la plataforma?',
          answer: 'Para nada. Nuestra plataforma está diseñada para ser súper fácil de usar. Con nuestro editor visual de arrastrar y soltar, puedes crear tu página en minutos sin escribir una sola línea de código.'
        },
        {
          question: '¿Puedo usar mi propio dominio personalizado?',
          answer: 'Sí, con nuestro plan premium puedes conectar tu propio dominio (ej: tuempresa.com). También ofrecemos subdominios personalizados gratuitos (ej: tunombre.enlacepro.com).'
        },
        {
          question: '¿Qué tipo de analytics puedo obtener?',
          answer: 'Obtienes estadísticas detalladas sobre visitantes, clicks en enlaces, dispositivos más usados, países de origen, y mucho más. Los analytics premium incluyen datos históricos y exportación de reportes.'
        },
        {
          question: '¿Puedo cambiar el diseño de mi página cuando quiera?',
          answer: 'Por supuesto. Puedes cambiar temas, colores, fuentes y layout en cualquier momento. Todos los cambios se aplican instantáneamente y tu enlace sigue siendo el mismo.'
        },
        {
          question: '¿Hay límites en la cantidad de enlaces que puedo agregar?',
          answer: 'En el plan gratuito puedes agregar hasta 20 enlaces. Los planes premium no tienen límites y incluyen funciones adicionales como botones de acción, integración con redes sociales y más.'
        },
        {
          question: '¿Mi página será responsive (se verá bien en móviles)?',
          answer: 'Absolutamente. Todos nuestros temas están optimizados para verse perfectos en cualquier dispositivo: móviles, tablets y computadoras. El 80% de tus visitantes vendrán desde móviles.'
        },
        {
          question: '¿Puedo integrar mi tienda online o sistema de pagos?',
          answer: 'Sí, puedes integrar enlaces a tu tienda, PayPal, Stripe, o cualquier plataforma de pagos. También ofrecemos widgets especiales para mostrar productos destacados.'
        },
        {
          question: '¿Qué pasa si cancelo mi suscripción premium?',
          answer: 'Tu página seguirá funcionando con las funciones del plan gratuito. No perderás tu contenido ni tu enlace, solo las funciones premium como dominio personalizado y analytics avanzados.'
        },
        {
          question: '¿Ofrecen soporte técnico si tengo problemas?',
          answer: 'Sí, ofrecemos soporte por email para todos los usuarios. Los usuarios premium tienen acceso a soporte prioritario y chat en vivo. También tenemos una base de conocimientos completa.'
        }
      ],
      cta: {
        title: '¿No encuentras la respuesta que buscas?',
        subtitle: 'Nuestro equipo de soporte está aquí para ayudarte. Contáctanos y resolveremos todas tus dudas personalmente.',
        contactSupport: 'Contactar Soporte',
        viewTutorials: 'Ver Tutoriales',
        responseTime: '📧 Respuesta promedio en menos de 2 horas'
      }
    },

    // Pricing
    pricing: {
      title: 'Planes y Precios',
      subtitle: 'Elige el plan perfecto para hacer crecer tu presencia online. Comienza gratis y actualiza cuando estés listo.',
      guarantee: '30 días de garantía de devolución',
      mostPopular: 'Más Popular',
      plans: {
        free: {
          name: 'Gratuito',
          price: '$0',
          period: '',
          description: 'Perfecto para empezar y probar la plataforma',
          button: 'Comenzar Gratis'
        },
        pro: {
          name: 'Pro',
          price: '$9',
          period: 'mes',
          description: 'Ideal para creadores y pequeños negocios',
          button: 'Comenzar Prueba Gratis'
        },
        business: {
          name: 'Business',
          price: '$29',
          period: 'mes',
          description: 'Para equipos y empresas en crecimiento',
          button: 'Contactar Ventas'
        }
      },
      features: {
        linksLimit: 'Hasta 20 enlaces',
        basicTemplates: '10+ plantillas básicas',
        basicAnalytics: 'Analytics básicos',
        mobileFriendly: 'Optimizado para móvil',
        basicCustomization: 'Personalización básica',
        unlimitedLinks: 'Enlaces ilimitados',
        allTemplates: '50+ plantillas premium',
        advancedAnalytics: 'Analytics avanzados',
        customDomain: 'Dominio personalizado',
        advancedCustomization: 'Personalización avanzada',
        prioritySupport: 'Soporte prioritario',
        removeWatermark: 'Sin marca de agua',
        socialIntegration: 'Integración con redes sociales',
        everythingInPro: 'Todo lo del plan Pro',
        teamCollaboration: 'Colaboración en equipo',
        advancedIntegrations: 'Integraciones avanzadas',
        customBranding: 'Branding personalizado',
        apiAccess: 'Acceso a API',
        dedicatedSupport: 'Soporte dedicado',
        customReports: 'Reportes personalizados',
        whitelabel: 'Solución white-label'
      },
      limitations: {
        noCustomDomain: 'Sin dominio personalizado',
        basicSupport: 'Soporte básico por email',
        limitedAnalytics: 'Analytics limitados'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        subtitle: 'Todo lo que necesitas saber sobre nuestros planes',
        questions: {
          paymentMethods: {
            question: '¿Qué métodos de pago aceptan?',
            answer: 'Aceptamos todas las tarjetas de crédito principales, PayPal y transferencias bancarias para planes anuales.'
          },
          cancelAnytime: {
            question: '¿Puedo cancelar en cualquier momento?',
            answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay penalizaciones ni cargos por cancelación.'
          },
          freeTrial: {
            question: '¿Ofrecen prueba gratuita?',
            answer: 'Sí, todos los planes premium incluyen una prueba gratuita de 14 días. No se requiere tarjeta de crédito.'
          },
          upgrade: {
            question: '¿Puedo cambiar de plan después?',
            answer: 'Por supuesto. Puedes actualizar o degradar tu plan en cualquier momento desde tu panel de control.'
          }
        }
      },
      cta: {
        title: '¿Listo para hacer crecer tu audiencia?',
        subtitle: 'Únete a miles de creadores que ya están usando nuestra plataforma para conectar con su audiencia.',
        startFree: 'Comenzar Gratis',
        contactSales: 'Contactar Ventas'
      }
    },

    // Metadata
    metadata: {
      title: 'EnlacePro - Crea tu página de enlaces profesional | Link in Bio',
      description: 'La plataforma más fácil para crear tu página de links profesional. Centraliza todos tus enlaces, aumenta conversiones y haz crecer tu negocio. 100% gratis para empezar.',
      keywords: 'link in bio, página de enlaces, linktree, bio link, enlaces instagram, página web gratis, creadores de contenido',
      ogTitle: 'EnlacePro - Tu enlace, infinitas posibilidades',
      ogDescription: 'Convierte tus seguidores en clientes con una página profesional que centraliza todos tus enlaces, productos y contenido.',
      twitterTitle: 'EnlacePro - Crea tu página de enlaces profesional',
      twitterDescription: 'La plataforma más fácil para crear tu página de links profesional. 100% gratis para empezar.'
    },

    // Messages
    messages: {
      linkCopied: 'Enlace copiado al portapapeles',
      saveSuccess: 'Cambios guardados correctamente',
      saveError: 'Error al guardar los cambios',
      deleteConfirm: '¿Estás seguro de que quieres eliminar?',
      deleteSuccess: 'Eliminado correctamente',
      deleteError: 'Error al eliminar',
      uploadSuccess: 'Imagen subida correctamente',
      uploadError: 'Error al subir la imagen',
      welcomeNotification: '¡Bienvenido!',
      welcomeMessage: 'Gracias por activar las notificaciones. Te mantendremos al día con las mejores ofertas.',
      testNotification: 'Notificación de Prueba',
      testMessage: 'Este es un mensaje de prueba para verificar que las notificaciones funcionan correctamente.',
      abandonedCart: '¡No olvides tu carrito!',
      abandonedCartMessage: 'Tienes artículos esperándote',
      specialOffer: '¡Oferta especial para ti!',
      specialOfferMessage: 'de descuento - Solo por tiempo limitado'
    }
  },
  
  en: {
    // Navigation
    nav: {
      profile: 'Profile',
      design: 'Design',
      stats: 'Analytics',
      notifications: 'Notifications',
      settings: 'Settings'
    },
    
    // Common
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      remove: 'Remove',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      yes: 'Yes',
      no: 'No',
      close: 'Close',
      open: 'Open',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      settings: 'Settings',
      preview: 'Preview',
      publish: 'Publish',
      share: 'Share'
    },
    
    // Profile
    profile: {
      title: 'Your Profile',
      name: 'Name',
      bio: 'Bio',
      avatar: 'Avatar',
      cover: 'Cover',
      links: 'Links',
      socialIcons: 'Social Media',
      addLink: 'Add Link',
      addSocial: 'Add Social Media',
      dragToReorder: 'Drag to reorder',
      uploadImage: 'Upload Image',
      changeImage: 'Change Image',
      removeImage: 'Remove Image'
    },
    
    // Design
    design: {
      title: 'Customization',
      theme: 'Theme',
      colors: 'Colors',
      background: 'Background',
      buttons: 'Buttons',
      fonts: 'Fonts',
      gradients: 'Gradients',
      customColor: 'Custom Color',
      backgroundImage: 'Background Image',
      buttonStyle: 'Button Style',
      fontFamily: 'Font Family',
      opacity: 'Opacity',
      overlay: 'Overlay'
    },
    
    // Analytics
    analytics: {
      title: 'Analytics',
      views: 'Views',
      clicks: 'Clicks',
      visitors: 'Visitors',
      conversionRate: 'Conversion Rate',
      topLinks: 'Top Links',
      traffic: 'Traffic',
      performance: 'Performance',
      overview: 'Overview',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      realTime: 'Real Time',
      sources: 'Traffic Sources',
      devices: 'Devices',
      locations: 'Locations'
    },
    
    // Notifications
    notifications: {
      title: 'Push Notifications',
      subtitle: 'Keep your users connected with intelligent notifications',
      enable: 'Enable',
      disable: 'Disable',
      test: 'Test',
      campaigns: 'Campaigns',
      templates: 'Templates',
      subscribers: 'Subscribers',
      settings: 'Settings',
      supported: 'Supported',
      notSupported: 'Not Supported',
      permissionGranted: 'Permission Granted',
      permissionDenied: 'Permission Denied',
      permissionPending: 'Permission Pending',
      subscribed: 'Subscribed',
      newCampaign: 'New Campaign',
      newTemplate: 'New Template',
      activeCampaigns: 'Active Campaigns',
      totalSent: 'Total Sent',
      clickRate: 'Click Rate',
      generalSettings: 'General Settings',
      categories: 'Notification Categories',
      quietHours: 'Quiet Hours',
      frequency: 'Frequency',
      immediate: 'Immediate',
      daily: 'Daily',
      weekly: 'Weekly',
      never: 'Never',
      marketing: 'Marketing',
      updates: 'Updates',
      reminders: 'Reminders',
      promotions: 'Promotions',
      personalized: 'Personalized'
    },
    
    // CRM
    crm: {
      title: 'CRM Dashboard',
      subtitle: 'Manage your contacts and leads',
      contacts: 'Contacts',
      leads: 'Leads',
      activities: 'Activities',
      pipeline: 'Pipeline',
      newContact: 'New Contact',
      newLead: 'New Lead',
      newActivity: 'New Activity',
      leadScore: 'Lead Score',
      lastInteraction: 'Last Interaction',
      conversionRate: 'Conversion Rate',
      pipelineValue: 'Pipeline Value',
      hotLeads: 'Hot Leads',
      stages: {
        awareness: 'Awareness',
        interest: 'Interest',
        consideration: 'Consideration',
        intent: 'Intent',
        evaluation: 'Evaluation',
        purchase: 'Purchase'
      },
      status: {
        cold: 'Cold',
        warm: 'Warm',
        hot: 'Hot',
        customer: 'Customer',
        churned: 'Churned'
      }
    },
    
    // Email Marketing
    email: {
      title: 'Email Marketing',
      subtitle: 'Automate and optimize your email campaigns',
      campaigns: 'Campaigns',
      sequences: 'Sequences',
      templates: 'Templates',
      subscribers: 'Subscribers',
      newCampaign: 'New Campaign',
      newSequence: 'New Sequence',
      newTemplate: 'New Template',
      addSubscriber: 'Add Subscriber',
      openRate: 'Open Rate',
      clickRate: 'Click Rate',
      unsubscribeRate: 'Unsubscribe Rate',
      automatedSequences: 'Automated Sequences',
      emailsSent: 'Emails Sent',
      performance: 'Performance',
      recentCampaigns: 'Recent Campaigns',
      campaignPerformance: 'Campaign Performance'
    },
    
    // Settings
    settings: {
      title: 'Settings',
      account: 'Account',
      privacy: 'Privacy',
      language: 'Language',
      customUrl: 'Custom URL',
      deleteAccount: 'Delete Account',
      logout: 'Logout',
      changePassword: 'Change Password',
      notifications: 'Notifications',
      theme: 'Theme',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      autoMode: 'Auto'
    },
    
    // Welcome Flow
    welcome: {
      category: {
        title: 'What type of profile do you want to create?',
        subtitle: 'Choose the option that best describes your goal',
        personal: 'Personal',
        business: 'Business',
        creator: 'Creator',
        influencer: 'Influencer',
        artist: 'Artist',
        professional: 'Professional'
      },
      style: {
        title: 'Choose your style',
        subtitle: 'Select the design you like the most',
        minimal: 'Minimal',
        modern: 'Modern',
        colorful: 'Colorful',
        elegant: 'Elegant',
        bold: 'Bold',
        creative: 'Creative'
      },
      info: {
        title: 'Tell us about yourself',
        subtitle: 'This information will appear on your profile',
        fullName: 'Full Name',
        bio: 'Bio',
        location: 'Location',
        website: 'Website'
      },
      theme: {
        title: 'Customize your theme',
        subtitle: 'Adjust colors and design',
        selectTheme: 'Select Theme',
        customize: 'Customize',
        preview: 'Preview'
      },
      buttons: {
        title: 'Configure your buttons',
        subtitle: 'Choose your button style',
        style: 'Style',
        color: 'Color',
        shape: 'Shape',
        size: 'Size'
      },
      links: {
        title: 'Add your links',
        subtitle: 'Connect with your audience',
        addLink: 'Add Link',
        linkTitle: 'Link Title',
        linkUrl: 'Link URL',
        socialMedia: 'Social Media'
      },
      publish: {
        title: 'All set!',
        subtitle: 'Your profile is configured and ready to share',
        yourUrl: 'Your URL',
        share: 'Share',
        copyLink: 'Copy Link',
        viewProfile: 'View Profile'
      }
    },
    
    // Header
    header: {
      contactUs: 'Contact Us',
      pricing: 'Pricing',
      features: 'Features',
      tutorials: 'Tutorials',
      login: 'Login',
      createFree: 'Create Free Page'
    },

    // Hero
    hero: {
      rating: 'Rated 4.9/5 by over 10,000 users',
      title: 'Your link,',
      titleHighlight: 'infinite',
      titleEnd: 'possibilities',
      subtitle: 'Convert your followers into customers with a professional page that centralizes all your links, products and content.',
      freeStart: '100% Free to start',
      quickSetup: 'Setup in 2 minutes',
      viewDemo: 'View live demo',
      activeUsers: '50K+ active users',
      usedBy: 'Used by creators from Netflix, Spotify and more',
      newBadge: 'New!',
      analytics: 'Analytics',
      joinCreators: 'Join content creators who are already generating more income',
      asSeenIn: 'As seen in:',
      createFree: 'Create my free page'
    },

    // Features
    features: {
      title: 'Everything you need to stand out',
      subtitle: 'Professional tools designed to help you convert your followers into customers',
      customDesign: {
        title: 'Customizable Design',
        description: 'Over 20 professional themes and complete customization tools so your page reflects your unique brand.'
      },
      responsive: {
        title: 'Fully Responsive',
        description: 'Your page looks perfect on any device. Optimized for mobile, tablets and desktop.'
      },
      analytics: {
        title: 'Integrated Analytics',
        description: 'Detailed tracking of clicks, visitors and performance of your links. Make data-driven decisions.'
      },
      sharing: {
        title: 'Easy to Share',
        description: 'One link for all your social networks. Perfect for Instagram, TikTok, Twitter and more.'
      },
      quickSetup: {
        title: 'Quick Setup',
        description: 'Create your page in less than 5 minutes. No code, no complications. Just drag, drop and publish.'
      },
      secure: {
        title: 'Secure and Reliable',
        description: 'Secure hosting with SSL included. 99.9% uptime guaranteed so your links always work.'
      },
      ctaTitle: 'Ready to try it for free?',
      ctaSubtitle: 'Join over 10,000 creators who are already using our platform to grow their business',
      startFree: 'Start FREE now!',
      viewAll: 'View all features'
    },

    // Footer
    footer: {
      description: 'The easiest and most professional platform to create your link page. Connect all your social networks and content in one place.',
      sections: {
        product: 'Product',
        support: 'Support',
        company: 'Company',
        legal: 'Legal'
      },
      links: {
        features: 'Features',
        templates: 'Templates',
        pricing: 'Pricing',
        analytics: 'Analytics',
        integrations: 'Integrations',
        api: 'API',
        helpCenter: 'Help Center',
        tutorials: 'Tutorials',
        faq: 'FAQ',
        contact: 'Contact Us',
        status: 'Service Status',
        reportBug: 'Report Bug',
        about: 'About Us',
        blog: 'Blog',
        careers: 'Careers',
        press: 'Press',
        partners: 'Partners',
        affiliates: 'Affiliates',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        gdpr: 'GDPR',
        security: 'Security',
        compliance: 'Compliance'
      },
      newsletter: {
        title: 'Stay up to date with the latest news',
        subtitle: 'Get tips, tutorials and news about new features',
        placeholder: 'Your email',
        subscribe: 'Subscribe'
      },
      stats: {
        activeUsers: 'Active Users',
        linksCreated: 'Links Created',
        uptime: 'Uptime',
        countries: 'Countries'
      },
      copyright: '© 2024 EnlacePro. All rights reserved.',
      madeWith: 'Made with',
      forCreators: 'for creators',
      allSystems: 'All operating systems'
    },

    // How It Works
    howItWorks: {
      title: 'How it works',
      subtitle: 'In just 3 simple steps you\'ll have your professional page ready to share',
      steps: {
        step1: {
          title: 'Sign Up Free',
          description: 'Create your account in less than 30 seconds. No credit card required.',
          details: [
            'Register with email or Google',
            'Instant verification',
            'Immediate access to dashboard'
          ]
        },
        step2: {
          title: 'Customize Your Page',
          description: 'Choose your theme, add your links and customize the design to your taste.',
          details: [
            'Over 20 professional themes',
            'Intuitive visual editor',
            'Real-time preview'
          ]
        },
        step3: {
          title: 'Share and Grow',
          description: 'Publish your unique link and start directing traffic to where it matters most.',
          details: [
            'Custom URL (your-name.com)',
            'Perfect for Instagram bio',
            'Detailed analytics included'
          ]
        }
      },
      cta: {
        title: 'Ready to get started?',
        subtitle: 'Thousands of creators are already using our platform to grow their audience',
        button: 'Create my free page',
        disclaimer: 'No credit card required • Setup in 2 minutes'
      }
    },

    // Templates
    templates: {
      title: 'Templates that inspire',
      subtitle: 'Discover professional designs created especially for different industries and styles',
      categories: {
        all: 'All',
        influencer: 'Influencer',
        business: 'Business',
        art: 'Art',
        restaurant: 'Restaurant',
        fitness: 'Fitness',
        minimalist: 'Minimalist'
      },
      templateNames: {
        influencerLifestyle: 'Influencer Lifestyle',
        businessPro: 'Business Pro',
        creativeArtist: 'Creative Artist',
        foodRestaurant: 'Food & Restaurant',
        fitnessCoach: 'Fitness Coach',
        minimalist: 'Minimalist'
      },
      descriptions: {
        influencerLifestyle: 'Perfect for content creators and lifestyle bloggers',
        businessPro: 'Ideal for companies and independent professionals',
        creativeArtist: 'For artists, musicians and creatives who want to stand out',
        foodRestaurant: 'Specialized for restaurants and food bloggers',
        fitnessCoach: 'Designed for trainers and fitness coaches',
        minimalist: 'Elegant and simple, for any type of professional'
      },
      actions: {
        preview: 'Preview',
        useTemplate: 'Use Template',
        more: 'more'
      },
      cta: {
        title: 'Can\'t find what you\'re looking for?',
        subtitle: 'Our visual editor allows you to create unique designs from scratch or customize any template to your taste',
        createFromScratch: 'Create from scratch',
        viewAll: 'View all templates'
      }
    },

    // Testimonials
    testimonials: {
      title: 'What our users say',
      subtitle: 'Real testimonials from creators who have transformed their business',
      originalSubtitle: 'Thousands of creators, entrepreneurs and professionals trust us to grow their business',
      stats: {
        activeUsers: 'Active users',
        linksCreated: 'Links created',
        uptimeGuaranteed: 'Uptime guaranteed',
        averageRating: 'Average rating'
      },
      users: {
        maria: {
          name: 'Maria González',
          role: 'Lifestyle Influencer',
          testimonial: 'Since using this platform, I\'ve increased my conversions by 300%. It\'s super easy to use and my followers find everything they need in one place.',
          metric: '300% more conversions'
        },
        carlos: {
          name: 'Carlos Mendoza',
          role: 'Fitness Coach',
          testimonial: 'Perfect for my coaching business. My clients can easily access my programs, appointment calendar and exclusive content. The analytics help me understand what works best.',
          metric: '50+ new clients'
        },
        ana: {
          name: 'Ana Ruiz',
          role: 'Entrepreneur',
          testimonial: 'As a graphic designer, I needed something that looked professional. This service exceeded my expectations. My clients always comment on how elegant my page looks.',
          metric: 'Professional portfolio'
        },
        luis: {
          name: 'Luis Fernández',
          role: 'Musician',
          testimonial: 'Amazing for artists. I can show my music, concert dates and sell my merchandise, all from one link. My fans love it.',
          metric: '2M+ plays'
        },
        sofia: {
          name: 'Sofia Morales',
          role: 'Food Blogger',
          testimonial: 'The recipe section and link to my blog have completely transformed my reach. Now I direct quality traffic directly to my content.',
          metric: '500% more traffic'
        },
        pedro: {
          name: 'Pedro Vega',
          role: 'Digital Consultant',
          testimonial: 'As a consultant, I needed to convey professionalism. This tool not only looks incredible, but the detailed analytics help me optimize constantly.',
          metric: '40+ monthly consultations'
        }
      },
      cta: {
        title: 'Join thousands of satisfied users',
        subtitle: 'Start creating your professional page today and discover why we\'re the favorite choice of creators and entrepreneurs',
        createPage: 'Create my free page',
        viewMore: 'View more testimonials',
        rating: '⭐ Average rating of 4.9/5 based on over 1,000 reviews'
      },
      controls: {
        previous: 'Previous testimonial',
        next: 'Next testimonial',
        play: 'Resume rotation',
        pause: 'Pause rotation',
        goTo: 'Go to testimonial'
      },
      featured: 'FEATURED'
    },

    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'We answer all your questions about our platform and how it can help you grow your business',
      questions: [
        {
          question: 'Is it really free to create my page?',
          answer: 'Yes, you can create and publish your page completely free. Includes hosting, SSL and all basic functions. You only pay if you want premium features like custom domain or advanced analytics.'
        },
        {
          question: 'Do I need technical knowledge to use the platform?',
          answer: 'Not at all. Our platform is designed to be super easy to use. With our visual drag-and-drop editor, you can create your page in minutes without writing a single line of code.'
        },
        {
          question: 'Can I use my own custom domain?',
          answer: 'Yes, with our premium plan you can connect your own domain (e.g. yourcompany.com). We also offer free custom subdomains (e.g. yourname.enlacepro.com).'
        },
        {
          question: 'What kind of analytics can I get?',
          answer: 'You get detailed statistics on visitors, link clicks, most used devices, countries of origin, and much more. Premium analytics include historical data and report export.'
        },
        {
          question: 'Can I change my page design whenever I want?',
          answer: 'Of course. You can change themes, colors, fonts and layout at any time. All changes are applied instantly and your link remains the same.'
        },
        {
          question: 'Are there limits on the number of links I can add?',
          answer: 'In the free plan you can add up to 20 links. Premium plans have no limits and include additional features like action buttons, social media integration and more.'
        },
        {
          question: 'Will my page be responsive (look good on mobile)?',
          answer: 'Absolutely. All our themes are optimized to look perfect on any device: mobile, tablets and computers. 80% of your visitors will come from mobile.'
        },
        {
          question: 'Can I integrate my online store or payment system?',
          answer: 'Yes, you can integrate links to your store, PayPal, Stripe, or any payment platform. We also offer special widgets to showcase featured products.'
        },
        {
          question: 'What happens if I cancel my premium subscription?',
          answer: 'Your page will continue to work with the free plan features. You won\'t lose your content or link, just the premium features like custom domain and advanced analytics.'
        },
        {
          question: 'Do you offer technical support if I have problems?',
          answer: 'Yes, we offer email support for all users. Premium users have access to priority support and live chat. We also have a complete knowledge base.'
        }
      ],
      cta: {
        title: 'Can\'t find the answer you\'re looking for?',
        subtitle: 'Our support team is here to help you. Contact us and we\'ll solve all your questions personally.',
        contactSupport: 'Contact Support',
        viewTutorials: 'View Tutorials',
        responseTime: '📧 Average response in less than 2 hours'
      }
    },

    // Pricing
    pricing: {
      title: 'Plans & Pricing',
      subtitle: 'Choose the perfect plan to grow your online presence. Start for free and upgrade when you\'re ready.',
      guarantee: '30-day money-back guarantee',
      mostPopular: 'Most Popular',
      plans: {
        free: {
          name: 'Free',
          price: '$0',
          period: '',
          description: 'Perfect to get started and try the platform',
          button: 'Get Started Free'
        },
        pro: {
          name: 'Pro',
          price: '$9',
          period: 'month',
          description: 'Ideal for creators and small businesses',
          button: 'Start Free Trial'
        },
        business: {
          name: 'Business',
          price: '$29',
          period: 'month',
          description: 'For growing teams and companies',
          button: 'Contact Sales'
        }
      },
      features: {
        linksLimit: 'Up to 20 links',
        basicTemplates: '10+ basic templates',
        basicAnalytics: 'Basic analytics',
        mobileFriendly: 'Mobile optimized',
        basicCustomization: 'Basic customization',
        unlimitedLinks: 'Unlimited links',
        allTemplates: '50+ premium templates',
        advancedAnalytics: 'Advanced analytics',
        customDomain: 'Custom domain',
        advancedCustomization: 'Advanced customization',
        prioritySupport: 'Priority support',
        removeWatermark: 'Remove watermark',
        socialIntegration: 'Social media integration',
        everythingInPro: 'Everything in Pro',
        teamCollaboration: 'Team collaboration',
        advancedIntegrations: 'Advanced integrations',
        customBranding: 'Custom branding',
        apiAccess: 'API access',
        dedicatedSupport: 'Dedicated support',
        customReports: 'Custom reports',
        whitelabel: 'White-label solution'
      },
      limitations: {
        noCustomDomain: 'No custom domain',
        basicSupport: 'Basic email support',
        limitedAnalytics: 'Limited analytics'
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about our plans',
        questions: {
          paymentMethods: {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
          },
          cancelAnytime: {
            question: 'Can I cancel anytime?',
            answer: 'Yes, you can cancel your subscription at any time from your dashboard. No penalties or cancellation fees.'
          },
          freeTrial: {
            question: 'Do you offer a free trial?',
            answer: 'Yes, all premium plans include a 14-day free trial. No credit card required.'
          },
          upgrade: {
            question: 'Can I change plans later?',
            answer: 'Absolutely. You can upgrade or downgrade your plan at any time from your dashboard.'
          }
        }
      },
      cta: {
        title: 'Ready to grow your audience?',
        subtitle: 'Join thousands of creators already using our platform to connect with their audience.',
        startFree: 'Start Free',
        contactSales: 'Contact Sales'
      }
    },

    // Metadata
    metadata: {
      title: 'EnlacePro - Create your professional link page | Link in Bio',
      description: 'The easiest platform to create your professional link page. Centralize all your links, increase conversions and grow your business. 100% free to start.',
      keywords: 'link in bio, link page, linktree, bio link, instagram links, free website, content creators',
      ogTitle: 'EnlacePro - Your link, infinite possibilities',
      ogDescription: 'Convert your followers into customers with a professional page that centralizes all your links, products and content.',
      twitterTitle: 'EnlacePro - Create your professional link page',
      twitterDescription: 'The easiest platform to create your professional link page. 100% free to start.'
    },

    // Messages
    messages: {
      linkCopied: 'Link copied to clipboard',
      saveSuccess: 'Changes saved successfully',
      saveError: 'Error saving changes',
      deleteConfirm: 'Are you sure you want to delete?',
      deleteSuccess: 'Deleted successfully',
      deleteError: 'Error deleting',
      uploadSuccess: 'Image uploaded successfully',
      uploadError: 'Error uploading image',
      welcomeNotification: 'Welcome!',
      welcomeMessage: 'Thanks for enabling notifications. We\'ll keep you updated with the best offers.',
      testNotification: 'Test Notification',
      testMessage: 'This is a test message to verify that notifications work correctly.',
      abandonedCart: 'Don\'t forget your cart!',
      abandonedCartMessage: 'You have items waiting for you',
      specialOffer: 'Special offer for you!',
      specialOfferMessage: 'off - Limited time only'
    }
  }
};

// Get nested translation value
export function getTranslation(key: string, lang: Language): any {
  const keys = key.split('.');
  let current: any = translations[lang];
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to Spanish if key not found
      current = translations['es'];
      for (const fallbackKey of keys) {
        if (current && typeof current === 'object' && fallbackKey in current) {
          current = current[fallbackKey];
        } else {
          return key; // Return key if not found
        }
      }
    }
  }
  
  // Return the value as is (can be string, array, object, etc.)
  return current !== undefined ? current : key;
}

// Language storage
export const getStoredLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language;
    if (stored === 'es' || stored === 'en') {
      return stored;
    }
    // Auto-detect browser language
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    return browserLang;
  }
  return 'es';
};

export const setStoredLanguage = (lang: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
};

// Language context
export const DEFAULT_LANGUAGE: Language = 'es';

// Language detection
export const detectLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    // Check stored preference
    const stored = localStorage.getItem('language') as Language;
    if (stored === 'es' || stored === 'en') {
      return stored;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      return 'es';
    } else {
      return 'en';
    }
  }
  return DEFAULT_LANGUAGE;
};