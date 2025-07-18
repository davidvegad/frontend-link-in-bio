'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CoverImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCover?: string;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  description: string;
  alt_description: string;
  user: {
    name: string;
  };
}

const CoverImageModal: React.FC<CoverImageModalProps> = ({
  isOpen,
  onClose,
  currentCover,
  onUpload,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery'>('upload');
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('professional business');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      onClose();
    }
  };

  const searchUnsplash = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // Nota: Necesitarás obtener una API key de Unsplash y configurarla
      const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      
      if (!UNSPLASH_ACCESS_KEY) {
        setError('API key de Unsplash no configurada');
        return;
      }

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Unsplash response:', data);
      setUnsplashImages(data.results || []);
    } catch (error) {
      console.error('Error searching Unsplash:', error);
      setError(error instanceof Error ? error.message : 'Error al buscar imágenes');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsplashSelect = async (imageUrl: string) => {
    try {
      // Download the image and convert to File
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'unsplash-cover.jpg', { type: 'image/jpeg' });
      onUpload(file);
      onClose();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  React.useEffect(() => {
    if (activeTab === 'gallery' && unsplashImages.length === 0) {
      searchUnsplash(searchQuery);
    }
  }, [activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Imagen de Portada</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Sube una imagen de portada horizontal. Recomendamos 970x250 píxeles para mejores resultados.
          </p>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'upload'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Upload size={20} className="inline mr-2" />
              Subir Imagen
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'gallery'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ImageIcon size={20} className="inline mr-2" />
              Galería
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {activeTab === 'upload' && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                  >
                    Seleccionar Imagen
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchUnsplash(searchQuery)}
                    placeholder="Buscar imágenes profesionales..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => searchUnsplash(searchQuery)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Buscar
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <p className="text-red-600 mb-4">{error}</p>
                      <button
                        onClick={() => searchUnsplash(searchQuery)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 text-sm text-gray-600">
                      Se encontraron {unsplashImages.length} imágenes
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                      {unsplashImages.map((image, index) => (
                        <div
                          key={image.id}
                          className="relative cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors bg-white"
                          onClick={() => handleUnsplashSelect(image.urls.regular)}
                          title={`Imagen ${index + 1} por ${image.user.name}`}
                        >
                          <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                            <Image
                              src={image.urls.small}
                              alt={image.alt_description || image.description}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onLoad={(e) => {
                                console.log(`✅ Image ${index + 1} loaded successfully:`, image.urls.small);
                                e.currentTarget.parentElement?.classList.remove('bg-gray-100');
                              }}
                              onError={(e) => {
                                console.error(`❌ Error loading image ${index + 1}:`, image.urls.small);
                                e.currentTarget.parentElement?.classList.add('bg-red-100');
                              }}
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <span className="text-white text-xs font-medium">
                              Por {image.user.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div>
            {currentCover && (
              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Trash2 size={16} className="mr-2" />
                Eliminar
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverImageModal;