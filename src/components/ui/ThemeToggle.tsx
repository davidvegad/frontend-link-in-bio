'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'inline';
  className?: string;
}

export default function ThemeToggle({ 
  variant = 'button', 
  className 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'light', label: 'Claro', icon: Sun },
    { name: 'dark', label: 'Oscuro', icon: Moon },
    { name: 'system', label: 'Sistema', icon: Monitor },
  ] as const;

  if (variant === 'button') {
    const currentTheme = themes.find(t => t.name === theme);
    const currentIcon = currentTheme?.icon || Monitor;
    const CurrentIcon = currentIcon;

    return (
      <button
        onClick={() => {
          const currentIndex = themes.findIndex(t => t.name === theme);
          const nextIndex = (currentIndex + 1) % themes.length;
          setTheme(themes[nextIndex].name);
        }}
        className={cn(
          'relative inline-flex items-center justify-center w-10 h-10',
          'rounded-lg border border-gray-300 bg-white text-gray-700',
          'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
          'transition-all duration-200',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
          className
        )}
        title={`Tema actual: ${currentTheme?.label || 'Sistema'}. Click para cambiar.`}
      >
        <CurrentIcon className="w-5 h-5" />
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
          className={cn(
            'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
            'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100'
          )}
        >
          {themes.map((themeOption) => (
            <option key={themeOption.name} value={themeOption.name}>
              {themeOption.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tema:
        </span>
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isActive = theme === themeOption.name;
            
            return (
              <button
                key={themeOption.name}
                onClick={() => setTheme(themeOption.name)}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700/50'
                )}
                title={themeOption.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}