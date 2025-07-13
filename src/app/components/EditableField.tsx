
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface EditableFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: (newValue: string) => void; // New prop for saving
  isTextarea?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  id,
  value,
  onChange,
  onSave,
  isTextarea = false,
  placeholder = '',
  className = '',
  label = '',
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(localValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange(e); // Pass the event up to the parent for immediate state update
  };

  const commonProps = {
    id,
    ref: inputRef,
    value: localValue,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder,
    readOnly: !isEditing,
    className: `flex-grow bg-white text-gray-900 border-b-2 border-gray-300 focus:border-indigo-500 outline-none ${className} ${isEditing ? 'cursor-text' : 'cursor-pointer'}`,
  };

  return (
    <div className="relative flex items-center w-full group">
      {isTextarea ? (
        <textarea {...commonProps} rows={3} />
      ) : (
        <input type="text" {...commonProps} />
      )}
      <button
        type="button"
        onClick={handleEditClick}
        className={`ml-2 p-1 rounded-full transition-colors duration-300 ${isEditing ? 'bg-[#B013A3] text-white' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`}
        aria-label={`Edit ${label}`}
      >
        <Pencil size={18} />
      </button>
    </div>
  );
};

export default EditableField;
