import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Contenido de Texto */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Crea tu Página de Link en Bio Profesional
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Centraliza todos tus enlaces importantes en un solo lugar. Ideal para creadores, negocios y profesionales.
          </p>
          <Link href="/crear-pagina-gratis" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Crear página gratis
          </Link>
        </div>

        {/* Imagen del Hero */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/hero-image.png" // Reemplaza con tu imagen de hero
            alt="Link in Bio Example"
            width={500}
            height={600}
            className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Formas de fondo decorativas (opcional) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}
