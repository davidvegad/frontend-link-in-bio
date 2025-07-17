import { Metadata } from 'next';
import Header from './components/Header';
import Hero from './components/Hero';

export const metadata: Metadata = {
  title: 'Crea tu enlace en link in bio',
  description: 'Link in bio by Vali Design',
  openGraph: {
    title: 'Crea tu enlace en link in bio',
    description: 'Link in bio by Vali Design',
    images: [
      {
        url: 'https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/Vali+design.png',
        width: 1200,
        height: 630,
        alt: 'Vali Design - Link in Bio',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crea tu enlace en link in bio',
    description: 'Link in bio by Vali Design',
    images: ['https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/Vali+design.png'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        {/* Aquí irán otras secciones de la página principal */}
      </main>
    </div>
  );
}
