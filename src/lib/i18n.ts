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
        title: 'Construyamos tu página perfecta',
        subtitle: 'Vamos a personalizar tu experiencia en base a tu perfil y objetivos para crear la página ideal para ti',
        welcomeBadge: '¡Empecemos!',
        step: 'Paso',
        of: 'de',
        profileQuestion: '¿Qué tipo de perfil quieres crear?',
        profileSubtitle: 'Elige la opción que mejor describa quién eres',
        purposeQuestion: '¿Para qué usarás tu página?',
        purposeSubtitle: 'Selecciona tu objetivo principal',
        back: 'Volver',
        continue: 'Continuar',
        whatYouGet: '¿Qué obtienes con tu página?',
        feature1Title: 'Diseño Personalizado',
        feature1Desc: 'Temas y estilos adaptados a tu tipo de perfil',
        feature2Title: 'Enlaces Optimizados',
        feature2Desc: 'Sugerencias inteligentes para maximizar conversiones',
        feature3Title: 'Analytics Detallados',
        feature3Desc: 'Métricas específicas para tu industria',
        
        // Profile types
        creator: 'Creador de Contenido',
        creatorDesc: 'Para YouTubers, TikTokers, Instagramers y otros creadores',
        artist: 'Artista',
        artistDesc: 'Para músicos, diseñadores, fotógrafos y artistas visuales',
        business: 'Negocio',
        businessDesc: 'Para empresas, startups y servicios profesionales',
        individual: 'Profesional',
        individualDesc: 'Para perfiles personales y profesionales independientes'
      },
      
      purpose: {
        // Creator purposes
        promoteContent: 'Promocionar mi contenido',
        promoteContentDesc: 'Dirigir tráfico a videos, posts y proyectos creativos',
        growAudience: 'Hacer crecer mi audiencia',
        growAudienceDesc: 'Conectar con nuevos seguidores en todas las plataformas',
        monetize: 'Monetizar mis creaciones',
        monetizeDesc: 'Generar ingresos con patrocinios, ventas y membresías',
        
        // Artist purposes
        showcasePortfolio: 'Mostrar mi portafolio',
        showcasePortfolioDesc: 'Exhibir mi trabajo y proyectos artísticos',
        sellArt: 'Vender mi arte',
        sellArtDesc: 'Comercializar obras, prints y servicios creativos',
        connectFans: 'Conectar con mis fans',
        connectFansDesc: 'Crear una comunidad alrededor de mi arte',
        
        // Business purposes
        generateLeads: 'Generar leads',
        generateLeadsDesc: 'Capturar contactos potenciales y clientes',
        driveSales: 'Impulsar ventas',
        driveSalesDesc: 'Dirigir tráfico a productos y servicios',
        customerSupport: 'Ofrecer soporte',
        customerSupportDesc: 'Centralizar recursos y contacto para clientes',
        
        // Individual purposes
        professionalProfile: 'Perfil profesional',
        professionalProfileDesc: 'Crear presencia digital para networking y oportunidades',
        personalHobbies: 'Hobbies y proyectos',
        personalHobbiesDesc: 'Compartir intereses personales y side projects',
        socialLinks: 'Consolidar mis redes',
        socialLinksDesc: 'Unificar todas mis redes sociales en un solo lugar'
      },
      style: {
        title: 'Elige tu estilo perfecto',
        subtitle: 'Selecciona el diseño que mejor represente tu personalidad y objetivos',
        back: 'Volver',
        step: 'Paso',
        of: 'de',
        progress: 'Progreso',
        continue: 'Continuar',
        whyMatters: '¿Por qué importa el estilo?',
        whyMattersDesc: 'El estilo de tu página influye en cómo te perciben tus visitantes y puede impactar directamente en tus conversiones',
        
        // Style options
        minimalist: 'Minimalista',
        minimalistDesc: 'Diseño limpio y profesional, perfecto para negocios',
        minimalistFeature1: 'Diseño limpio y enfocado',
        minimalistFeature2: 'Carga rápida',
        minimalistFeature3: 'Profesional y elegante',
        
        featuredImage: 'Imagen Destacada',
        featuredImageDesc: 'Tu foto de perfil es el protagonista principal',
        featuredFeature1: 'Imagen de perfil grande',
        featuredFeature2: 'Ideal para influencers',
        featuredFeature3: 'Conexión personal',
        
        fullBackground: 'Fondo Completo',
        fullBackgroundDesc: 'Imagen de fondo que abarca toda la pantalla',
        fullBgFeature1: 'Fondo visual impactante',
        fullBgFeature2: 'Experiencia inmersiva',
        fullBgFeature3: 'Perfecto para artistas',
        
        creative: 'Creativo',
        creativeDesc: 'Diseño único con elementos dinámicos y creativos',
        creativeFeature1: 'Animaciones suaves',
        creativeFeature2: 'Elementos interactivos',
        creativeFeature3: 'Destacas del resto',
        
        // Benefits
        benefit1Title: 'Primera Impresión',
        benefit1Desc: 'Tu estilo determina la primera impresión que causas en tus visitantes',
        benefit2Title: 'Engagement',
        benefit2Desc: 'Un buen diseño aumenta el tiempo que pasan en tu página',
        benefit3Title: 'Conversiones',
        benefit3Desc: 'El estilo correcto puede aumentar tus clicks hasta un 40%'
      },
      info: {
        title: 'Cuéntanos sobre ti',
        subtitle: 'Esta información será visible en tu página y ayudará a tus visitantes a conocerte mejor',
        back: 'Volver',
        step: 'Paso',
        of: 'de',
        progress: 'Progreso',
        continue: 'Continuar',
        
        avatarTitle: 'Foto de perfil',
        uploadPhoto: 'Subir foto',
        changePhoto: 'Cambiar foto',
        photoHint: 'JPG, PNG o GIF. Máximo 5MB. Recomendado: 400x400px',
        
        nameLabel: 'Tu nombre',
        namePlaceholder: 'Ej: Ana García o Mi Marca',
        bioLabel: 'Biografía',
        bioPlaceholder: 'Cuéntanos brevemente sobre ti, tu profesión o lo que haces...',
        bioHint: 'Una buena biografía ayuda a conectar con tu audiencia',
        
        preview: 'Vista previa',
        tipsTitle: 'Consejos para destacar',
        
        tip1Title: 'Sé auténtico',
        tip1Desc: 'Usa tu nombre real o marca conocida. La autenticidad genera confianza.',
        tip2Title: 'Bio efectiva',
        tip2Desc: 'Menciona qué haces, para quién y qué valor aportas en pocas palabras.',
        tip3Title: 'Foto profesional',
        tip3Desc: 'Una buena foto de perfil puede aumentar tus conversiones hasta un 40%.',
        
        validation: {
          nameRequired: 'El nombre es obligatorio',
          nameTooShort: 'El nombre debe tener al menos 2 caracteres',
          nameTooLong: 'El nombre no puede tener más de 50 caracteres',
          bioRequired: 'La biografía es obligatoria',
          bioTooShort: 'La biografía debe tener al menos 10 caracteres',
          bioTooLong: 'La biografía no puede tener más de 160 caracteres',
          avatarTooLarge: 'La imagen es muy grande. Máximo 5MB',
          avatarInvalidType: 'Formato no válido. Usa JPG, PNG o GIF',
          avatarUploadError: 'Error al subir la imagen. Inténtalo de nuevo'
        }
      },
      theme: {
        title: 'Personaliza tu apariencia',
        subtitle: 'Elige los colores y diseño que mejor representen tu estilo personal o marca',
        back: 'Volver',
        step: 'Paso',
        of: 'de',
        progress: 'Progreso',
        continue: 'Continuar',
        livePreview: 'Vista previa',
        
        // Tabs
        themesTab: 'Temas y Colores',
        uploadTab: 'Subir Imagen',
        
        // Predefined themes
        predefinedTitle: 'Temas Prediseñados',
        predefinedDesc: 'Elige entre nuestros temas cuidadosamente diseñados para diferentes estilos y profesiones',
        
        // Custom gradient
        customTitle: 'Crea tu Degradado',
        customDesc: 'Diseña un degradado único combinando dos colores de tu elección',
        colorStart: 'Color de inicio',
        colorEnd: 'Color final',
        copied: '¡Copiado al portapapeles!',
        
        // Background image
        backgroundTitle: 'Imagen de Fondo',
        backgroundDesc: 'Sube una imagen personalizada que servirá como fondo de tu página',
        uploadImage: 'Subir imagen',
        changeImage: 'Cambiar imagen',
        imageSelected: 'Imagen seleccionada',
        remove: 'Quitar',
        imageHint: 'JPG, PNG o GIF. Máximo 10MB. Recomendado: 1080x1920px',
        
        // Tips
        tipsTitle: 'Consejos de diseño',
        tip1Title: 'Contraste es clave',
        tip1Desc: 'Asegúrate de que el texto sea fácil de leer sobre tu fondo elegido',
        tip2Title: 'Consistencia visual',
        tip2Desc: 'Los colores deben alinearse con tu marca o personalidad',
        tip3Title: 'Menos es más',
        tip3Desc: 'Un diseño simple y elegante suele ser más efectivo que uno complejo',
        
        validation: {
          imageTooLarge: 'La imagen es muy grande. Máximo 10MB',
          imageInvalidType: 'Formato no válido. Usa JPG, PNG o GIF',
          imageUploadError: 'Error al subir la imagen. Inténtalo de nuevo'
        }
      },
      buttons: {
        title: 'Personaliza tus botones',
        subtitle: 'Define el estilo y apariencia de los enlaces que aparecerán en tu página',
        back: 'Volver',
        step: 'Paso',
        of: 'de',
        progress: 'Progreso',
        continue: 'Continuar',
        livePreview: 'Vista previa',
        
        // Tabs
        quickTab: 'Configuración Rápida',
        advancedTab: 'Opciones Avanzadas',
        
        // Quick Setup
        styleTitle: 'Estilo de Botón',
        styleDesc: 'Elige la forma que mejor se adapte a tu diseño',
        colorsTitle: 'Colores',
        colorsDesc: 'Selecciona los colores que representen tu marca o estilo',
        previewTitle: 'Vista Previa',
        suggestedColors: 'Colores Sugeridos',
        themeColors: 'Colores del Tema',
        exampleButton: 'Botón de Ejemplo',
        
        // Button Styles
        styles: {
          rounded: 'Redondeado',
          roundedDesc: 'Esquinas completamente redondeadas, estilo moderno',
          semiRounded: 'Semi-redondeado',
          semiRoundedDesc: 'Esquinas ligeramente redondeadas, equilibrado',
          square: 'Cuadrado',
          squareDesc: 'Esquinas rectas, estilo clásico y profesional'
        },
        
        // Advanced Options
        advancedTitle: 'Personalización Avanzada',
        advancedDesc: 'Ajusta cada detalle para crear botones únicos',
        colorsAndAppearance: 'Colores y Apariencia',
        shapeAndStyle: 'Forma y Estilo',
        
        // Color controls
        background: 'Fondo',
        text: 'Texto',
        border: 'Borde',
        shadow: 'Sombra',
        color: 'Color',
        opacity: 'Opacidad',
        
        // Tips
        tipsTitle: 'Consejos para botones efectivos',
        tip1Title: 'Contraste claro',
        tip1Desc: 'Asegúrate de que el texto sea fácil de leer sobre el fondo del botón',
        tip2Title: 'Tamaño apropiado',
        tip2Desc: 'Los botones deben ser lo suficientemente grandes para hacer clic fácilmente',
        tip3Title: 'Consistencia visual',
        tip3Desc: 'Mantén el mismo estilo para todos los botones en tu página'
      },
      links: {
        title: 'Añade tus enlaces',
        subtitle: 'Conecta todas tus redes sociales y sitios importantes en un solo lugar',
        back: 'Volver',
        step: 'Paso',
        of: 'de',
        progress: 'Progreso',
        continue: 'Continuar',
        livePreview: 'Vista previa',
        
        // Tabs
        socialTab: 'Redes Sociales',
        customTab: 'Enlaces Personalizados',
        
        // Social Links
        socialTitle: 'Redes Sociales',
        socialDesc: 'Conecta tus perfiles de redes sociales para que tus visitantes puedan seguirte',
        connected: 'Conectado',
        
        // Social Platform placeholders
        instagram: {
          placeholder: 'Tu usuario de Instagram'
        },
        tiktok: {
          placeholder: 'Tu usuario de TikTok'
        },
        whatsapp: {
          placeholder: 'Tu número de WhatsApp'
        },
        youtube: {
          placeholder: 'URL de tu canal de YouTube'
        },
        twitter: {
          placeholder: 'Tu usuario de X'
        },
        facebook: {
          placeholder: 'URL de tu perfil de Facebook'
        },
        
        // Custom Links
        customTitle: 'Enlaces Personalizados',
        customDesc: 'Añade enlaces a tu sitio web, tienda online, blog o cualquier otro sitio importante',
        addLink: 'Añadir Enlace',
        addFirstLink: 'Añadir mi primer enlace',
        noCustomLinks: 'Sin enlaces personalizados',
        noCustomLinksDesc: 'Añade enlaces a tu sitio web, portafolio, tienda online o cualquier sitio importante',
        titlePlaceholder: 'Título del enlace',
        urlPlaceholder: 'https://ejemplo.com',
        
        // Tips
        tipsTitle: 'Consejos para enlaces efectivos',
        tip1Title: 'Prioritiza lo importante',
        tip1Desc: 'Coloca los enlaces más importantes al principio para mayor visibilidad',
        tip2Title: 'Títulos claros',
        tip2Desc: 'Usa títulos descriptivos que expliquen claramente a dónde lleva cada enlace',
        tip3Title: 'Mantén actualizado',
        tip3Desc: 'Revisa regularmente que todos tus enlaces funcionen correctamente'
      },
      publish: {
        title: '¡Todo listo!',
        subtitle: 'Tu página ya está publicada y lista para ser compartida con el mundo',
        back: 'Volver',
        completed: '¡Completado!',
        progress: 'Progreso',
        finalPreview: 'Vista previa final',
        
        // Loading state
        publishing: 'Publicando tu página...',
        publishingDesc: 'Estamos preparando todo para ti, solo un momento más',
        
        // URL section
        yourUrl: 'Tu URL Pública',
        copy: 'Copiar',
        copied: '¡Copiado!',
        view: 'Ver',
        urlHint: 'Esta es la dirección que puedes compartir con tus seguidores',
        
        // Share section
        shareTitle: 'Comparte tu página',
        shareButton: 'Compartir ahora',
        shareText: 'Mira mi nueva página de enlaces',
        dashboard: 'Ir al Dashboard',
        
        // What's next
        whatsNext: '¿Qué sigue?',
        feature1: 'Analytics',
        feature2: 'Engagement',
        feature3: 'Personalización',
        feature4: 'Móvil Ready',
        
        // Congratulations
        congratulations: '¡Felicitaciones! 🎉',
        congratulationsDesc: 'Has creado exitosamente tu página de enlaces profesional. Ahora puedes comenzar a compartirla y hacer crecer tu audiencia.',
        achievement1: '✅ Página creada',
        achievement2: '🎨 Diseño personalizado',
        achievement3: '🔗 Enlaces configurados'
      }
    },
    
    // Header
    header: {
      home: 'Inicio',
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

    // Contact
    contact: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de soporte y resolveremos todas tus dudas.',
      form: {
        title: 'Envíanos un mensaje',
        name: 'Nombre completo',
        namePlaceholder: 'Tu nombre completo',
        email: 'Correo electrónico',
        emailPlaceholder: 'tu@email.com',
        type: 'Tipo de consulta',
        types: {
          general: 'Consulta general',
          technical: 'Soporte técnico',
          billing: 'Facturación',
          feature: 'Solicitud de función',
          partnership: 'Asociaciones'
        },
        subject: 'Asunto',
        subjectPlaceholder: 'Breve descripción del tema',
        message: 'Mensaje',
        messagePlaceholder: 'Describe tu consulta o problema en detalle...',
        send: 'Enviar mensaje',
        sending: 'Enviando...',
        successMessage: '¡Mensaje enviado exitosamente! Te responderemos pronto.',
        errorMessage: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      },
      methods: {
        title: 'Métodos de contacto',
        email: {
          title: 'Correo electrónico',
          description: 'Respuesta en menos de 24 horas',
          action: 'Enviar email'
        },
        chat: {
          title: 'Chat en vivo',
          description: 'Soporte inmediato durante horario laboral',
          hours: 'Lunes a Viernes, 9:00 - 18:00',
          action: 'Iniciar chat'
        },
        phone: {
          title: 'Teléfono',
          description: 'Soporte telefónico para planes premium',
          action: 'Llamar ahora'
        }
      },
      topics: {
        title: 'Temas de soporte',
        account: {
          title: 'Cuenta y perfil',
          description: 'Ayuda con registro, configuración de cuenta y gestión de perfil',
          responseTime: 'Respuesta en 2-4 horas'
        },
        technical: {
          title: 'Soporte técnico',
          description: 'Problemas técnicos, errores y ayuda con funcionalidades',
          responseTime: 'Respuesta en 1-2 horas'
        },
        billing: {
          title: 'Facturación y pagos',
          description: 'Consultas sobre planes, facturación y métodos de pago',
          responseTime: 'Respuesta en 24 horas'
        }
      },
      office: {
        title: 'Información de la oficina',
        address: {
          title: 'Dirección',
          line1: 'Av. Tecnológica 123, Piso 10',
          line2: 'Ciudad Digital, País 12345'
        },
        hours: {
          title: 'Horarios de atención',
          weekdays: 'Lunes a Viernes: 9:00 - 18:00',
          weekends: 'Sábados: 10:00 - 14:00'
        }
      },
      faq: {
        title: '¿Buscas respuestas rápidas?',
        subtitle: 'Consulta nuestras preguntas frecuentes y tutoriales',
        viewAll: 'Ver todas las preguntas'
      }
    },

    // Features page
    featuresPage: {
      title: 'Todas las funcionalidades que necesitas',
      subtitle: 'Descubre las herramientas profesionales que te ayudarán a hacer crecer tu negocio y convertir más visitantes en clientes',
      cta: {
        try: 'Probar gratis',
        demo: 'Ver demo'
      },
      categories: {
        design: {
          title: 'Diseño y Personalización',
          description: 'Herramientas avanzadas para crear páginas únicas que representen perfectamente tu marca'
        },
        analytics: {
          title: 'Analytics y Métricas',
          description: 'Datos detallados para entender a tu audiencia y optimizar el rendimiento de tus enlaces'
        },
        management: {
          title: 'Gestión de Enlaces',
          description: 'Controla y organiza todos tus enlaces con herramientas profesionales de gestión'
        },
        advanced: {
          title: 'Funciones Avanzadas',
          description: 'Características premium para usuarios profesionales y empresas en crecimiento'
        }
      },
      design: {
        templates: {
          title: 'Plantillas Profesionales',
          description: 'Más de 50 diseños creados por expertos, listos para usar y completamente personalizables'
        },
        customization: {
          title: 'Personalización Total',
          description: 'Cambia colores, fuentes, layouts y añade tu propio CSS para un control completo'
        },
        responsive: {
          title: 'Diseño Responsive',
          description: 'Todos los diseños se adaptan perfectamente a móviles, tablets y escritorio'
        },
        media: {
          title: 'Gestión de Medios',
          description: 'Sube imágenes, videos y GIFs para crear experiencias visuales impactantes'
        }
      },
      analytics: {
        realtime: {
          title: 'Analytics en Tiempo Real',
          description: 'Ve el tráfico y las interacciones de tu página al instante'
        },
        clicks: {
          title: 'Seguimiento de Clicks',
          description: 'Analiza qué enlaces funcionan mejor y optimiza tu estrategia'
        },
        audience: {
          title: 'Análisis de Audiencia',
          description: 'Conoce la demografía, ubicación y comportamiento de tus visitantes'
        },
        export: {
          title: 'Exportar Reportes',
          description: 'Descarga reportes detallados en Excel y PDF para presentaciones'
        }
      },
      management: {
        unlimited: {
          title: 'Enlaces Ilimitados',
          description: 'Añade tantos enlaces como necesites sin restricciones'
        },
        preview: {
          title: 'Vista Previa Instantánea',
          description: 'Ve cómo se verá tu página antes de publicar los cambios'
        },
        social: {
          title: 'Integración Social',
          description: 'Conecta automáticamente con Instagram, TikTok, YouTube y más'
        },
        automation: {
          title: 'Automatización',
          description: 'Programa la publicación de enlaces y actualiza contenido automáticamente'
        }
      },
      advanced: {
        domain: {
          title: 'Dominio Personalizado',
          description: 'Usa tu propio dominio para mayor profesionalismo y confianza'
        },
        integrations: {
          title: 'Integraciones API',
          description: 'Conecta con Zapier, Google Analytics, Facebook Pixel y más'
        },
        notifications: {
          title: 'Notificaciones Push',
          description: 'Mantén a tu audiencia comprometida con notificaciones inteligentes'
        },
        security: {
          title: 'Seguridad Avanzada',
          description: 'SSL gratuito, protección DDoS y backups automáticos incluidos'
        }
      },
      comparison: {
        title: 'Compara nuestros planes',
        subtitle: 'Encuentra el plan perfecto para tus necesidades',
        feature: 'Característica',
        free: 'Gratuito',
        pro: 'Pro',
        business: 'Business',
        customDomain: 'Dominio personalizado',
        analytics: 'Analytics',
        templates: 'Plantillas',
        links: 'Enlaces',
        support: 'Soporte'
      },
      testimonials: {
        title: 'Lo que dicen sobre nuestras funcionalidades',
        subtitle: 'Testimonios reales de usuarios que han transformado su negocio',
        maria: {
          name: 'María González',
          role: 'Influencer de Moda',
          feature: 'Analytics Avanzados',
          quote: 'Los analytics me han ayudado a entender qué contenido genera más engagement. He aumentado mis conversiones un 250%.'
        },
        carlos: {
          name: 'Carlos Mendoza',
          role: 'Entrepreneur',
          feature: 'Dominio Personalizado',
          quote: 'Tener mi propio dominio me ha dado muchísima credibilidad. Mis clientes confían más en mi marca ahora.'
        },
        ana: {
          name: 'Ana Ruiz',
          role: 'Diseñadora Gráfica',
          feature: 'Personalización Total',
          quote: 'La flexibilidad de diseño es increíble. Puedo crear páginas que realmente representan mi estilo único.'
        }
      },
      finalCta: {
        title: '¿Listo para desbloquear todo el potencial?',
        subtitle: 'Únete a miles de profesionales que ya están usando todas estas funcionalidades para hacer crecer su negocio',
        start: 'Comenzar gratis',
        plans: 'Ver planes'
      }
    },

    // Tutorials page
    tutorials: {
      title: 'Tutoriales y Guías',
      subtitle: 'Aprende a crear páginas increíbles con nuestros tutoriales paso a paso, desde lo básico hasta técnicas avanzadas',
      searchPlaceholder: 'Buscar tutoriales...',
      filter: 'Filtrar',
      featured: 'Destacados',
      watch: 'Ver tutorial',
      categories: {
        all: 'Todos',
        gettingStarted: 'Primeros Pasos',
        design: 'Diseño',
        analytics: 'Analytics',
        advanced: 'Avanzado',
        marketing: 'Marketing'
      },
      difficulty: {
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado'
      },
      items: {
        quickStart: {
          title: 'Inicio Rápido: Tu Primera Página en 5 Minutos',
          description: 'Aprende a crear tu primera página profesional desde cero en pocos minutos'
        },
        firstPage: {
          title: 'Creando Tu Primera Página Profesional',
          description: 'Guía completa para configurar tu perfil y añadir tus primeros enlaces'
        },
        addLinks: {
          title: 'Cómo Añadir y Organizar Enlaces',
          description: 'Mejores prácticas para gestionar tus enlaces y maximizar conversiones'
        },
        chooseTemplate: {
          title: 'Eligiendo la Plantilla Perfecta',
          description: 'Encuentra el diseño que mejor represente tu marca y personalidad'
        },
        customColors: {
          title: 'Personalización de Colores y Fuentes',
          description: 'Crea una identidad visual única con colores y tipografías personalizadas'
        },
        mobileOptimization: {
          title: 'Optimización para Móviles',
          description: 'Asegúrate de que tu página se vea perfecta en todos los dispositivos'
        },
        understandAnalytics: {
          title: 'Entendiendo tus Analytics',
          description: 'Interpreta los datos de tu página para tomar mejores decisiones'
        },
        trackConversions: {
          title: 'Seguimiento de Conversiones Avanzado',
          description: 'Configura eventos personalizados y mide el ROI de tus enlaces'
        },
        customDomain: {
          title: 'Configurando tu Dominio Personalizado',
          description: 'Conecta tu propio dominio para mayor profesionalismo'
        },
        apiIntegration: {
          title: 'Integraciones API Avanzadas',
          description: 'Conecta con herramientas externas usando nuestra API'
        },
        socialMediaStrategy: {
          title: 'Estrategia de Redes Sociales',
          description: 'Maximiza tu alcance en Instagram, TikTok y otras plataformas'
        },
        seoOptimization: {
          title: 'Optimización SEO para Link Pages',
          description: 'Mejora tu visibilidad en buscadores con técnicas SEO específicas'
        }
      },
      noResults: {
        title: 'No se encontraron tutoriales',
        description: 'Intenta con otros términos de búsqueda o cambia la categoría'
      },
      learningPath: {
        title: '¿Listo para dominar tu página?',
        subtitle: 'Sigue nuestro plan de aprendizaje completo y conviértete en un experto en páginas de enlaces',
        start: 'Comenzar ahora',
        download: 'Descargar guía PDF'
      },
      help: {
        title: '¿Necesitas ayuda personalizada?',
        subtitle: 'Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta',
        contact: 'Contactar soporte'
      }
    },

    // Login page
    login: {
      hero: {
        title: 'Accede a tu dashboard',
        subtitle: 'Gestiona tus enlaces, analiza tu audiencia y haz crecer tu negocio con herramientas profesionales'
      },
      features: {
        analytics: 'Analytics detallados en tiempo real',
        customization: 'Personalización completa de diseño',
        security: 'Seguridad y privacidad garantizada'
      },
      testimonial: {
        quote: 'Esta plataforma transformó completamente mi estrategia digital. Los analytics me ayudan a entender mejor a mi audiencia.'
      },
      form: {
        title: 'Iniciar Sesión',
        subtitle: 'Bienvenido de vuelta, inicia sesión en tu cuenta',
        orContinueWith: 'O continúa con email',
        email: 'Correo electrónico',
        emailPlaceholder: 'tu@email.com',
        password: 'Contraseña',
        passwordPlaceholder: 'Tu contraseña',
        rememberMe: 'Recordarme',
        forgotPassword: '¿Olvidaste tu contraseña?',
        signIn: 'Iniciar Sesión',
        signingIn: 'Iniciando sesión...',
        noAccount: '¿No tienes cuenta?',
        signUp: 'Crear cuenta gratis'
      },
      social: {
        google: 'Continuar con Google',
        facebook: 'Continuar con Facebook',
        github: 'Continuar con GitHub'
      },
      validation: {
        emailRequired: 'El correo electrónico es obligatorio',
        emailInvalid: 'Por favor ingresa un correo electrónico válido',
        passwordRequired: 'La contraseña es obligatoria',
        passwordTooShort: 'La contraseña debe tener al menos 6 caracteres'
      },
      errors: {
        invalidCredentials: 'Correo electrónico o contraseña incorrectos',
        tooManyAttempts: 'Demasiados intentos. Intenta de nuevo en unos minutos',
        generic: 'Ocurrió un error durante el inicio de sesión',
        network: 'Error de conexión. Verifica tu internet e intenta de nuevo'
      },
      success: {
        title: '¡Bienvenido de vuelta!',
        message: 'Redirigiendo a tu dashboard...'
      }
    },

    // Register page
    register: {
      hero: {
        badge: 'Oferta de lanzamiento',
        title: 'Crea tu página profesional gratis',
        subtitle: 'Únete a miles de creadores que ya están generando más ingresos con una página que convierte'
      },
      benefits: {
        noCard: 'Sin tarjeta de crédito requerida',
        quickSetup: 'Configuración en 2 minutos',
        customization: 'Personalización completa'
      },
      stats: {
        users: 'Usuarios activos',
        satisfaction: 'Satisfacción',
        setup: 'Tiempo de configuración'
      },
      testimonial: {
        quote: 'Desde que creé mi página, he triplicado mis conversiones. Es increíblemente fácil de usar y mis seguidores encuentran todo en un solo lugar.'
      },
      form: {
        title: 'Crear Cuenta',
        subtitle: 'Comienza tu viaje hacia el éxito digital',
        orSignUpWith: 'O regístrate con email',
        firstName: 'Nombre',
        firstNamePlaceholder: 'Tu nombre',
        lastName: 'Apellido',
        lastNamePlaceholder: 'Tu apellido',
        email: 'Correo electrónico',
        emailPlaceholder: 'tu@email.com',
        password: 'Contraseña',
        passwordPlaceholder: 'Mínimo 8 caracteres',
        confirmPassword: 'Confirmar Contraseña',
        confirmPasswordPlaceholder: 'Confirma tu contraseña',
        passwordStrength: 'Seguridad de la contraseña',
        agreeTerms: 'Acepto los',
        terms: 'términos de servicio',
        and: 'y la',
        privacy: 'política de privacidad',
        newsletter: 'Quiero recibir novedades y ofertas especiales',
        createAccount: 'Crear mi cuenta',
        creating: 'Creando cuenta...',
        haveAccount: '¿Ya tienes cuenta?',
        signIn: 'Iniciar sesión'
      },
      social: {
        google: 'Continuar con Google',
        facebook: 'Continuar con Facebook'
      },
      password: {
        weak: 'Débil',
        fair: 'Regular',
        good: 'Buena',
        strong: 'Fuerte',
        veryStrong: 'Muy fuerte'
      },
      validation: {
        firstNameRequired: 'El nombre es obligatorio',
        firstNameTooShort: 'El nombre debe tener al menos 2 caracteres',
        lastNameRequired: 'El apellido es obligatorio',
        lastNameTooShort: 'El apellido debe tener al menos 2 caracteres',
        emailRequired: 'El correo electrónico es obligatorio',
        emailInvalid: 'Por favor ingresa un correo electrónico válido',
        passwordRequired: 'La contraseña es obligatoria',
        passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
        confirmPasswordRequired: 'Confirma tu contraseña',
        passwordsDoNotMatch: 'Las contraseñas no coinciden',
        agreeToTermsRequired: 'Debes aceptar los términos de servicio'
      },
      errors: {
        emailExists: 'Este correo electrónico ya está registrado',
        invalidData: 'Los datos ingresados no son válidos',
        tooManyAttempts: 'Demasiados intentos. Intenta de nuevo en unos minutos',
        generic: 'Ocurrió un error durante el registro',
        network: 'Error de conexión. Verifica tu internet e intenta de nuevo'
      },
      success: {
        title: '¡Cuenta creada exitosamente!',
        message: 'Configurando tu dashboard...'
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
        title: 'Let\'s build your perfect page',
        subtitle: 'We\'ll customize your experience based on your profile and goals to create the ideal page for you',
        welcomeBadge: 'Let\'s start!',
        step: 'Step',
        of: 'of',
        profileQuestion: 'What type of profile do you want to create?',
        profileSubtitle: 'Choose the option that best describes who you are',
        purposeQuestion: 'What will you use your page for?',
        purposeSubtitle: 'Select your main objective',
        back: 'Back',
        continue: 'Continue',
        whatYouGet: 'What do you get with your page?',
        feature1Title: 'Custom Design',
        feature1Desc: 'Themes and styles adapted to your profile type',
        feature2Title: 'Optimized Links',
        feature2Desc: 'Smart suggestions to maximize conversions',
        feature3Title: 'Detailed Analytics',
        feature3Desc: 'Industry-specific metrics',
        
        // Profile types
        creator: 'Content Creator',
        creatorDesc: 'For YouTubers, TikTokers, Instagramers and other creators',
        artist: 'Artist',
        artistDesc: 'For musicians, designers, photographers and visual artists',
        business: 'Business',
        businessDesc: 'For companies, startups and professional services',
        individual: 'Professional',
        individualDesc: 'For personal profiles and independent professionals'
      },
      
      purpose: {
        // Creator purposes
        promoteContent: 'Promote my content',
        promoteContentDesc: 'Drive traffic to videos, posts and creative projects',
        growAudience: 'Grow my audience',
        growAudienceDesc: 'Connect with new followers across all platforms',
        monetize: 'Monetize my creations',
        monetizeDesc: 'Generate income with sponsorships, sales and memberships',
        
        // Artist purposes
        showcasePortfolio: 'Showcase my portfolio',
        showcasePortfolioDesc: 'Display my work and artistic projects',
        sellArt: 'Sell my art',
        sellArtDesc: 'Commercialize works, prints and creative services',
        connectFans: 'Connect with my fans',
        connectFansDesc: 'Create a community around my art',
        
        // Business purposes
        generateLeads: 'Generate leads',
        generateLeadsDesc: 'Capture potential contacts and customers',
        driveSales: 'Drive sales',
        driveSalesDesc: 'Direct traffic to products and services',
        customerSupport: 'Offer support',
        customerSupportDesc: 'Centralize resources and contact for customers',
        
        // Individual purposes
        professionalProfile: 'Professional profile',
        professionalProfileDesc: 'Create digital presence for networking and opportunities',
        personalHobbies: 'Hobbies and projects',
        personalHobbiesDesc: 'Share personal interests and side projects',
        socialLinks: 'Consolidate my networks',
        socialLinksDesc: 'Unify all my social networks in one place'
      },
      style: {
        title: 'Choose your perfect style',
        subtitle: 'Select the design that best represents your personality and goals',
        back: 'Back',
        step: 'Step',
        of: 'of',
        progress: 'Progress',
        continue: 'Continue',
        whyMatters: 'Why does style matter?',
        whyMattersDesc: 'Your page style influences how visitors perceive you and can directly impact your conversions',
        
        // Style options
        minimalist: 'Minimalist',
        minimalistDesc: 'Clean and professional design, perfect for business',
        minimalistFeature1: 'Clean and focused design',
        minimalistFeature2: 'Fast loading',
        minimalistFeature3: 'Professional and elegant',
        
        featuredImage: 'Featured Image',
        featuredImageDesc: 'Your profile photo is the main protagonist',
        featuredFeature1: 'Large profile image',
        featuredFeature2: 'Ideal for influencers',
        featuredFeature3: 'Personal connection',
        
        fullBackground: 'Full Background',
        fullBackgroundDesc: 'Background image that spans the entire screen',
        fullBgFeature1: 'Impactful visual background',
        fullBgFeature2: 'Immersive experience',
        fullBgFeature3: 'Perfect for artists',
        
        creative: 'Creative',
        creativeDesc: 'Unique design with dynamic and creative elements',
        creativeFeature1: 'Smooth animations',
        creativeFeature2: 'Interactive elements',
        creativeFeature3: 'Stand out from the rest',
        
        // Benefits
        benefit1Title: 'First Impression',
        benefit1Desc: 'Your style determines the first impression you make on visitors',
        benefit2Title: 'Engagement',
        benefit2Desc: 'Good design increases the time visitors spend on your page',
        benefit3Title: 'Conversions',
        benefit3Desc: 'The right style can increase your clicks by up to 40%'
      },
      info: {
        title: 'Tell us about yourself',
        subtitle: 'This information will be visible on your page and help visitors get to know you better',
        back: 'Back',
        step: 'Step',
        of: 'of',
        progress: 'Progress',
        continue: 'Continue',
        
        avatarTitle: 'Profile photo',
        uploadPhoto: 'Upload photo',
        changePhoto: 'Change photo',
        photoHint: 'JPG, PNG or GIF. Max 5MB. Recommended: 400x400px',
        
        nameLabel: 'Your name',
        namePlaceholder: 'Ex: John Smith or My Brand',
        bioLabel: 'Biography',
        bioPlaceholder: 'Tell us briefly about yourself, your profession or what you do...',
        bioHint: 'A good biography helps connect with your audience',
        
        preview: 'Preview',
        tipsTitle: 'Tips to stand out',
        
        tip1Title: 'Be authentic',
        tip1Desc: 'Use your real name or known brand. Authenticity builds trust.',
        tip2Title: 'Effective bio',
        tip2Desc: 'Mention what you do, for whom, and what value you provide in few words.',
        tip3Title: 'Professional photo',
        tip3Desc: 'A good profile photo can increase your conversions by up to 40%.',
        
        validation: {
          nameRequired: 'Name is required',
          nameTooShort: 'Name must be at least 2 characters',
          nameTooLong: 'Name cannot be more than 50 characters',
          bioRequired: 'Biography is required',
          bioTooShort: 'Biography must be at least 10 characters',
          bioTooLong: 'Biography cannot be more than 160 characters',
          avatarTooLarge: 'Image is too large. Maximum 5MB',
          avatarInvalidType: 'Invalid format. Use JPG, PNG or GIF',
          avatarUploadError: 'Error uploading image. Please try again'
        }
      },
      theme: {
        title: 'Customize your appearance',
        subtitle: 'Choose colors and design that best represent your personal style or brand',
        back: 'Back',
        step: 'Step',
        of: 'of',
        progress: 'Progress',
        continue: 'Continue',
        livePreview: 'Live preview',
        
        // Tabs
        themesTab: 'Themes & Colors',
        uploadTab: 'Upload Image',
        
        // Predefined themes
        predefinedTitle: 'Predefined Themes',
        predefinedDesc: 'Choose from our carefully designed themes for different styles and professions',
        
        // Custom gradient
        customTitle: 'Create your Gradient',
        customDesc: 'Design a unique gradient by combining two colors of your choice',
        colorStart: 'Start color',
        colorEnd: 'End color',
        copied: 'Copied to clipboard!',
        
        // Background image
        backgroundTitle: 'Background Image',
        backgroundDesc: 'Upload a custom image that will serve as your page background',
        uploadImage: 'Upload image',
        changeImage: 'Change image',
        imageSelected: 'Image selected',
        remove: 'Remove',
        imageHint: 'JPG, PNG or GIF. Max 10MB. Recommended: 1080x1920px',
        
        // Tips
        tipsTitle: 'Design tips',
        tip1Title: 'Contrast is key',
        tip1Desc: 'Make sure text is easy to read on your chosen background',
        tip2Title: 'Visual consistency',
        tip2Desc: 'Colors should align with your brand or personality',
        tip3Title: 'Less is more',
        tip3Desc: 'A simple and elegant design is usually more effective than a complex one',
        
        validation: {
          imageTooLarge: 'Image is too large. Maximum 10MB',
          imageInvalidType: 'Invalid format. Use JPG, PNG or GIF',
          imageUploadError: 'Error uploading image. Please try again'
        }
      },
      buttons: {
        title: 'Customize your buttons',
        subtitle: 'Define the style and appearance of the links that will appear on your page',
        back: 'Back',
        step: 'Step',
        of: 'of',
        progress: 'Progress',
        continue: 'Continue',
        livePreview: 'Live preview',
        
        // Tabs
        quickTab: 'Quick Setup',
        advancedTab: 'Advanced Options',
        
        // Quick Setup
        styleTitle: 'Button Style',
        styleDesc: 'Choose the shape that best fits your design',
        colorsTitle: 'Colors',
        colorsDesc: 'Select colors that represent your brand or style',
        previewTitle: 'Preview',
        suggestedColors: 'Suggested Colors',
        themeColors: 'Theme Colors',
        exampleButton: 'Example Button',
        
        // Button Styles
        styles: {
          rounded: 'Rounded',
          roundedDesc: 'Fully rounded corners, modern style',
          semiRounded: 'Semi-rounded',
          semiRoundedDesc: 'Slightly rounded corners, balanced',
          square: 'Square',
          squareDesc: 'Straight corners, classic and professional style'
        },
        
        // Advanced Options
        advancedTitle: 'Advanced Customization',
        advancedDesc: 'Adjust every detail to create unique buttons',
        colorsAndAppearance: 'Colors and Appearance',
        shapeAndStyle: 'Shape and Style',
        
        // Color controls
        background: 'Background',
        text: 'Text',
        border: 'Border',
        shadow: 'Shadow',
        color: 'Color',
        opacity: 'Opacity',
        
        // Tips
        tipsTitle: 'Tips for effective buttons',
        tip1Title: 'Clear contrast',
        tip1Desc: 'Make sure text is easy to read on the button background',
        tip2Title: 'Appropriate size',
        tip2Desc: 'Buttons should be large enough to click easily',
        tip3Title: 'Visual consistency',
        tip3Desc: 'Keep the same style for all buttons on your page'
      },
      links: {
        title: 'Add your links',
        subtitle: 'Connect all your social networks and important sites in one place',
        back: 'Back',
        step: 'Step',
        of: 'of',
        progress: 'Progress',
        continue: 'Continue',
        livePreview: 'Live preview',
        
        // Tabs
        socialTab: 'Social Media',
        customTab: 'Custom Links',
        
        // Social Links
        socialTitle: 'Social Media',
        socialDesc: 'Connect your social media profiles so visitors can follow you',
        connected: 'Connected',
        
        // Social Platform placeholders
        instagram: {
          placeholder: 'Your Instagram username'
        },
        tiktok: {
          placeholder: 'Your TikTok username'
        },
        whatsapp: {
          placeholder: 'Your WhatsApp number'
        },
        youtube: {
          placeholder: 'Your YouTube channel URL'
        },
        twitter: {
          placeholder: 'Your X username'
        },
        facebook: {
          placeholder: 'Your Facebook profile URL'
        },
        
        // Custom Links
        customTitle: 'Custom Links',
        customDesc: 'Add links to your website, online store, blog or any other important site',
        addLink: 'Add Link',
        addFirstLink: 'Add my first link',
        noCustomLinks: 'No custom links',
        noCustomLinksDesc: 'Add links to your website, portfolio, online store or any important site',
        titlePlaceholder: 'Link title',
        urlPlaceholder: 'https://example.com',
        
        // Tips
        tipsTitle: 'Tips for effective links',
        tip1Title: 'Prioritize important ones',
        tip1Desc: 'Place the most important links first for better visibility',
        tip2Title: 'Clear titles',
        tip2Desc: 'Use descriptive titles that clearly explain where each link leads',
        tip3Title: 'Keep updated',
        tip3Desc: 'Regularly check that all your links work correctly'
      },
      publish: {
        title: 'All set!',
        subtitle: 'Your page is now published and ready to be shared with the world',
        back: 'Back',
        completed: 'Completed!',
        progress: 'Progress',
        finalPreview: 'Final preview',
        
        // Loading state
        publishing: 'Publishing your page...',
        publishingDesc: 'We are preparing everything for you, just one more moment',
        
        // URL section
        yourUrl: 'Your Public URL',
        copy: 'Copy',
        copied: 'Copied!',
        view: 'View',
        urlHint: 'This is the address you can share with your followers',
        
        // Share section
        shareTitle: 'Share your page',
        shareButton: 'Share now',
        shareText: 'Check out my new link page',
        dashboard: 'Go to Dashboard',
        
        // What's next
        whatsNext: 'What\'s next?',
        feature1: 'Analytics',
        feature2: 'Engagement',
        feature3: 'Customization',
        feature4: 'Mobile Ready',
        
        // Congratulations
        congratulations: 'Congratulations! 🎉',
        congratulationsDesc: 'You have successfully created your professional link page. Now you can start sharing it and growing your audience.',
        achievement1: '✅ Page created',
        achievement2: '🎨 Custom design',
        achievement3: '🔗 Links configured'
      }
    },
    
    // Header
    header: {
      home: 'Home',
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

    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: 'We\'re here to help you. Get in touch with our support team and we\'ll resolve all your questions.',
      form: {
        title: 'Send us a message',
        name: 'Full name',
        namePlaceholder: 'Your full name',
        email: 'Email address',
        emailPlaceholder: 'your@email.com',
        type: 'Inquiry type',
        types: {
          general: 'General inquiry',
          technical: 'Technical support',
          billing: 'Billing',
          feature: 'Feature request',
          partnership: 'Partnerships'
        },
        subject: 'Subject',
        subjectPlaceholder: 'Brief description of the topic',
        message: 'Message',
        messagePlaceholder: 'Describe your inquiry or problem in detail...',
        send: 'Send message',
        sending: 'Sending...',
        successMessage: 'Message sent successfully! We\'ll respond soon.',
        errorMessage: 'Error sending message. Please try again.'
      },
      methods: {
        title: 'Contact methods',
        email: {
          title: 'Email',
          description: 'Response within 24 hours',
          action: 'Send email'
        },
        chat: {
          title: 'Live chat',
          description: 'Immediate support during business hours',
          hours: 'Monday to Friday, 9:00 - 18:00',
          action: 'Start chat'
        },
        phone: {
          title: 'Phone',
          description: 'Phone support for premium plans',
          action: 'Call now'
        }
      },
      topics: {
        title: 'Support topics',
        account: {
          title: 'Account & profile',
          description: 'Help with registration, account setup and profile management',
          responseTime: 'Response in 2-4 hours'
        },
        technical: {
          title: 'Technical support',
          description: 'Technical issues, errors and help with functionalities',
          responseTime: 'Response in 1-2 hours'
        },
        billing: {
          title: 'Billing & payments',
          description: 'Questions about plans, billing and payment methods',
          responseTime: 'Response in 24 hours'
        }
      },
      office: {
        title: 'Office information',
        address: {
          title: 'Address',
          line1: 'Tech Avenue 123, 10th Floor',
          line2: 'Digital City, Country 12345'
        },
        hours: {
          title: 'Business hours',
          weekdays: 'Monday to Friday: 9:00 - 18:00',
          weekends: 'Saturdays: 10:00 - 14:00'
        }
      },
      faq: {
        title: 'Looking for quick answers?',
        subtitle: 'Check our frequently asked questions and tutorials',
        viewAll: 'View all questions'
      }
    },

    // Features page
    featuresPage: {
      title: 'All the features you need',
      subtitle: 'Discover the professional tools that will help you grow your business and convert more visitors into customers',
      cta: {
        try: 'Try for free',
        demo: 'View demo'
      },
      categories: {
        design: {
          title: 'Design & Customization',
          description: 'Advanced tools to create unique pages that perfectly represent your brand'
        },
        analytics: {
          title: 'Analytics & Metrics',
          description: 'Detailed data to understand your audience and optimize your link performance'
        },
        management: {
          title: 'Link Management',
          description: 'Control and organize all your links with professional management tools'
        },
        advanced: {
          title: 'Advanced Features',
          description: 'Premium features for professional users and growing businesses'
        }
      },
      design: {
        templates: {
          title: 'Professional Templates',
          description: 'Over 50 expert-designed templates, ready to use and fully customizable'
        },
        customization: {
          title: 'Total Customization',
          description: 'Change colors, fonts, layouts and add your own CSS for complete control'
        },
        responsive: {
          title: 'Responsive Design',
          description: 'All designs adapt perfectly to mobile, tablets and desktop'
        },
        media: {
          title: 'Media Management',
          description: 'Upload images, videos and GIFs to create impactful visual experiences'
        }
      },
      analytics: {
        realtime: {
          title: 'Real-time Analytics',
          description: 'See your page traffic and interactions instantly'
        },
        clicks: {
          title: 'Click Tracking',
          description: 'Analyze which links work best and optimize your strategy'
        },
        audience: {
          title: 'Audience Analysis',
          description: 'Know the demographics, location and behavior of your visitors'
        },
        export: {
          title: 'Export Reports',
          description: 'Download detailed reports in Excel and PDF for presentations'
        }
      },
      management: {
        unlimited: {
          title: 'Unlimited Links',
          description: 'Add as many links as you need without restrictions'
        },
        preview: {
          title: 'Instant Preview',
          description: 'See how your page will look before publishing changes'
        },
        social: {
          title: 'Social Integration',
          description: 'Automatically connect with Instagram, TikTok, YouTube and more'
        },
        automation: {
          title: 'Automation',
          description: 'Schedule link publishing and update content automatically'
        }
      },
      advanced: {
        domain: {
          title: 'Custom Domain',
          description: 'Use your own domain for greater professionalism and trust'
        },
        integrations: {
          title: 'API Integrations',
          description: 'Connect with Zapier, Google Analytics, Facebook Pixel and more'
        },
        notifications: {
          title: 'Push Notifications',
          description: 'Keep your audience engaged with intelligent notifications'
        },
        security: {
          title: 'Advanced Security',
          description: 'Free SSL, DDoS protection and automatic backups included'
        }
      },
      comparison: {
        title: 'Compare our plans',
        subtitle: 'Find the perfect plan for your needs',
        feature: 'Feature',
        free: 'Free',
        pro: 'Pro',
        business: 'Business',
        customDomain: 'Custom domain',
        analytics: 'Analytics',
        templates: 'Templates',
        links: 'Links',
        support: 'Support'
      },
      testimonials: {
        title: 'What they say about our features',
        subtitle: 'Real testimonials from users who have transformed their business',
        maria: {
          name: 'Maria González',
          role: 'Fashion Influencer',
          feature: 'Advanced Analytics',
          quote: 'The analytics have helped me understand what content generates more engagement. I\'ve increased my conversions by 250%.'
        },
        carlos: {
          name: 'Carlos Mendoza',
          role: 'Entrepreneur',
          feature: 'Custom Domain',
          quote: 'Having my own domain has given me a lot of credibility. My clients trust my brand more now.'
        },
        ana: {
          name: 'Ana Ruiz',
          role: 'Graphic Designer',
          feature: 'Total Customization',
          quote: 'The design flexibility is incredible. I can create pages that really represent my unique style.'
        }
      },
      finalCta: {
        title: 'Ready to unlock the full potential?',
        subtitle: 'Join thousands of professionals who are already using all these features to grow their business',
        start: 'Start free',
        plans: 'View plans'
      }
    },

    // Tutorials page
    tutorials: {
      title: 'Tutorials & Guides',
      subtitle: 'Learn to create amazing pages with our step-by-step tutorials, from basics to advanced techniques',
      searchPlaceholder: 'Search tutorials...',
      filter: 'Filter',
      featured: 'Featured',
      watch: 'Watch tutorial',
      categories: {
        all: 'All',
        gettingStarted: 'Getting Started',
        design: 'Design',
        analytics: 'Analytics',
        advanced: 'Advanced',
        marketing: 'Marketing'
      },
      difficulty: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      items: {
        quickStart: {
          title: 'Quick Start: Your First Page in 5 Minutes',
          description: 'Learn to create your first professional page from scratch in just minutes'
        },
        firstPage: {
          title: 'Creating Your First Professional Page',
          description: 'Complete guide to set up your profile and add your first links'
        },
        addLinks: {
          title: 'How to Add and Organize Links',
          description: 'Best practices for managing your links and maximizing conversions'
        },
        chooseTemplate: {
          title: 'Choosing the Perfect Template',
          description: 'Find the design that best represents your brand and personality'
        },
        customColors: {
          title: 'Custom Colors and Fonts',
          description: 'Create a unique visual identity with custom colors and typography'
        },
        mobileOptimization: {
          title: 'Mobile Optimization',
          description: 'Ensure your page looks perfect on all devices'
        },
        understandAnalytics: {
          title: 'Understanding Your Analytics',
          description: 'Interpret your page data to make better decisions'
        },
        trackConversions: {
          title: 'Advanced Conversion Tracking',
          description: 'Set up custom events and measure ROI of your links'
        },
        customDomain: {
          title: 'Setting Up Your Custom Domain',
          description: 'Connect your own domain for greater professionalism'
        },
        apiIntegration: {
          title: 'Advanced API Integrations',
          description: 'Connect with external tools using our API'
        },
        socialMediaStrategy: {
          title: 'Social Media Strategy',
          description: 'Maximize your reach on Instagram, TikTok and other platforms'
        },
        seoOptimization: {
          title: 'SEO Optimization for Link Pages',
          description: 'Improve your search visibility with specific SEO techniques'
        }
      },
      noResults: {
        title: 'No tutorials found',
        description: 'Try different search terms or change the category'
      },
      learningPath: {
        title: 'Ready to master your page?',
        subtitle: 'Follow our complete learning path and become an expert in link pages',
        start: 'Start now',
        download: 'Download PDF guide'
      },
      help: {
        title: 'Need personalized help?',
        subtitle: 'Our support team is ready to help you with any questions',
        contact: 'Contact support'
      }
    },

    // Login page
    login: {
      hero: {
        title: 'Access your dashboard',
        subtitle: 'Manage your links, analyze your audience and grow your business with professional tools'
      },
      features: {
        analytics: 'Detailed real-time analytics',
        customization: 'Complete design customization',
        security: 'Security and privacy guaranteed'
      },
      testimonial: {
        quote: 'This platform completely transformed my digital strategy. The analytics help me better understand my audience.'
      },
      form: {
        title: 'Sign In',
        subtitle: 'Welcome back, sign in to your account',
        orContinueWith: 'Or continue with email',
        email: 'Email address',
        emailPlaceholder: 'your@email.com',
        password: 'Password',
        passwordPlaceholder: 'Your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        signIn: 'Sign In',
        signingIn: 'Signing in...',
        noAccount: 'Don\'t have an account?',
        signUp: 'Create free account'
      },
      social: {
        google: 'Continue with Google',
        facebook: 'Continue with Facebook',
        github: 'Continue with GitHub'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordTooShort: 'Password must be at least 6 characters'
      },
      errors: {
        invalidCredentials: 'Invalid email or password',
        tooManyAttempts: 'Too many attempts. Try again in a few minutes',
        generic: 'An error occurred during sign in',
        network: 'Connection error. Check your internet and try again'
      },
      success: {
        title: 'Welcome back!',
        message: 'Redirecting to your dashboard...'
      }
    },

    // Register page
    register: {
      hero: {
        badge: 'Launch offer',
        title: 'Create your professional page for free',
        subtitle: 'Join thousands of creators who are already generating more income with a page that converts'
      },
      benefits: {
        noCard: 'No credit card required',
        quickSetup: 'Setup in 2 minutes',
        customization: 'Complete customization'
      },
      stats: {
        users: 'Active users',
        satisfaction: 'Satisfaction',
        setup: 'Setup time'
      },
      testimonial: {
        quote: 'Since I created my page, I\'ve tripled my conversions. It\'s incredibly easy to use and my followers find everything in one place.'
      },
      form: {
        title: 'Create Account',
        subtitle: 'Start your journey to digital success',
        orSignUpWith: 'Or sign up with email',
        firstName: 'First Name',
        firstNamePlaceholder: 'Your first name',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Your last name',
        email: 'Email address',
        emailPlaceholder: 'your@email.com',
        password: 'Password',
        passwordPlaceholder: 'Minimum 8 characters',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Confirm your password',
        passwordStrength: 'Password strength',
        agreeTerms: 'I agree to the',
        terms: 'terms of service',
        and: 'and',
        privacy: 'privacy policy',
        newsletter: 'I want to receive updates and special offers',
        createAccount: 'Create my account',
        creating: 'Creating account...',
        haveAccount: 'Already have an account?',
        signIn: 'Sign in'
      },
      social: {
        google: 'Continue with Google',
        facebook: 'Continue with Facebook'
      },
      password: {
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
        veryStrong: 'Very strong'
      },
      validation: {
        firstNameRequired: 'First name is required',
        firstNameTooShort: 'First name must be at least 2 characters',
        lastNameRequired: 'Last name is required',
        lastNameTooShort: 'Last name must be at least 2 characters',
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordTooShort: 'Password must be at least 8 characters',
        confirmPasswordRequired: 'Please confirm your password',
        passwordsDoNotMatch: 'Passwords do not match',
        agreeToTermsRequired: 'You must agree to the terms of service'
      },
      errors: {
        emailExists: 'This email address is already registered',
        invalidData: 'The entered data is not valid',
        tooManyAttempts: 'Too many attempts. Try again in a few minutes',
        generic: 'An error occurred during registration',
        network: 'Connection error. Check your internet and try again'
      },
      success: {
        title: 'Account created successfully!',
        message: 'Setting up your dashboard...'
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