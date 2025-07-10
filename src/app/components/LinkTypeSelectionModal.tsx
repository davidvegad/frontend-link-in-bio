import React from 'react';

interface LinkTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
}

const LinkTypeSelectionModal: React.FC<LinkTypeSelectionModalProps> = ({ isOpen, onClose, onSelectType }) => {
  if (!isOpen) return null;

  const handleSelect = (type: string) => {
    onSelectType(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Selecciona el tipo de enlace</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleSelect('generic')}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Link (URL)
          </button>
          <button
            onClick={() => handleSelect('whatsapp')}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </button>
          {/* Futuras opciones */}
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-md cursor-not-allowed"
          >
            Catálogo (Próximamente)
          </button>
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-md cursor-not-allowed"
          >
            Imágenes (Próximamente)
          </button>
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-md cursor-not-allowed"
          >
            Formularios (Próximamente)
          </button>
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-md cursor-not-allowed"
          >
            Reseñas (Próximamente)
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default LinkTypeSelectionModal;