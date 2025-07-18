export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EnlacePro",
    "url": "https://enlacepro.com",
    "logo": "https://enlacepro.com/logo.png",
    "description": "La plataforma más fácil para crear tu página de enlaces profesional. Centraliza todos tus enlaces, aumenta conversiones y haz crecer tu negocio.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "soporte@enlacepro.com"
    },
    "sameAs": [
      "https://instagram.com/enlacepro",
      "https://twitter.com/enlacepro",
      "https://facebook.com/enlacepro",
      "https://youtube.com/enlacepro"
    ],
    "foundingDate": "2024",
    "numberOfEmployees": "10-50"
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EnlacePro",
    "description": "Plataforma para crear páginas de enlaces profesionales tipo Link in Bio",
    "url": "https://enlacepro.com",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "EnlacePro Team"
    },
    "datePublished": "2024-01-01",
    "softwareVersion": "2.1.0"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Creación de Página Link in Bio",
    "description": "Servicio profesional para crear páginas de enlaces que centralizan todos tus contenidos y redes sociales",
    "provider": {
      "@type": "Organization",
      "name": "EnlacePro"
    },
    "serviceType": "Web Development",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "EnlacePro Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plan Gratuito",
            "description": "Página básica con hasta 20 enlaces"
          },
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plan Premium",
            "description": "Página profesional con dominio personalizado y analytics"
          },
          "price": "9.99",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EnlacePro",
    "url": "https://enlacepro.com",
    "description": "Crea tu página de enlaces profesional",
    "publisher": {
      "@type": "Organization",
      "name": "EnlacePro"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://enlacepro.com/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://enlacepro.com"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es realmente gratis crear mi página?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, puedes crear y publicar tu página completamente gratis. Incluye hosting, SSL y todas las funciones básicas. Solo pagas si quieres funciones premium como dominio personalizado o analytics avanzados."
        }
      },
      {
        "@type": "Question",
        "name": "¿Necesito conocimientos técnicos para usar la plataforma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para nada. Nuestra plataforma está diseñada para ser súper fácil de usar. Con nuestro editor visual de arrastrar y soltar, puedes crear tu página en minutos sin escribir una sola línea de código."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo usar mi propio dominio personalizado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, con nuestro plan premium puedes conectar tu propio dominio (ej: tuempresa.com). También ofrecemos subdominios personalizados gratuitos (ej: tunombre.enlacepro.com)."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}