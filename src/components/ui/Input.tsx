import { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { InputProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    type = 'text',
    size = 'base',
    disabled = false,
    required = false,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    className,
    fullWidth = false,
    ...props
  }, ref) => {
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword && isPasswordVisible ? 'text' : type;
    const hasError = Boolean(error);
    
    const baseStyles = [
      'w-full border rounded-lg bg-white transition-all duration-200',
      'placeholder:text-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    ];

    const sizes = {
      xs: 'h-7 px-2 text-xs',
      sm: 'h-8 px-3 text-sm',
      base: 'h-10 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
      xl: 'h-14 px-6 text-xl',
      '2xl': 'h-16 px-8 text-2xl',
    };

    const stateStyles = {
      normal: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      disabled: 'border-gray-200',
    };

    const getStateStyle = () => {
      if (disabled) return stateStyles.disabled;
      if (hasError) return stateStyles.error;
      return stateStyles.normal;
    };

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      base: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
      '2xl': 'w-8 h-8',
    };

    const paddingWithIcon = {
      left: {
        xs: 'pl-7',
        sm: 'pl-9',
        base: 'pl-11',
        lg: 'pl-13',
        xl: 'pl-15',
        '2xl': 'pl-17',
      },
      right: {
        xs: 'pr-7',
        sm: 'pr-9',
        base: 'pr-11',
        lg: 'pr-13',
        xl: 'pr-15',
        '2xl': 'pr-17',
      },
    };

    const iconPositions = {
      left: {
        xs: 'left-2',
        sm: 'left-2.5',
        base: 'left-3',
        lg: 'left-4',
        xl: 'left-5',
        '2xl': 'left-6',
      },
      right: {
        xs: 'right-2',
        sm: 'right-2.5',
        base: 'right-3',
        lg: 'right-4',
        xl: 'right-5',
        '2xl': 'right-6',
      },
    };

    const inputClasses = cn(
      baseStyles,
      sizes[size],
      getStateStyle(),
      icon && iconPosition === 'left' && paddingWithIcon.left[size],
      (icon && iconPosition === 'right') || isPassword ? paddingWithIcon.right[size] : '',
      !fullWidth && 'max-w-sm',
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.();
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className={cn('relative', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {/* Left Icon */}
          {icon && iconPosition === 'left' && (
            <div className={cn(
              'absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none',
              iconPositions.left[size]
            )}>
              <span className={iconSizes[size]}>
                {icon}
              </span>
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            {...props}
          />
          
          {/* Right Icon or Password Toggle */}
          {(icon && iconPosition === 'right') || isPassword ? (
            <div className={cn(
              'absolute top-1/2 transform -translate-y-1/2',
              iconPositions.right[size]
            )}>
              {isPassword ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={disabled}
                  className={cn(
                    'text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors',
                    iconSizes[size]
                  )}
                >
                  {isPasswordVisible ? <EyeOff /> : <Eye />}
                </button>
              ) : (
                <span className={cn('text-gray-400 pointer-events-none', iconSizes[size])}>
                  {icon}
                </span>
              )}
            </div>
          ) : null}
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="flex items-center mt-2 text-red-600">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;