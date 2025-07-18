import { forwardRef } from 'react';
import { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from '@/types/components';
import { cn } from '@/lib/utils';

// Main Card Component
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    variant = 'default',
    padding = 'base',
    className,
    hover = false,
    clickable = false,
    onClick,
    ...props
  }, ref) => {
    
    const baseStyles = [
      'bg-white rounded-xl border transition-all duration-200',
    ];

    const variants = {
      default: 'border-gray-200',
      elevated: 'border-gray-200 shadow-lg',
      outlined: 'border-2 border-gray-300',
      filled: 'bg-gray-50 border-gray-200',
    };

    const paddings = {
      xs: 'p-2',
      sm: 'p-4',
      base: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
      '2xl': 'p-12',
    };

    const interactiveStyles = [
      hover && 'hover:shadow-md hover:border-gray-300',
      clickable && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
    ];

    const cardClasses = cn(
      baseStyles,
      variants[variant],
      paddings[padding],
      interactiveStyles,
      className
    );

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={clickable ? onClick : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between mb-4', className)}
        {...props}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0 ml-4">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Content Component
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-gray-700', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// Card Footer Component
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between mt-6 pt-4 border-t border-gray-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Export all components
export { Card, CardHeader, CardContent, CardFooter };
export default Card;