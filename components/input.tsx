import React, { forwardRef } from 'react';
import cc from 'classcat';
import { Typography } from './typography';

interface InputProps {
  label?: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type = 'text', value, onChange, className }, ref) => {
    const inputId = `input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className={cc(['mb-4', className])}>
        <label
          htmlFor={inputId}
          className={cc([label ? 'block mb-2' : 'sr-only'])}
        >
          {label || placeholder}
        </label>
        <input
          id={inputId}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cc([
            'bg-background text-primary border-2 border-highlight p-2 rounded-retro shadow-inner w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:text-base md:text-lg',
            className,
          ])}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
