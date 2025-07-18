import { forwardRef } from 'react';
import { ButtonProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'base',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    onClick,
    type = 'button',
    className,
    ariaLabel,
    ...props
  }, ref) => {
    
    const baseStyles = [
      // Base styles
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      
      // Full width
      fullWidth && 'w-full',
    ];

    const variants = {
      primary: [
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
        'hover:from-blue-700 hover:to-purple-700',
        'focus:ring-blue-500',
        'active:scale-95',
        'shadow-lg hover:shadow-xl',
      ],
      secondary: [
        'bg-white text-gray-900 border border-gray-300',
        'hover:bg-gray-50 hover:border-gray-400',
        'focus:ring-gray-500',
        'active:bg-gray-100',
      ],
      outline: [
        'bg-transparent text-blue-600 border-2 border-blue-600',
        'hover:bg-blue-600 hover:text-white',
        'focus:ring-blue-500',
        'active:bg-blue-700',
      ],
      ghost: [
        'bg-transparent text-gray-700 hover:bg-gray-100',
        'focus:ring-gray-500',
        'active:bg-gray-200',
      ],
      link: [
        'bg-transparent text-blue-600 underline-offset-4',
        'hover:underline focus:underline',
        'focus:ring-blue-500',
        'p-0 h-auto',
      ],
    };

    const sizes = {
      xs: 'h-7 px-2 text-xs',
      sm: 'h-8 px-3 text-sm',
      base: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl',
      '2xl': 'h-16 px-10 text-2xl',
    };

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      base: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
      '2xl': 'w-8 h-8',
    };

    const iconSpacing = {
      xs: 'gap-1',
      sm: 'gap-1.5',
      base: 'gap-2',
      lg: 'gap-2.5',
      xl: 'gap-3',
      '2xl': 'gap-3.5',
    };

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      variant !== 'link' && sizes[size],
      icon && iconSpacing[size],
      className
    );

    const iconElement = icon && (
      <span className={cn(iconSizes[size])}>
        {icon}
      </span>
    );

    const loadingSpinner = loading && (
      <svg
        className={cn('animate-spin', iconSizes[size])}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={buttonClasses}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <>
            {loadingSpinner}
            <span>Cargando...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && iconElement}
            {children}
            {icon && iconPosition === 'right' && iconElement}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;