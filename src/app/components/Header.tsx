'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Menú Hamburguesa */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Logo/Título */}
        <div className="flex items-center">
          <Image src="/mi-logo.png" alt="Logo" width={150} height={40}  /> {/* Reemplaza con tu logo */}
          
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/contactanos" className="text-gray-600 hover:text-blue-600">Contáctanos</Link>
          <Link href="/precios" className="text-gray-600 hover:text-blue-600">Precios</Link>
          <Link href="/funcionalidades" className="text-gray-600 hover:text-blue-600">Funcionalidades</Link>
          <Link href="/tutoriales" className="text-gray-600 hover:text-blue-600">Tutoriales</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          <Link href="/crear-pagina-gratis" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Crear página gratis</Link>
        </nav>

        {/* Menú Móvil */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4 z-10">
            <nav className="flex flex-col items-center space-y-4">
              <Link href="/contactanos" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Contáctanos</Link>
              <Link href="/precios" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Precios</Link>
              <Link href="/funcionalidades" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Funcionalidades</Link>
              <Link href="/tutoriales" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Tutoriales</Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/crear-pagina-gratis" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={() => setIsOpen(false)}>Crear página gratis</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
