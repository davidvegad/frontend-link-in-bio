import './globals.css';
import { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import DynamicMetadata from './components/DynamicMetadata';
import { Inter, Roboto_Mono, Lora, Playfair_Display, Montserrat, Poppins, Roboto, Quicksand, Merriweather, Ubuntu, Nunito, Fira_Sans, Work_Sans, Caveat, Pacifico, Open_Sans, Lato, Oswald, PT_Sans, Crimson_Text, Libre_Baskerville, Source_Sans_3, Spectral, Karla, Mulish, Jost, Arvo, Itim, Comfortaa, Outfit, Dancing_Script, Raleway, Comic_Neue } from 'next/font/google';

export const metadata: Metadata = {
  title: 'EnlacePro - Crea tu página de enlaces profesional | Link in Bio',
  description: 'La plataforma más fácil para crear tu página de links profesional. Centraliza todos tus enlaces, aumenta conversiones y haz crecer tu negocio. 100% gratis para empezar.',
  keywords: 'link in bio, página de enlaces, linktree, bio link, enlaces instagram, página web gratis, creadores de contenido',
  openGraph: {
    title: 'EnlacePro - Tu enlace, infinitas posibilidades',
    description: 'Convierte tus seguidores en clientes con una página profesional que centraliza todos tus enlaces, productos y contenido.',
    images: [
      {
        url: 'https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/enlacepro-og.png',
        width: 1200,
        height: 630,
        alt: 'EnlacePro - Página de enlaces profesional',
      }
    ],
    type: 'website',
    siteName: 'EnlacePro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnlacePro - Crea tu página de enlaces profesional',
    description: 'La plataforma más fácil para crear tu página de links profesional. 100% gratis para empezar.',
    images: ['https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/enlacepro-twitter.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://enlacepro.com',
  },
};

// Load the most commonly used fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono'
});

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora'
});

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display'
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
});

const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand'
});

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather'
});

const ubuntu = Ubuntu({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu'
});

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito'
});

const firaSans = Fira_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fira-sans'
});

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans'
});

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat'
});

const pacifico = Pacifico({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico'
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans'
});

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato'
});

const oswald = Oswald({ 
  subsets: ['latin'],
  variable: '--font-oswald'
});

const ptSans = PT_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans'
});

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-crimson-text'
});

const libreBaskerville = Libre_Baskerville({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville'
});

const sourceSans3 = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-source-sans-3'
});

const spectral = Spectral({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-spectral'
});

const karla = Karla({ 
  subsets: ['latin'],
  variable: '--font-karla'
});

const mulish = Mulish({ 
  subsets: ['latin'],
  variable: '--font-mulish'
});

const jost = Jost({ 
  subsets: ['latin'],
  variable: '--font-jost'
});

const arvo = Arvo({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-arvo'
});

const itim = Itim({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-itim'
});

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  variable: '--font-comfortaa'
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit'
});

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing-script'
});

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway'
});

const comicNeue = Comic_Neue({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comic-neue'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`
      ${inter.variable} 
      ${robotoMono.variable} 
      ${lora.variable} 
      ${playfairDisplay.variable} 
      ${montserrat.variable} 
      ${poppins.variable} 
      ${roboto.variable} 
      ${quicksand.variable} 
      ${merriweather.variable} 
      ${ubuntu.variable} 
      ${nunito.variable} 
      ${firaSans.variable} 
      ${workSans.variable} 
      ${caveat.variable} 
      ${pacifico.variable} 
      ${openSans.variable} 
      ${lato.variable} 
      ${oswald.variable} 
      ${ptSans.variable} 
      ${crimsonText.variable} 
      ${libreBaskerville.variable}
      ${sourceSans3.variable}
      ${spectral.variable}
      ${karla.variable}
      ${mulish.variable}
      ${jost.variable}
      ${arvo.variable}
      ${itim.variable}
      ${comfortaa.variable}
      ${outfit.variable}
      ${dancingScript.variable}
      ${raleway.variable}
      ${comicNeue.variable}
    `}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <DynamicMetadata />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}