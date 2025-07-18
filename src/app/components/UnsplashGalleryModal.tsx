'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Download } from 'lucide-react';
import Image from 'next/image';

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
  links: {
    download_location: string;
  };
}

interface UnsplashGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

const UnsplashGalleryModal: React.FC<UnsplashGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Imágenes predefinidas de negocios de alta calidad
  const businessImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&q=80',
    'https://images.unsplash.com/photo-1521737451165-11fa7180a5a4?w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
    'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&q=80',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    'https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=800&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80',
    'https://images.unsplash.com/photo-1524749292158-7540c2494485?w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
    'https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=800&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80',
  ];

  const fetchImages = async (query: string = 'business office', pageNum: number = 1) => {
    setLoading(true);
    console.log('Fetching images for query:', query, 'page:', pageNum);
    
    try {
      const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      console.log('API Key exists:', !!UNSPLASH_ACCESS_KEY);
      
      if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'your_unsplash_access_key_here') {
        console.warn('API key de Unsplash no configurada correctamente, usando imágenes predefinidas');
        // Fallback a imágenes predefinidas
        const startIndex = (pageNum - 1) * 12;
        const endIndex = startIndex + 12;
        const pageImages = businessImages.slice(startIndex, endIndex);
        
        const mockImages: UnsplashImage[] = pageImages.map((url, index) => ({
          id: `business-${startIndex + index}`,
          urls: {
            regular: url,
            small: url,
            thumb: url,
          },
          alt_description: 'Business office workspace',
          user: {
            name: 'Unsplash',
            username: 'unsplash',
          },
          links: {
            download_location: url,
          },
        }));

        if (pageNum === 1) {
          setImages(mockImages);
        } else {
          setImages(prev => [...prev, ...mockImages]);
        }
        
        setHasMore(endIndex < businessImages.length);
        return;
      }

      // Llamada real a la API de Unsplash
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${pageNum}&per_page=12&orientation=landscape`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      const newImages = data.results || [];
      console.log('Number of images received:', newImages.length);
      
      if (pageNum === 1) {
        setImages(newImages);
      } else {
        setImages(prev => [...prev, ...newImages]);
      }
      
      setHasMore(newImages.length === 12 && data.total_pages > pageNum);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Fallback a imágenes predefinidas en caso de error
      const startIndex = (pageNum - 1) * 12;
      const endIndex = startIndex + 12;
      const pageImages = businessImages.slice(startIndex, endIndex);
      
      const mockImages: UnsplashImage[] = pageImages.map((url, index) => ({
        id: `business-${startIndex + index}`,
        urls: {
          regular: url,
          small: url,
          thumb: url,
        },
        alt_description: 'Business office workspace',
        user: {
          name: 'Unsplash',
          username: 'unsplash',
        },
        links: {
          download_location: url,
        },
      }));

      if (pageNum === 1) {
        setImages(mockImages);
      } else {
        setImages(prev => [...prev, ...mockImages]);
      }
      
      setHasMore(endIndex < businessImages.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchImages(searchTerm || 'business office', 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(searchTerm || 'business office', nextPage);
  };

  const handleImageSelect = (imageUrl: string) => {
    onSelectImage(imageUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Galería de Imágenes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Buscador */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar imágenes de negocios..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>


          {/* Grid de imágenes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto">
            {images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => handleImageSelect(image.urls.regular)}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-500 transition-all duration-200"
                style={{ backgroundColor: '#f3f4f6' }}
              >
                <img
                  src={image.urls.small}
                  alt={image.alt_description || 'Business image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 absolute inset-0"
                  style={{ 
                    zIndex: 1,
                    opacity: 1,
                    display: 'block'
                  }}
                  onLoad={() => {
                    // Imagen cargada correctamente
                  }}
                  onError={(e) => {
                    console.error(`❌ Image ${index + 1} failed to load`);
                    const target = e.target as HTMLImageElement;
                    const container = target.parentElement;
                    if (container) {
                      container.style.backgroundColor = '#fee2e2';
                      target.style.display = 'none';
                      const errorDiv = document.createElement('div');
                      errorDiv.style.cssText = 'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 12px;';
                      errorDiv.textContent = `Error #${index + 1}`;
                      container.appendChild(errorDiv);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white rounded-full p-2">
                      <Download size={20} className="text-gray-700" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para cargar más */}
          {hasMore && !loading && (
            <div className="mt-6 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Cargar más imágenes
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Cargando imágenes...</p>
            </div>
          )}
        </div>

        {/* Footer con créditos */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <p className="text-sm text-gray-600 text-center">
            Imágenes proporcionadas por{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnsplashGalleryModal;