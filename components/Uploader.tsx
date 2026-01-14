import React, { useCallback, useState } from 'react';

interface UploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const Uploader: React.FC<UploaderProps> = ({ onFileSelect, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(false);
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  }, [disabled, onFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full">
      <label 
        htmlFor="file-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center w-full h-80 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group
          ${isDragging 
            ? 'border-brand-500 bg-brand-50' 
            : 'border-slate-300 bg-white hover:border-brand-400 hover:bg-slate-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <div className={`p-4 rounded-full mb-4 transition-transform duration-300 ${isDragging ? 'scale-110 bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-500'}`}>
            <svg aria-hidden="true" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <p className="mb-2 text-xl font-semibold text-slate-700">
            {isDragging ? 'Drop to upload' : 'Click or drag image here'}
          </p>
          <p className="text-sm text-slate-500 max-w-xs">
            Supports JPG, PNG, WEBP (Max 10MB)
          </p>
        </div>
        <input 
          id="file-upload" 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleInputChange}
          disabled={disabled}
        />
        
        {/* Decorative corner accents */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent transform scale-x-0 transition-transform duration-500 ${isDragging ? 'scale-x-100' : 'group-hover:scale-x-100'}`} />
      </label>
    </div>
  );
};
