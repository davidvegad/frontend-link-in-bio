'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { useState } from 'react';

const styleOptions = [
  {
    id: 'minimalist',
    name: 'Minimalista y Profesional',
    description: 'Un diseño limpio y directo, centrado en tus enlaces.',
  },
  {
    id: 'featured-image',
    name: 'Foto de Perfil Destacada',
    description: 'Tu imagen de perfil toma el protagonismo en la parte superior.',
  },
  {
    id: 'full-background',
    name: 'Fondo a Pantalla Completa',
    description: 'Muestra una imagen de fondo que abarca toda la página.',
  },
];

export default function StylePage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.template_style) {
      setShowError(true);
      return;
    }
    router.push('/welcome/3-info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <style jsx>{`
        /* Estilo para el botón Continuar cuando está habilitado y en hover */
        button[type="submit"]:not([disabled]):hover {
          background-color: white !important;
          color: #b013a3 !important;
          border-color: #b013a3 !important;
        }

        /* Estilo para el botón Continuar cuando está habilitado y no en hover */
        button[type="submit"]:not([disabled]) {
          color: white !important;
        }

        /* Estilos para el contenedor de opciones de estilo */
        .style-options-container {
          display: flex;
          flex-direction: column; /* Apila los elementos verticalmente */
          align-items: center; /* Centra horizontalmente los elementos hijos */
          gap: 1rem;
        }

        /* MEDIA QUERY PARA ESCRITORIO: Ajustar el ancho de los elementos internos y centrarlos */
        @media (min-width: 768px) {
          .style-options-container > div {
            width: 60%; /* Ocupa el 50% del ancho de su contenedor padre */
            max-width: 448px; /* Opcional: para evitar que se estire demasiado en pantallas gigantes */
          }
          /* Aplicar el mismo estilo de ancho al botón "Continuar" */
          .button-continue {
            width: 60%; /* 50% del ancho del padre */
            max-width: 448px; /* Mismo max-width que las opciones */
          }
        }

        /* Forzar border-radius en las opciones de estilo */
        .style-options-container > div {
          border-radius: 1rem !important; /* 16px para rounded-2xl */
        }
      `}</style>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-center">Elige un Estilo</h1>
        <p className="text-gray-600 mb-8 text-center">Define la estructura general de tu página.</p>
        <form onSubmit={handleSubmit}>
          <div className="style-options-container mb-8">
            {styleOptions.map(option => (
              <div
                key={option.id}
                onClick={() => {
                  updateProfileData({ template_style: option.id });
                  setShowError(false);
                }}
                className={`p-4 border rounded-2xl cursor-pointer transition-all w-full ${ 
                  profileData.template_style === option.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h3 className="font-semibold text-lg">{option.name}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              // Quita el style inline margin: '3rem auto 0 auto' para que el centrado sea por flexbox
              style={{ borderRadius: '9999px', marginTop: '3rem' }} 
              // AÑADIDA CLASE button-continue y MODIFICADO w-full
              className={`button-continue
                py-[0.75rem] px-4 text-lg font-semibold transition-all duration-300 shadow-md border-2 cursor-pointer w-full
              ${!profileData.template_style
                  ? 'bg-gray-400 text-gray-700 border-transparent hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3]'
                  : 'bg-[#b013a3] !text-white border-transparent hover:text-[#b013a3] hover:border-[#b013a3]'
              }
            `}
            >
              Continuar
            </button>
          </div>
          {showError && (
            <p className="text-red-500 text-center mt-4 text-sm">Por favor, selecciona un estilo antes de continuar.</p>
          )}
        </form>
      </div>
    </div>
  );
}