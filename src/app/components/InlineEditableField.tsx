'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

interface InlineEditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  isTextarea?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    customValidator?: (value: string) => string | null;
  };
}

const InlineEditableField: React.FC<InlineEditableFieldProps> = ({
  value,
  onSave,
  placeholder = '',
  className = '',
  isTextarea = false,
  maxLength,
  showCharacterCount = false,
  validation,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Solo actualizar localValue al inicializar el componente
    setLocalValue(value);
  }, [value]);

  // Función de validación
  const validateValue = (val: string): string | null => {
    if (!validation) return null;

    // Validación requerida
    if (validation.required && !val.trim()) {
      return 'Este campo es obligatorio';
    }

    // Validación de longitud mínima
    if (validation.minLength && val.trim().length < validation.minLength) {
      return `Mínimo ${validation.minLength} caracteres`;
    }

    // Validación de patrón
    if (validation.pattern && val.trim() && !validation.pattern.test(val)) {
      return 'Formato no válido';
    }

    // Validación personalizada
    if (validation.customValidator) {
      return validation.customValidator(val);
    }

    return null;
  };

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
    const error = validateValue(localValue);
    setValidationError(error);
    
    if (!error) {
      setIsEditing(false);
      onSave(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextarea) {
      e.preventDefault();
      const error = validateValue(localValue);
      setValidationError(error);
      
      if (!error) {
        setIsEditing(false);
        onSave(localValue);
      }
    }
    if (e.key === 'Escape') {
      setLocalValue(value);
      setValidationError(null);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    // Aplicar límite de caracteres si está definido
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    setLocalValue(newValue);
    
    // Validación en tiempo real (solo limpiar errores si el valor es válido)
    if (validationError) {
      const error = validateValue(newValue);
      if (!error) {
        setValidationError(null);
      }
    }
  };

  // Cálculos para la barra de progreso
  const currentLength = localValue.length;
  const progressPercentage = maxLength ? Math.min((currentLength / maxLength) * 100, 100) : 0;
  const isNearLimit = maxLength ? currentLength >= maxLength * 0.8 : false;
  const isAtLimit = maxLength ? currentLength >= maxLength : false;

  const displayValue = localValue || placeholder;
  const showPlaceholder = !localValue && !isEditing;

  return (
    <div className="relative group w-full">
      <div 
        className={`
          border-2 rounded-lg px-4 py-2 transition-all duration-200
          ${validationError
            ? 'border-red-500 bg-red-50'
            : isEditing 
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
              maxLength={maxLength}
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
              maxLength={maxLength}
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
      
      {/* Mensaje de error de validación */}
      {validationError && (
        <div className="mt-1 text-red-600 text-xs font-medium flex items-center gap-1">
          <span>⚠️</span>
          <span>{validationError}</span>
        </div>
      )}
      
      {/* Barra de progreso y contador de caracteres */}
      {(isEditing || showCharacterCount) && maxLength && (
        <div className="mt-2 space-y-1">
          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                isAtLimit 
                  ? 'bg-red-500' 
                  : isNearLimit 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Contador de caracteres */}
          <div className="flex justify-between items-center text-xs">
            <span className={`font-medium ${
              isAtLimit 
                ? 'text-red-600' 
                : isNearLimit 
                  ? 'text-yellow-600' 
                  : 'text-gray-500'
            }`}>
              {currentLength}/{maxLength} caracteres
            </span>
            
            {isNearLimit && (
              <span className={`text-xs ${isAtLimit ? 'text-red-600' : 'text-yellow-600'}`}>
                {isAtLimit ? 'Límite alcanzado' : 'Cerca del límite'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineEditableField;