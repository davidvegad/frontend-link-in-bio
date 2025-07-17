'use client';

import React, { useState, useEffect } from 'react';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlug: string;
  onUpdateSlug: (newSlug: string) => Promise<void>;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  isOpen,
  onClose,
  currentSlug,
  onUpdateSlug,
}) => {
  const [editableSlug, setEditableSlug] = useState(currentSlug);
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [slugError, setSlugError] = useState<string | null>(null);
  const [initialSlug, setInitialSlug] = useState(currentSlug); // To store the slug before editing
  const [baseUrl, setBaseUrl] = useState('');

  const fullLink = `${baseUrl}/${editableSlug}`;

  useEffect(() => {
    if (isOpen) {
      setEditableSlug(currentSlug);
      setInitialSlug(currentSlug);
      setIsEditing(false);
      setCopySuccess('');
      setSlugError(null);
      
      // Set the correct base URL when modal opens
      if (typeof window !== 'undefined') {
        setBaseUrl(window.location.origin);
      } else {
        setBaseUrl(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
      }
    }
  }, [isOpen, currentSlug]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setEditableSlug(value);
    if (value.length < 3) {
      setSlugError('El slug debe tener al menos 3 caracteres.');
    } else {
      setSlugError(null); // Clear error for now, real validation on save
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // If was editing, now save changes on blur
      // This button now acts as a visual cue for editing mode
    } else {
      // If was not editing, now enable editing
      setIsEditing(true);
    }
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (editableSlug !== initialSlug) {
      if (!editableSlug || editableSlug.length < 3) {
        setSlugError('El slug debe tener al menos 3 caracteres.');
        setEditableSlug(initialSlug); // Revert to initial slug if invalid
        return;
      }
      try {
        await onUpdateSlug(editableSlug);
        setInitialSlug(editableSlug); // Update initial slug after successful save
        setSlugError(null);
      } catch (error: any) {
        setSlugError(error.message || 'Error al guardar el slug.');
        setEditableSlug(initialSlug); // Revert to initial slug on error
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullLink).then(() => {
      setCopySuccess('¡Copiado!');
      setTimeout(() => setCopySuccess(''), 2000);
    }).catch(() => {
      setCopySuccess('Error al copiar.');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Comparte tu página</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">&times;</button>
        </div>
        <p className="text-gray-600 mb-4">Copia o edita tu enlace:</p>

        <div className="mb-4">
          <label htmlFor="publicLink" className="sr-only">Enlace Público</label>
          <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-indigo-500 focus-within:border-indigo-500">
            {isEditing ? null : <span className="px-1 py-2 bg-gray-100 text-gray-600 rounded-l-md text-sm">{baseUrl}/</span>}
            <input
              id="publicLink"
              type="text"
              value={editableSlug}
              onChange={handleSlugChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-3 py-2 outline-none ${isEditing ? 'bg-white rounded-l-md' : 'bg-gray-50 cursor-default'}`}
            />
            <button 
              onClick={handleEditToggle} 
              className={`p-2 transition-colors duration-200 ${isEditing ? 'bg-[#B013A3] text-white' : 'text-gray-500 hover:text-indigo-600'}`}
              aria-label={isEditing ? "Guardar enlace" : "Editar enlace"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            <button 
              onClick={handleCopyLink} 
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
              aria-label="Copiar enlace"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1.5M9 3l2-2 2 2M9 3h6M9 3v10a2 2 0 002 2h4a2 2 0 002-2V3"></path></svg>
            </button>
          </div>
          {slugError && <p className="text-red-500 text-sm mt-2">{slugError}</p>}
          {copySuccess && <p className="text-green-500 text-sm mt-2">{copySuccess}</p>}
        </div>
          {slugError && <p className="text-red-500 text-sm mt-2">{slugError}</p>}
          {copySuccess && <p className="text-green-500 text-sm mt-2">{copySuccess}</p>}
        
      </div>
    </div>
  );
};

export default ShareLinkModal;
