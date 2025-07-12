'use client';

import React, { useState, useCallback } from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove } from '@dnd-kit/sortable';
import { debounce } from 'lodash';

// Interfaces
interface LinkData {
  id: number;
  title: string;
  url: string;
  type?: string;
  order?: number;
}

interface LinkManagerProps {
  links: LinkData[];
  handleLinkChange: (id: number, field: 'title' | 'url', value: string) => void;
  addLink: () => void;
  removeLink: (id: number) => void;
  onReorderLinks: (newOrder: LinkData[]) => void; // New prop for reordering
}

// Country codes for WhatsApp
const countryCodes = [
  { code: '+1', name: 'USA' },
  { code: '+34', name: 'España' },
  { code: '+52', name: 'México' },
  { code: '+54', name: 'Argentina' },
  { code: '+56', name: 'Chile' },
  { code: '+57', name: 'Colombia' },
  { code: '+51', name: 'Perú' },
  { code: '+58', name: 'Venezuela' },
  { code: '+591', name: 'Bolivia' },
  { code: '+593', name: 'Ecuador' },
  { code: '+595', name: 'Paraguay' },
  { code: '+598', name: 'Uruguay' },
  { code: '+502', name: 'Guatemala' },
  { code: '+503', name: 'El Salvador' },
  { code: '+504', name: 'Honduras' },
  { code: '+505', name: 'Nicaragua' },
  { code: '+506', name: 'Costa Rica' },
  { code: '+507', name: 'Panamá' },
  { code: '+509', name: 'Haití' },
  { code: '+1-809', name: 'República Dominicana (809)' },
  { code: '+1-829', name: 'República Dominicana (829)' },
  { code: '+1-849', name: 'República Dominicana (849)' },
  // Add more as needed
];

// Helper to parse WhatsApp URL into country code and number
const parseWhatsAppUrl = (url: string) => {
  const match = url.match(/wa\.me\/(\+?\d+)/);
  if (match) {
    const fullNumber = match[1];
    // Try to find a matching country code
    for (const country of countryCodes) {
      if (fullNumber.startsWith(country.code.replace('+', ''))) {
        return { countryCode: country.code, number: fullNumber.substring(country.code.replace('+', '').length) };
      }
    }
    return { countryCode: '', number: fullNumber }; // Fallback if no country code matches
  }
  return { countryCode: '', number: '' };
};

// Helper to construct WhatsApp URL from country code and number
const constructWhatsAppUrl = (countryCode: string, number: string) => {
  if (!countryCode || !number) return '';
  const cleanedNumber = number.replace(/[^\d]/g, ''); // Remove non-digits
  const cleanedCountryCode = countryCode.replace('+', '');
  return `https://wa.me/${cleanedCountryCode}${cleanedNumber}`;
};

interface SortableItemProps {
  link: LinkData;
  handleLinkChange: (id: number, field: 'title' | 'url', value: string) => void;
  removeLink: (id: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  link,
  handleLinkChange,
  removeLink,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: link.id,
  });

  const [localUrl, setLocalUrl] = useState(link.url);
  const [urlError, setUrlError] = useState<string | null>(null);

  const isWhatsApp = link.type === 'whatsapp';
  const { countryCode: initialCountryCode, number: initialNumber } = isWhatsApp ? parseWhatsAppUrl(link.url) : { countryCode: '', number: link.url };

  const [localCountryCode, setLocalCountryCode] = useState(initialCountryCode || (isWhatsApp && countryCodes.length > 0 ? countryCodes[0].code : ''));
  const [localWhatsAppNumber, setLocalWhatsAppNumber] = useState(initialNumber);

  const [localTitle, setLocalTitle] = useState(link.title);

  // Update local states when link.url/link.title prop changes (e.g., on initial load or reorder)
  React.useEffect(() => {
    if (isWhatsApp) {
      const { countryCode: newCountryCode, number: newNumber } = parseWhatsAppUrl(link.url);
      setLocalCountryCode(newCountryCode || (countryCodes.length > 0 ? countryCodes[0].code : ''));
      setLocalWhatsAppNumber(newNumber);
    } else {
      setLocalUrl(link.url);
    }
    setLocalTitle(link.title);
    // Clear error when link prop changes
    setUrlError(null);
  }, [link.url, link.title, isWhatsApp]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Basic URL validation regex (more robust than just checking for http/https)
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const whatsappRegex = /^\+?\d{10,15}$/; // Simple regex for phone numbers

  const validateAndFormatUrl = (url: string, type: string): { formattedUrl: string, error: string | null } => {
    if (!url.trim()) {
      return { formattedUrl: '', error: 'La URL no puede estar vacía.' };
    }

    if (type === 'whatsapp') {
      // For WhatsApp, validate the number part
      const cleanedNumber = url.replace(/[^\d+]/g, ''); // Allow + for country code
      if (!whatsappRegex.test(cleanedNumber)) {
        return { formattedUrl: url, error: 'Introduce un número de WhatsApp válido (ej: +54911...).' };
      }
      // WhatsApp URLs are constructed, so no need to add https:// here
      return { formattedUrl: url, error: null };
    } else {
      // For generic URLs, validate and add protocol
      let formattedUrl = url;
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      if (!urlRegex.test(formattedUrl)) {
        return { formattedUrl: url, error: 'Introduce una URL válida (ej: https://ejemplo.com).' };
      }
      return { formattedUrl, error: null };
    }
  };

  const debouncedLinkUpdate = useCallback(
    debounce((id: number, field: 'title' | 'url', value: string) => {
      console.log("debouncedLinkUpdate called with:", { id, field, value }); // DEBUG
      if (field === 'url') {
        const { formattedUrl, error } = validateAndFormatUrl(value, link.type || 'generic');
        if (!error) {
          handleLinkChange(id, field, formattedUrl);
        } else {
          setUrlError(error);
        }
      } else if (field === 'title') {
        handleLinkChange(id, field, value);
      }
    }, 500), // 500ms debounce time
    [handleLinkChange, link.type]
  );

  const handleLocalTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalTitle(value); // Update local state immediately for smooth typing
    debouncedLinkUpdate(link.id, 'title', value); // Debounce the API call
  };

  const handleLocalUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalUrl(value); // Update local state immediately for smooth typing
    
    // Immediate validation feedback
    const { error } = validateAndFormatUrl(value, link.type || 'generic');
    setUrlError(error);

    // Debounce the API call only if there's no immediate error
    if (!error) {
      debouncedLinkUpdate(link.id, 'url', value);
    }
  };

  const handleWhatsAppNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalWhatsAppNumber(value);
    const fullWhatsAppUrl = constructWhatsAppUrl(localCountryCode, value);

    const { error } = validateAndFormatUrl(fullWhatsAppUrl, 'whatsapp');
    setUrlError(error);

    console.log("handleWhatsAppNumberChange - fullWhatsAppUrl:", fullWhatsAppUrl, "error:", error); // DEBUG

    if (!error) {
      debouncedLinkUpdate(link.id, 'url', fullWhatsAppUrl);
    }
  };

  const handleWhatsAppCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalCountryCode(value);
    const fullWhatsAppUrl = constructWhatsAppUrl(value, localWhatsAppNumber);

    const { error } = validateAndFormatUrl(fullWhatsAppUrl, 'whatsapp');
    setUrlError(error);

    console.log("handleWhatsAppCountryCodeChange - fullWhatsAppUrl:", fullWhatsAppUrl, "error:", error); // DEBUG

    if (!error) {
      debouncedLinkUpdate(link.id, 'url', fullWhatsAppUrl);
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      className="flex flex-col sm:flex-row items-center gap-3 p-3 border rounded-lg bg-white shadow-sm"
    >
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Link Type (non-editable) */}
        {link.type && (
          <div className="col-span-full text-sm text-gray-500 font-medium">
            Tipo: <span className="capitalize">{link.type}</span>
          </div>
        )}
        <input
          type="text"
          value={localTitle}
          onChange={handleLocalTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
          placeholder="Título del enlace"
        />
        {isWhatsApp ? (
          <div className="flex gap-2 w-full">
            <select
              value={localCountryCode}
              onChange={handleWhatsAppCountryCodeChange}
              className={`w-1/3 px-3 py-2 border rounded-md shadow-sm focus:outline-none ${urlError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.name})
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={localWhatsAppNumber}
              onChange={handleWhatsAppNumberChange}
              className={`w-2/3 px-3 py-2 border rounded-md shadow-sm focus:outline-none ${urlError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
              placeholder="Número de teléfono"
            />
          </div>
        ) : (
          <div className="w-full">
            <input
              type="url"
              value={localUrl} // Use local state for immediate feedback
              onChange={handleLocalUrlChange} // Use the new debounced handler
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${urlError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
              placeholder={link.type === 'generic' ? 'https://ejemplo.com' : 'https://'}
            />
            {urlError && <p className="text-red-500 text-xs mt-1">{urlError}</p>}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button 
          type="button" 
          onClick={() => removeLink(link.id)} 
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label="Eliminar enlace"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <button 
          type="button" 
          {...listeners} 
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-grab"
          aria-label="Reordenar enlace"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  );
};

// Component
const LinkManager: React.FC<LinkManagerProps> = ({
  links,
  handleLinkChange,
  addLink,
  removeLink,
  onReorderLinks,
}) => {

  console.log("LinkManager received links:", links); // DEBUG: Check props

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = links.findIndex(link => link.id === active.id);
      const newIndex = links.findIndex(link => link.id === over?.id);
      
      const newOrder = arrayMove(links, oldIndex, newIndex);
      onReorderLinks(newOrder);
    }
  };

  return (
    <section id="links-section">
      <h2 className="text-2xl font-semibold mb-6">Gestión de Enlaces</h2>

      <div className="p-4 border rounded-lg bg-gray-50 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Todos los Enlaces</h3>
          <button 
            type="button" 
            onClick={addLink} 
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 font-semibold"
          >
            + Añadir Enlace
          </button>
        </div>
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={links.map(link => link.id)} 
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {(links || []).map((link) => (
                <SortableItem 
                  key={link.id} 
                  link={link} 
                  handleLinkChange={handleLinkChange} 
                  removeLink={removeLink}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
};

export default LinkManager;
