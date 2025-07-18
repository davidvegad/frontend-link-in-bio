// === INTERFACES PARA COMPONENTES ===

import { ReactNode } from 'react';

// Tipos base
export type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type Status = 'idle' | 'loading' | 'success' | 'error';

// === BUTTON INTERFACES ===

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
}

// === CARD INTERFACES ===

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: Size;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

// === INPUT INTERFACES ===

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

export interface TextareaProps extends Omit<InputProps, 'type' | 'icon' | 'iconPosition'> {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  fullWidth?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

// === MODAL INTERFACES ===

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

// === NOTIFICATION/TOAST INTERFACES ===

export interface NotificationProps {
  id: string;
  title: string;
  message?: string;
  variant: Variant;
  duration?: number;
  closeable?: boolean;
  onClose?: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextType {
  notifications: NotificationProps[];
  addNotification: (notification: Omit<NotificationProps, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// === LOADING INTERFACES ===

export interface LoadingSpinnerProps {
  size?: Size;
  variant?: 'primary' | 'secondary' | 'neutral';
  className?: string;
}

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

// === NAVIGATION INTERFACES ===

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: NavigationItem[];
}

export interface NavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  variant?: 'horizontal' | 'vertical' | 'sidebar';
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

// === FORM INTERFACES ===

export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export interface FormProps {
  onSubmit: (data: Record<string, any>) => void;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

// === TABLE INTERFACES ===

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => ReactNode;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
}

// === PAGINATION INTERFACES ===

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

// === ACCORDION INTERFACES ===

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

// === TAB INTERFACES ===

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'line' | 'card' | 'pill';
  className?: string;
}

// === DROPDOWN INTERFACES ===

export interface DropdownItem {
  id: string;
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  disabled?: boolean;
  separator?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}

// === BADGE INTERFACES ===

export interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'square' | 'pill';
  className?: string;
}

// === AVATAR INTERFACES ===

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: Size;
  shape?: 'circle' | 'square';
  className?: string;
  onClick?: () => void;
}

// === PROGRESS INTERFACES ===

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  color?: Variant;
  showLabel?: boolean;
  className?: string;
}

// === SLIDER INTERFACES ===

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

// === SWITCH/TOGGLE INTERFACES ===

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// === CHECKBOX INTERFACES ===

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

// === RADIO INTERFACES ===

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  name: string;
  label?: string;
  error?: string;
  className?: string;
}

// === LAYOUT INTERFACES ===

export interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

export interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: Size;
  className?: string;
}

export interface FlexProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: Size;
  className?: string;
}

// === MEDIA INTERFACES ===

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
}

// === DATOS ESPECÍFICOS DE LA APLICACIÓN ===

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  clicks: number;
  createdAt: string;
}

export interface PageTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  backgroundImage?: string;
  backgroundOverlay?: number;
}

export interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  clickThroughRate: number;
  topLinks: Array<{
    id: string;
    title: string;
    clicks: number;
    percentage: number;
  }>;
  viewsOverTime: Array<{
    date: string;
    views: number;
    clicks: number;
  }>;
}

// === CONTEXT INTERFACES ===

export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  systemTheme: 'light' | 'dark';
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}