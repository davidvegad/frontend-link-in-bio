'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

interface InlineEditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  isTextarea?: boolean;
}

const InlineEditableField: React.FC<InlineEditableFieldProps> = ({
  value,
  onSave,
  placeholder = '',
  className = '',
  isTextarea = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Solo actualizar localValue al inicializar el componente
    setLocalValue(value);
  }, [value]);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (isTextarea) {
        textareaRef.current?.focus();
      } else {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Enviar el valor tal como está, la validación se hace en el dashboard
    onSave(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextarea) {
      e.preventDefault();
      setIsEditing(false);
      onSave(localValue);
    }
    if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  const displayValue = localValue || placeholder;
  const showPlaceholder = !localValue && !isEditing;

  return (
    <div className="relative group w-full">
      <div 
        className={`
          border-2 rounded-lg px-4 py-2 transition-all duration-200
          ${isEditing 
            ? 'border-[#B013A3] bg-white' 
            : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
          }
        `}
      >
        {isEditing ? (
          isTextarea ? (
            <textarea
              ref={textareaRef}
              value={localValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`${className} w-full bg-transparent border-none outline-none resize-none overflow-hidden`}
              rows={2}
              style={{ minHeight: '2.5rem' }}
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={localValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`${className} w-full bg-transparent border-none outline-none`}
            />
          )
        ) : (
          <div
            onClick={handleClick}
            className={`${className} cursor-pointer ${
              showPlaceholder ? 'text-gray-400 italic' : ''
            }`}
            title="Haz clic para editar"
          >
            {displayValue}
          </div>
        )}
      </div>
      
      {/* Icono del lápiz */}
      <button
        onClick={handleClick}
        className={`
          absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-full transition-all duration-200
          ${isEditing 
            ? 'bg-[#B013A3] text-white' 
            : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200'
          }
        `}
        title="Editar"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
};

export default InlineEditableField;