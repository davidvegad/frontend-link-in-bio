'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm p-4 relative z-40">
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
          <Link href="/" className="flex items-center">
            <Image 
              src="/mi-logo.png" 
              alt="Logo" 
              width={150} 
              height={40} 
              style={{ width: 'auto', height: '40px' }}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">{t('header.home')}</Link>
          <Link href="/contactanos" className="text-gray-600 hover:text-blue-600">{t('header.contactUs')}</Link>
          <Link href="/precios" className="text-gray-600 hover:text-blue-600">{t('header.pricing')}</Link>
          <Link href="/funcionalidades" className="text-gray-600 hover:text-blue-600">{t('header.features')}</Link>
          <Link href="/tutoriales" className="text-gray-600 hover:text-blue-600">{t('header.tutorials')}</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600">{t('header.login')}</Link>
          <LanguageSelector className="mr-2" compact />
          <Link href="/crear-pagina-gratis" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">{t('header.createFree')}</Link>
        </nav>

        {/* Menú Móvil */}
        {isOpen && (
          <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg py-4 z-50">
            <nav className="flex flex-col items-center space-y-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{t('header.home')}</Link>
              <Link href="/contactanos" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{t('header.contactUs')}</Link>
              <Link href="/precios" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{t('header.pricing')}</Link>
              <Link href="/funcionalidades" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{t('header.features')}</Link>
              <Link href="/tutoriales" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{t('header.tutorials')}</Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>{t('header.login')}</Link>
              <LanguageSelector className="mb-2" compact />
              <Link href="/crear-pagina-gratis" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={() => setIsOpen(false)}>{t('header.createFree')}</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
