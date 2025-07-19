'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useState, useRef } from 'react';
import {
  UserCircle,
  User,
  Upload,
  ArrowRight,
  ChevronLeft,
  Camera,
  CheckCircle,
  AlertCircle,
  X,
  Edit3,
  Eye,
  Sparkles,
  Globe,
  Users
} from 'lucide-react';

export default function InfoPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ avatar: t('welcome.info.validation.avatarTooLarge') });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ avatar: t('welcome.info.validation.avatarInvalidType') });
        return;
      }

      setIsUploading(true);
      setErrors({});
      
      try {
        updateProfileData({ avatar: file });
        setAvatarPreview(URL.createObjectURL(file));
      } catch (error) {
        setErrors({ avatar: t('welcome.info.validation.avatarUploadError') });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveAvatar = () => {
    updateProfileData({ avatar: null });
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = t('welcome.info.validation.nameRequired');
        } else if (value.trim().length < 2) {
          newErrors.name = t('welcome.info.validation.nameTooShort');
        } else if (value.length > 50) {
          newErrors.name = t('welcome.info.validation.nameTooLong');
        } else {
          delete newErrors.name;
        }
        break;
      case 'bio':
        if (!value.trim()) {
          newErrors.bio = t('welcome.info.validation.bioRequired');
        } else if (value.trim().length < 10) {
          newErrors.bio = t('welcome.info.validation.bioTooShort');
        } else if (value.length > 160) {
          newErrors.bio = t('welcome.info.validation.bioTooLong');
        } else {
          delete newErrors.bio;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleNameChange = (value: string) => {
    updateProfileData({ name: value });
    validateField('name', value);
  };

  const handleBioChange = (value: string) => {
    updateProfileData({ bio: value });
    validateField('bio', value);
  };

  const handleBack = () => {
    router.push('/welcome/2-style');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    validateField('name', profileData.name || '');
    validateField('bio', profileData.bio || '');
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    if (!profileData.name || !profileData.bio) {
      return;
    }
    
    // Track completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'welcome_info_completed', {
        event_category: 'onboarding',
        has_avatar: !!profileData.avatar
      });
    }
    
    router.push('/welcome/4-theme');
  };

  const canProceed = !!(profileData.name && profileData.bio && Object.keys(errors).length === 0);
  const bioLength = profileData.bio?.length || 0;
  const nameLength = profileData.name?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('welcome.info.back')}
          </button>

          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <User className="w-4 h-4 mr-2" />
            {t('welcome.info.step')} 3 {t('welcome.info.of')} 7
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome.info.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('welcome.info.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.info.progress')}</span>
            <span className="text-sm font-medium text-gray-700">43%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: '43%' }}
            ></div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              
              {/* Avatar section */}
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('welcome.info.avatarTitle')}
                </h3>
                
                <div className="relative inline-block mb-4">
                  {avatarPreview ? (
                    <div className="relative">
                      <img 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-green-200 shadow-lg" 
                      />
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-gray-200">
                      <UserCircle className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  type="button"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {avatarPreview ? t('welcome.info.changePhoto') : t('welcome.info.uploadPhoto')}
                </button>
                
                <p className="text-xs text-gray-500 mt-2">
                  {t('welcome.info.photoHint')}
                </p>
                
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-2 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.avatar}
                  </p>
                )}
              </div>

              {/* Name field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('welcome.info.nameLabel')} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={profileData.name || ''}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder={t('welcome.info.namePlaceholder')}
                    maxLength={50}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className={`text-xs ${nameLength > 40 ? 'text-red-500' : 'text-gray-400'}`}>
                      {nameLength}/50
                    </span>
                  </div>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Bio field */}
              <div className="mb-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('welcome.info.bioLabel')} *
                </label>
                <div className="relative">
                  <textarea
                    id="bio"
                    value={profileData.bio || ''}
                    onChange={(e) => handleBioChange(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${
                      errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder={t('welcome.info.bioPlaceholder')}
                    rows={4}
                    maxLength={160}
                  />
                  <div className="absolute right-3 bottom-3">
                    <span className={`text-xs ${bioLength > 140 ? 'text-red-500' : 'text-gray-400'}`}>
                      {bioLength}/160
                    </span>
                  </div>
                </div>
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.bio}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {t('welcome.info.bioHint')}
                </p>
              </div>

              {/* Preview section */}
              {(profileData.name || profileData.bio) && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center mb-3">
                    <Eye className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {t('welcome.info.preview')}
                    </span>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center space-x-3">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCircle className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {profileData.name || t('welcome.info.namePlaceholder')}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {profileData.bio || t('welcome.info.bioPlaceholder')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Continue button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!canProceed}
                className={`
                  inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300
                  ${canProceed
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {t('welcome.info.continue')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>
        </div>

        {/* Tips section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('welcome.info.tipsTitle')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.info.tip1Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.info.tip1Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.info.tip2Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.info.tip2Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.info.tip3Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.info.tip3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}