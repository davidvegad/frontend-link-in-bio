
'use client';

import React, { useRef } from 'react';
import { Pencil } from 'lucide-react';

interface EditableFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  id,
  value,
  onChange,
  isTextarea = false,
  placeholder = '',
  className = '',
  label = '',
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleEditClick = () => {
    inputRef.current?.focus();
  };

  const commonProps = {
    id,
    ref: inputRef,
    value,
    onChange,
    placeholder,
    className: `flex-grow bg-white text-gray-900 border-b-2 border-gray-300 focus:border-indigo-500 outline-none ${className}`,
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
        className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={`Edit ${label}`}
      >
        <Pencil size={18} />
      </button>
    </div>
  );
};

export default EditableField;
