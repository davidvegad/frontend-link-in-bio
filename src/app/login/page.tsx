'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Chrome,
  Facebook,
  Github,
  User,
  Shield,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebAnalytics from '../components/WebAnalytics';
import StructuredData from '../components/StructuredData';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginError {
  field?: string;
  message: string;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginError[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Real-time validation
  const validateField = (field: string, value: string) => {
    const newErrors = { ...validationErrors };
    
    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = t('login.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = t('login.validation.emailInvalid');
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = t('login.validation.passwordRequired');
        } else if (value.length < 6) {
          newErrors.password = t('login.validation.passwordTooShort');
        } else {
          delete newErrors.password;
        }
        break;
    }
    
    setValidationErrors(newErrors);
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (typeof value === 'string') {
      validateField(field, value);
    }
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'github') => {
    // Track social login attempt
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'social_login_attempt', {
        event_category: 'authentication',
        event_label: provider
      });
    }
    
    // Redirect to social auth endpoint
    window.location.href = `${API_URL}/auth/${provider}/`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // Final validation
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/linkinbio/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.email,
          password: formData.password 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle specific error types
        if (response.status === 401) {
          setErrors([{ message: t('login.errors.invalidCredentials') }]);
        } else if (response.status === 429) {
          setErrors([{ message: t('login.errors.tooManyAttempts') }]);
        } else {
          setErrors([{ message: errorData.detail || t('login.errors.generic') }]);
        }
        return;
      }

      const data = await response.json();
      
      // Store tokens
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberLogin', 'true');
      }

      // Track successful login
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'login_success', {
          event_category: 'authentication',
          event_label: 'email_password'
        });
      }

      setIsSuccess(true);
      
      // Redirect after brief success state
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err: any) {
      setErrors([{ message: t('login.errors.network') }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for remembered login
  useEffect(() => {
    const rememberLogin = localStorage.getItem('rememberLogin');
    const accessToken = localStorage.getItem('accessToken');
    
    if (rememberLogin && accessToken) {
      // Verify token is still valid
      fetch(`${API_URL}/api/auth/verify/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(response => {
        if (response.ok) {
          router.push('/dashboard');
        }
      }).catch(() => {
        // Token invalid, continue with login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('rememberLogin');
      });
    }
  }, [router, API_URL]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('login.success.title')}</h2>
          <p className="text-gray-600 mb-4">{t('login.success.message')}</p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <StructuredData />
      <WebAnalytics />
      <Header />
      
      <main className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Marketing Content */}
          <div className="hidden lg:block text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                {t('login.hero.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {t('login.hero.subtitle')}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{t('login.features.analytics')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{t('login.features.customization')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{t('login.features.security')}</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  MG
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">María González</p>
                  <p className="text-sm text-gray-600">Influencer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{t('login.testimonial.quote')}"
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('login.form.title')}
                </h2>
                <p className="text-gray-600">
                  {t('login.form.subtitle')}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  {t('login.social.google')}
                </button>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="w-5 h-5 mr-3" />
                  {t('login.social.facebook')}
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('login.form.orContinueWith')}</span>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('login.form.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={t('login.form.emailPlaceholder')}
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
                    {t('login.form.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        validationErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={t('login.form.passwordPlaceholder')}
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
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{t('login.form.rememberMe')}</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                    {t('login.form.forgotPassword')}
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || Object.keys(validationErrors).length > 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? t('login.form.signingIn') : t('login.form.signIn')}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {t('login.form.noAccount')}{' '}
                  <Link href="/crear-pagina-gratis" className="text-blue-600 hover:text-blue-700 font-semibold">
                    {t('login.form.signUp')}
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