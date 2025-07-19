'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Chrome,
  Facebook,
  Github,
  UserPlus,
  Sparkles,
  Zap,
  Shield,
  Star,
  Users,
  TrendingUp,
  Clock,
  Gift
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebAnalytics from '../components/WebAnalytics';
import StructuredData from '../components/StructuredData';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

interface RegisterError {
  field?: string;
  message: string;
}

function RegisterForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: searchParams.get('email') || '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterError[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Real-time validation
  const validateField = (field: string, value: string) => {
    const newErrors = { ...validationErrors };
    
    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = t('register.validation.firstNameRequired');
        } else if (value.trim().length < 2) {
          newErrors.firstName = t('register.validation.firstNameTooShort');
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = t('register.validation.lastNameRequired');
        } else if (value.trim().length < 2) {
          newErrors.lastName = t('register.validation.lastNameTooShort');
        } else {
          delete newErrors.lastName;
        }
        break;
      case 'email':
        if (!value) {
          newErrors.email = t('register.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = t('register.validation.emailInvalid');
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = t('register.validation.passwordRequired');
        } else if (value.length < 8) {
          newErrors.password = t('register.validation.passwordTooShort');
        } else {
          delete newErrors.password;
        }
        setPasswordStrength(calculatePasswordStrength(value));
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = t('register.validation.confirmPasswordRequired');
        } else if (value !== formData.password) {
          newErrors.confirmPassword = t('register.validation.passwordsDoNotMatch');
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    
    setValidationErrors(newErrors);
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (typeof value === 'string') {
      validateField(field, value);
    }
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSocialRegister = (provider: 'google' | 'facebook' | 'github') => {
    // Track social register attempt
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'social_register_attempt', {
        event_category: 'registration',
        event_label: provider
      });
    }
    
    // Redirect to social auth endpoint
    window.location.href = `${API_URL}/auth/${provider}/register/`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // Final validation
    Object.keys(formData).forEach(field => {
      if (typeof formData[field as keyof RegisterFormData] === 'string') {
        validateField(field, formData[field as keyof RegisterFormData] as string);
      }
    });

    // Check terms agreement
    if (!formData.agreeToTerms) {
      setErrors([{ message: t('register.validation.agreeToTermsRequired') }]);
      setIsLoading(false);
      return;
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/linkinbio/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          subscribe_newsletter: formData.subscribeNewsletter
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle specific error types
        if (response.status === 400) {
          if (errorData.email) {
            setErrors([{ field: 'email', message: t('register.errors.emailExists') }]);
          } else {
            setErrors([{ message: errorData.detail || t('register.errors.invalidData') }]);
          }
        } else if (response.status === 429) {
          setErrors([{ message: t('register.errors.tooManyAttempts') }]);
        } else {
          setErrors([{ message: errorData.detail || t('register.errors.generic') }]);
        }
        return;
      }

      // Track successful registration
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'sign_up', {
          event_category: 'registration',
          event_label: 'email_password'
        });
      }

      setIsSuccess(true);
      
      // Auto-login after registration
      setTimeout(async () => {
        try {
          const loginResponse = await fetch(`${API_URL}/api/linkinbio/token/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              username: formData.email,
              password: formData.password 
            }),
          });
          
          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            localStorage.setItem('accessToken', loginData.access);
            localStorage.setItem('refreshToken', loginData.refresh);
            router.push('/welcome/1-category');
          } else {
            router.push('/login');
          }
        } catch {
          router.push('/login');
        }
      }, 2000);

    } catch (err: any) {
      setErrors([{ message: t('register.errors.network') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      case 5: return 'bg-green-600';
      default: return 'bg-gray-300';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return t('register.password.weak');
      case 2: return t('register.password.fair');
      case 3: return t('register.password.good');
      case 4: return t('register.password.strong');
      case 5: return t('register.password.veryStrong');
      default: return '';
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('register.success.title')}</h2>
          <p className="text-gray-600 mb-4">{t('register.success.message')}</p>
          <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <StructuredData />
      <WebAnalytics />
      <Header />
      
      <main className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Marketing Content */}
          <div className="hidden lg:block text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Gift className="w-4 h-4 mr-2" />
                {t('register.hero.badge')}
              </div>
              
              <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t('register.hero.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {t('register.hero.subtitle')}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{t('register.benefits.noCard')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{t('register.benefits.quickSetup')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{t('register.benefits.customization')}</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">50K+</span>
                </div>
                <p className="text-sm text-gray-600">{t('register.stats.users')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">98%</span>
                </div>
                <p className="text-sm text-gray-600">{t('register.stats.satisfaction')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-purple-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">2min</span>
                </div>
                <p className="text-sm text-gray-600">{t('register.stats.setup')}</p>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  CR
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Carlos Ruiz</p>
                  <p className="text-sm text-gray-600">Emprendedor</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{t('register.testimonial.quote')}"
              </p>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('register.form.title')}
                </h2>
                <p className="text-gray-600">
                  {t('register.form.subtitle')}
                </p>
              </div>

              {/* Social Register Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialRegister('google')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  {t('register.social.google')}
                </button>
                <button
                  onClick={() => handleSocialRegister('facebook')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="w-5 h-5 mr-3" />
                  {t('register.social.facebook')}
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('register.form.orSignUpWith')}</span>
                </div>
              </div>

              {/* Error Messages */}
              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      {errors.map((error, index) => (
                        <p key={index} className="text-red-600">{error.message}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('register.form.firstName')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          validationErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={t('register.form.firstNamePlaceholder')}
                        required
                      />
                    </div>
                    {validationErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('register.form.lastName')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                          validationErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={t('register.form.lastNamePlaceholder')}
                        required
                      />
                    </div>
                    {validationErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register.form.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                        validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={t('register.form.emailPlaceholder')}
                      required
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register.form.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                        validationErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={t('register.form.passwordPlaceholder')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{t('register.form.passwordStrength')}</span>
                        <span className="text-xs text-gray-600">{getPasswordStrengthText()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register.form.confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                        validationErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={t('register.form.confirmPasswordPlaceholder')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {t('register.form.agreeTerms')}{' '}
                      <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
                        {t('register.form.terms')}
                      </Link>{' '}
                      {t('register.form.and')}{' '}
                      <Link href="/privacy" className="text-green-600 hover:text-green-700 underline">
                        {t('register.form.privacy')}
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.subscribeNewsletter}
                      onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {t('register.form.newsletter')}
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || Object.keys(validationErrors).length > 0 || !formData.agreeToTerms}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? t('register.form.creating') : t('register.form.createAccount')}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {t('register.form.haveAccount')}{' '}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
                    {t('register.form.signIn')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full"></div></div>}>
      <RegisterForm />
    </Suspense>
  );
}