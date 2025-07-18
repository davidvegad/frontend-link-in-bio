'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { debounce } from 'lodash';
import { Menu, X, User, Palette, BarChart2, Settings as SettingsIcon, Save, Share2, Flame, Bell } from 'lucide-react';

import LivePreview from '../components/LivePreview';
import DesignCustomizer from '../components/DesignCustomizer';
import LinkManager from '../components/LinkManager';
import Settings from '../components/Settings';
import Analytics from '../components/Analytics';
import LinkTypeSelectionModal from '../components/LinkTypeSelectionModal';
import ShareLinkModal from '../components/ShareLinkModal';
import EditableField from '../components/EditableField';
import InlineEditableField from '../components/InlineEditableField';
import CoverImageModal from '../components/CoverImageModal';
import SocialIconModal from '../components/SocialIconModal';
import { getSocialIcon } from '../components/SocialIcons';
import PushNotificationsDashboard from '../../components/advanced/PushNotificationsDashboard';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

// Interfaces
interface LinkData {
  id: number;
  title: string;
  url: string;
  type?: string;
  order?: number;
}

interface SocialIconData {
  id?: number;
  social_type: string;
  username: string;
  url: string;
  order?: number;
}

interface ProfileData {
  id: number;
  user?: string;
  name: string;
  bio: string;
  avatar: string;
  cover_image?: string;
  slug?: string;
  profile_type?: string;
  purpose?: string;
  template_style?: string;
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: string;
  background_preference?: 'image' | 'color';
  image_overlay?: 'none' | 'dark' | 'light';
  button_style?: string;
  button_color?: string;
  button_text_color?: string;
  button_text_opacity?: number;
  button_background_opacity?: number;
  button_border_color?: string;
  button_border_opacity?: number;
  button_shadow_color?: string;
  button_shadow_opacity?: number;
  font_family?: string;
  links: LinkData[];
  social_icons?: SocialIconData[];
}

// Main Component
export default function DashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States for form fields
  const [profileName, setProfileName] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileAvatar, setProfileAvatar] = useState<File | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [originalProfileSlug, setOriginalProfileSlug] = useState('');
  
  // Design states
  const [theme, setTheme] = useState('');
  const [customGradientStart, setCustomGradientStart] = useState('');
  const [customGradientEnd, setCustomGradientEnd] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<File | string | null>(null);
  const [backgroundPreference, setBackgroundPreference] = useState<'image' | 'color'>('color');
  const [imageOverlay, setImageOverlay] = useState<'none' | 'dark' | 'light'>('none');
  const [buttonStyle, setButtonStyle] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [buttonTextColor, setButtonTextColor] = useState('');
  const [buttonTextColorOpacity, setButtonTextColorOpacity] = useState(1);
  const [buttonBackgroundOpacity, setButtonBackgroundOpacity] = useState(1);
  const [buttonBorderColor, setButtonBorderColor] = useState('');
  const [buttonBorderOpacity, setButtonBorderOpacity] = useState(1);
  const [buttonShadowColor, setButtonShadowColor] = useState('');
  const [buttonShadowOpacity, setButtonShadowOpacity] = useState(1);
  const [fontFamily, setFontFamily] = useState('');

  // Unified link state
  const [links, setLinks] = useState<LinkData[]>([]);
  const [socialIcons, setSocialIcons] = useState<SocialIconData[]>([]);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [isLinkTypeModalOpen, setIsLinkTypeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isSocialIconModalOpen, setIsSocialIconModalOpen] = useState(false);

  const saveDesignChanges = useCallback(async (currentDesignStates: any) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    // Función para descargar imagen de URL y convertirla a File
    const downloadImageAsFile = async (imageUrl: string): Promise<File> => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new File([blob], 'unsplash-background.jpg', { type: 'image/jpeg' });
    };

    try {
      const formData = new FormData();
      formData.append('theme', currentDesignStates.theme);
      formData.append('custom_gradient_start', currentDesignStates.customGradientStart);
      formData.append('custom_gradient_end', currentDesignStates.customGradientEnd);
      
      if (currentDesignStates.backgroundPreference === 'color') {
        formData.append('background_image', ''); 
      } else if (currentDesignStates.backgroundImage instanceof File) {
        // Si es un archivo subido, usar directamente
        formData.append('background_image', currentDesignStates.backgroundImage);
      } else if (typeof currentDesignStates.backgroundImage === 'string' && currentDesignStates.backgroundImage) {
        // Si es una URL de Unsplash, descargarla primero
        const imageFile = await downloadImageAsFile(currentDesignStates.backgroundImage);
        formData.append('background_image', imageFile);
      } else {
        formData.append('background_image', '');
      }

      formData.append('background_preference', currentDesignStates.backgroundPreference);
      formData.append('image_overlay', currentDesignStates.imageOverlay);
      formData.append('button_style', currentDesignStates.buttonStyle);
      formData.append('button_color', currentDesignStates.buttonColor);
      formData.append('button_text_color', currentDesignStates.buttonTextColor);
      formData.append('button_text_opacity', currentDesignStates.buttonTextColorOpacity.toString());
      formData.append('button_background_opacity', currentDesignStates.buttonBackgroundOpacity.toString());
      formData.append('button_border_color', currentDesignStates.buttonBorderColor);
      formData.append('button_border_opacity', currentDesignStates.buttonBorderOpacity.toString());
      formData.append('button_shadow_color', currentDesignStates.buttonShadowColor);
      formData.append('button_shadow_opacity', currentDesignStates.buttonShadowOpacity.toString());
      formData.append('font_family', currentDesignStates.fontFamily);

      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Auto-save design changes error:', errorData);
        throw new Error(errorData.detail || 'Failed to auto-save design changes.');
      }
      console.log('Design changes auto-saved successfully!');
    } catch (err: any) {
      console.error('Error during auto-save:', err.message);
    }
  }, [profile, API_URL]);

  const debouncedSaveDesignChanges = useCallback(debounce(saveDesignChanges, 1000), [saveDesignChanges]);

  useEffect(() => {
    if (!loading && profile) { // Only auto-save after initial load and if profile exists
      debouncedSaveDesignChanges({
        theme,
        customGradientStart,
        customGradientEnd,
        backgroundImage,
        backgroundPreference,
        imageOverlay,
        buttonStyle,
        buttonColor,
        buttonTextColor,
        buttonTextColorOpacity,
        buttonBackgroundOpacity,
        buttonBorderColor,
        buttonBorderOpacity,
        buttonShadowColor,
        buttonShadowOpacity,
        fontFamily,
      });
    }
  }, [
    theme,
    customGradientStart,
    customGradientEnd,
    backgroundImage,
    backgroundPreference,
    imageOverlay,
    buttonStyle,
    buttonColor,
    buttonTextColor,
    buttonTextColorOpacity,
    buttonBackgroundOpacity,
    buttonBorderColor,
    buttonBorderOpacity,
    buttonShadowColor,
    buttonShadowOpacity,
    fontFamily,
    loading, // Include loading to prevent saving before profile is fetched
    profile, // Include profile to ensure it's available
    debouncedSaveDesignChanges,
  ]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!response.ok) throw new Error('Failed to refresh token.');
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      return true;
    } catch (err) {
      console.error('Error refreshing token:', err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
      return false;
    }
  }, [router, API_URL]);

  const fetchProfile = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          await fetchProfile(); // Retry fetching
        }
        return;
      }

      if (!response.ok) {
        if (response.status === 404) {
          router.push('/welcome/1-category');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const fetchedProfile: ProfileData = await response.json();
      setProfile(fetchedProfile);

      if (!fetchedProfile.profile_type || fetchedProfile.profile_type.trim() === '') {
        router.push('/welcome/1-category');
        return;
      }
      
      // Initialize states
      setProfileName(fetchedProfile.name || '');
      setProfileBio(fetchedProfile.bio || '');
      setOriginalProfileSlug(fetchedProfile.slug || '');
      setTheme(fetchedProfile.theme || '');
      setCustomGradientStart(fetchedProfile.custom_gradient_start || '');
      setCustomGradientEnd(fetchedProfile.custom_gradient_end || '');
      setBackgroundImage(fetchedProfile.background_image || null);
      setBackgroundPreference(fetchedProfile.background_preference || (fetchedProfile.background_image ? 'image' : 'color'));
      setImageOverlay(fetchedProfile.image_overlay || 'none');
      setButtonStyle(fetchedProfile.button_style || '');
      setButtonColor(fetchedProfile.button_color || '');
      setButtonTextColor(fetchedProfile.button_text_color || '');
      setButtonTextColorOpacity(fetchedProfile.button_text_opacity ?? 1);
      setButtonBackgroundOpacity(fetchedProfile.button_background_opacity ?? 1);
      setButtonBorderColor(fetchedProfile.button_border_color || '');
      setButtonBorderOpacity(fetchedProfile.button_border_opacity ?? 1);
      setButtonShadowColor(fetchedProfile.button_shadow_color || '');
      setButtonShadowOpacity(fetchedProfile.button_shadow_opacity ?? 1);
      setFontFamily(fetchedProfile.font_family || 'font-inter');
      setLinks(fetchedProfile.links || []);
      setSocialIcons(fetchedProfile.social_icons || []);

    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile.');
    } finally {
      setLoading(false);
    }
  }, [router, API_URL, refreshAccessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaveChanges = useCallback(async (name?: string, bio?: string) => {
    console.log('handleSaveChanges called with name:', name, 'bio:', bio);
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    
    const currentName = name !== undefined ? name : profileName;
    const currentBio = bio !== undefined ? bio : profileBio;

    // Asegurar que name y bio nunca estén vacíos
    const safeName = currentName?.trim() || 'Mi Perfil';
    const safeBio = currentBio?.trim() || 'Mi biografía';

    formData.append('name', safeName);
    formData.append('bio', safeBio);
    // Avatar se maneja por separado en uploadAvatarDirectly()
    if (originalProfileSlug) formData.append('slug', originalProfileSlug); // Always send the original slug

    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));
    formData.append('social_icons', JSON.stringify(socialIcons));

    console.log('FormData before sending:');
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Save changes error:', errorData);
        throw new Error(errorData.detail || 'Failed to save changes.');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setLinks(updatedProfile.links || []);
      setSocialIcons(updatedProfile.social_icons || []);
      
      // Los estados locales se actualizan en las funciones específicas
      // Avatar se maneja por separado
      
    } catch (err: any) {
      setError(err.message || 'Failed to save changes.');
    }
  }, [profile, profileName, profileBio, profileAvatar, avatarChanged, links, socialIcons, API_URL]);

  const handleLinkAdd = async (linkType: string) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');
    const newLinkTitle = linkType === 'whatsapp' ? 'Whatsapp' : 'Nuevo Enlace';
    if (!newLinkTitle || newLinkTitle.trim() === '') {
      console.warn("Cannot add link with empty title.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/links/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          profile: profile.id,
          title: newLinkTitle,
          url: linkType === 'whatsapp' ? 'https://wa.me/' : 'https://example.com',
          type: linkType
        }),
      });
      if (!response.ok) throw new Error('Failed to add link.');
      const newLink = await response.json();
      setLinks(prev => [...prev, newLink]);
    } catch (err: any) {
      setError(err.message || 'Failed to add link.');
    }
  };

  const handleLinkUpdate = async (linkId: number, title: string, url: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!title || title.trim() === '') {
      setLinks(prev => prev.map(l => l.id === linkId ? { ...l, title, url } : l));
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/links/${linkId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, url }),
      });
      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) await handleLinkUpdate(linkId, title, url);
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update link.');
      }
      setLinks(prev => prev.map(l => l.id === linkId ? { ...l, title, url } : l));
    } catch (err: any) {
      setError(err.message || 'Failed to update link.');
    }
  };
  
  const debouncedLinkUpdate = useCallback(debounce(handleLinkUpdate, 500), [refreshAccessToken]);

  const handleLinkDelete = async (linkId: number) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/links/${linkId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) await handleLinkDelete(linkId);
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete link.');
      }
      setLinks(prev => prev.filter(link => link.id !== linkId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete link.');
    }
  };

  const handleLinkChange = (id: number, field: 'title' | 'url', value: string) => {
    const updatedLinks = links.map(link => link.id === id ? { ...link, [field]: value } : link);
    setLinks(updatedLinks);
    const linkToUpdate = updatedLinks.find(l => l.id === id);
    if (linkToUpdate) {
      debouncedLinkUpdate(id, linkToUpdate.title, linkToUpdate.url);
    }
  };

  const handleReorderLinks = async (newOrder: LinkData[]) => {
    setLinks(newOrder);
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/links/reorder/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newOrder.map((link, index) => ({ id: link.id, order: index }))),
      });
      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) await handleReorderLinks(newOrder);
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to reorder links.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reorder links.');
    }
  };

  const handleUpdateSlug = async (newSlug: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ slug: newSlug }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.slug || 'Failed to update slug.');
      }
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
    } catch (err: any) {
      setError(err.message);
      alert(`Error al actualizar la URL: ${err.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to delete account.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('Cuenta eliminada exitosamente.');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
      alert(`Error al eliminar la cuenta: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/');
  };

  const handleSaveProfileName = async (newValue: string) => {
    console.log('handleSaveProfileName called with:', newValue);
    // Si el nombre está vacío, usar un valor por defecto
    const finalName = newValue.trim() || 'Mi Perfil';
    console.log('Final name to save:', finalName);
    
    // Actualizar inmediatamente el estado local
    setProfileName(finalName);
    
    try {
      await handleSaveChanges(finalName, undefined);
    } catch (error) {
      console.error('Error saving name:', error);
      // En caso de error, revertir al valor original
      setProfileName(profile?.name || 'Mi Perfil');
    }
  };

  const handleSaveProfileBio = async (newValue: string) => {
    console.log('handleSaveProfileBio called with:', newValue);
    // Si la bio está vacía, usar un valor por defecto
    const finalBio = newValue.trim() || 'Mi biografía';
    console.log('Final bio to save:', finalBio);
    
    // Actualizar inmediatamente el estado local
    setProfileBio(finalBio);
    
    try {
      await handleSaveChanges(undefined, finalBio);
    } catch (error) {
      console.error('Error saving bio:', error);
      // En caso de error, revertir al valor original
      setProfileBio(profile?.bio || 'Mi biografía');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log('handleAvatarChange called with file:', file);
    
    if (file) {
      try {
        setAvatarUploading(true);
        setProfileAvatar(file);
        
        // Enviar inmediatamente sin depender del estado del useCallback
        await uploadAvatarDirectly(file);
        console.log('Avatar uploaded successfully');
      } catch (error) {
        console.error('Error uploading avatar:', error);
        setError('Error al subir la imagen. Por favor, intenta de nuevo.');
      } finally {
        setAvatarUploading(false);
      }
    }
  };

  const uploadAvatarDirectly = async (avatarFile: File) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');
    
    const formData = new FormData();
    formData.append('name', profileName);
    formData.append('bio', profileBio);
    formData.append('avatar', avatarFile); // Usar directamente el archivo
    if (originalProfileSlug) formData.append('slug', originalProfileSlug);
    
    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));
    formData.append('social_icons', JSON.stringify(socialIcons));

    console.log('Avatar FormData before sending:');
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Avatar upload error:', errorData);
      throw new Error(errorData.detail || 'Failed to upload avatar.');
    }

    const updatedProfile = await response.json();
    setProfile(updatedProfile);
    setLinks(updatedProfile.links || []);
    setSocialIcons(updatedProfile.social_icons || []);
    setProfileAvatar(null); // Limpiar después del éxito
  };

  const handleCoverUpload = async (coverFile: File) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');
    
    const formData = new FormData();
    formData.append('name', profileName);
    formData.append('bio', profileBio);
    formData.append('cover_image', coverFile);
    if (originalProfileSlug) formData.append('slug', originalProfileSlug);
    
    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));
    formData.append('social_icons', JSON.stringify(socialIcons));

    try {
      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload cover image.');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setLinks(updatedProfile.links || []);
      setSocialIcons(updatedProfile.social_icons || []);
    } catch (error) {
      console.error('Cover upload error:', error);
      setError('Error al subir la imagen de portada.');
    }
  };

  const handleCoverDelete = async () => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');
    
    const formData = new FormData();
    formData.append('name', profileName);
    formData.append('bio', profileBio);
    formData.append('cover_image', ''); // Enviar cadena vacía para eliminar
    if (originalProfileSlug) formData.append('slug', originalProfileSlug);
    
    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));
    formData.append('social_icons', JSON.stringify(socialIcons));

    try {
      const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete cover image.');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setLinks(updatedProfile.links || []);
      setSocialIcons(updatedProfile.social_icons || []);
    } catch (error) {
      console.error('Cover delete error:', error);
      setError('Error al eliminar la imagen de portada.');
    }
  };

  const saveWithSocialIcons = async (socialIconsToSave: SocialIconData[]) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    
    const safeName = profileName?.trim() || 'Mi Perfil';
    const safeBio = profileBio?.trim() || 'Mi biografía';

    formData.append('name', safeName);
    formData.append('bio', safeBio);
    if (originalProfileSlug) formData.append('slug', originalProfileSlug);

    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));
    formData.append('social_icons', JSON.stringify(socialIconsToSave));

    const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Save social icons error:', errorData);
      throw new Error(errorData.detail || 'Failed to save social icons.');
    }

    const updatedProfile = await response.json();
    setProfile(updatedProfile);
    setLinks(updatedProfile.links || []);
    setSocialIcons(updatedProfile.social_icons || []);
  };

  const handleAddSocialIcon = async (socialType: string, username: string, url: string) => {
    const newSocialIcon: SocialIconData = {
      social_type: socialType,
      username: username,
      url: url,
      order: socialIcons.length,
    };
    
    const updatedSocialIcons = [...socialIcons, newSocialIcon];
    setSocialIcons(updatedSocialIcons);
    
    // Save immediately to backend with updated social icons
    try {
      await saveWithSocialIcons(updatedSocialIcons);
    } catch (error) {
      console.error('Error saving social icon:', error);
      // Revert on error
      setSocialIcons(socialIcons);
    }
  };

  const handleDeleteSocialIcon = async (socialType: string) => {
    const updatedSocialIcons = socialIcons.filter(icon => icon.social_type !== socialType);
    setSocialIcons(updatedSocialIcons);
    
    // Save immediately to backend with updated social icons
    try {
      await saveWithSocialIcons(updatedSocialIcons);
    } catch (error) {
      console.error('Error deleting social icon:', error);
      // Revert on error
      setSocialIcons(socialIcons);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p>Loading dashboard...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-red-500">Error: {error}</p></div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <section id="profile-section" className="mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  {/* Cover Image */}
                  <div className="relative w-full mb-6">
                    {profile?.cover_image ? (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        <Image
                          src={profile.cover_image}
                          alt="Cover"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Añade una imagen de portada</span>
                      </div>
                    )}
                    
                    {/* Botón de compartir - Esquina superior derecha */}
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="absolute top-3 right-3 bg-[#ffce2f] hover:bg-[#e6b829] text-gray-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-lg font-medium text-sm flex items-center gap-2"
                    >
                      <Flame size={16} className="text-orange-600" />
                      <span className="hidden sm:inline">Compartir mi enlace</span>
                      <span className="sm:hidden">Compartir</span>
                    </button>
                    
                    {/* Botón de editar portada */}
                    <button
                      onClick={() => setIsCoverModalOpen(true)}
                      className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-transform duration-200 hover:scale-110"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-6 -mt-20">
                    <Image
                      src={profileAvatar ? URL.createObjectURL(profileAvatar) : profile?.avatar || '/default-avatar.png'}
                      alt={profileName || 'Avatar'}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label htmlFor="profileAvatar" className={`absolute -bottom-2 -right-2 ${avatarUploading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white p-2 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${avatarUploading ? 'animate-pulse' : ''}`}>
                      {avatarUploading ? (
                        <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <User size={18} />
                      )}
                      <input
                        type="file"
                        id="profileAvatar"
                        accept="image/*"
                        className="hidden"
                        disabled={avatarUploading}
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>

                  <div className="mb-4 w-full max-w-sm">
                    <InlineEditableField
                      value={profileName}
                      onSave={handleSaveProfileName}
                      placeholder="Tu Nombre"
                      className="text-2xl font-bold text-center text-gray-900"
                    />
                  </div>
                  <div className="w-full max-w-md">
                    <InlineEditableField
                      value={profileBio}
                      onSave={handleSaveProfileBio}
                      placeholder="Tu biografía increíble aquí."
                      isTextarea
                      className="text-center text-gray-600"
                    />
                  </div>

                  {/* Social Icons Section */}
                  <div className="mt-6 w-full max-w-md">
                    {socialIcons.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-3 mb-4">
                        {socialIcons.map((icon) => (
                          <div key={icon.social_type} className="relative group">
                            <a
                              href={icon.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 flex items-center justify-center transition-colors"
                            >
                              <div className="w-6 h-6 flex items-center justify-center">
                                {getSocialIcon(icon.social_type, 20, 'text-gray-700')}
                              </div>
                            </a>
                            <button
                              onClick={() => handleDeleteSocialIcon(icon.social_type)}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <button
                      onClick={() => setIsSocialIconModalOpen(true)}
                      className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">+</span>
                      <span>Añadir icono social</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <LinkManager
              links={links}
              handleLinkChange={handleLinkChange}
              addLink={() => setIsLinkTypeModalOpen(true)}
              removeLink={handleLinkDelete}
              onReorderLinks={handleReorderLinks}
            />
          </>
        );
      case 'design':
        return (
          <DesignCustomizer
            profileData={{
              theme,
              custom_gradient_start: customGradientStart,
              custom_gradient_end: customGradientEnd,
              background_image: backgroundImage || profile?.background_image,
              background_preference: backgroundPreference,
              image_overlay: imageOverlay,
              button_style: buttonStyle,
              button_color: buttonColor,
              button_text_color: buttonTextColor,
              button_text_opacity: buttonTextColorOpacity,
              button_background_opacity: buttonBackgroundOpacity,
              button_border_color: buttonBorderColor,
              button_border_opacity: buttonBorderOpacity,
              button_shadow_color: buttonShadowColor,
              button_shadow_opacity: buttonShadowOpacity,
              font_family: fontFamily,
            }}
            updateProfileData={(newData) => {
              if (newData.theme !== undefined) setTheme(newData.theme);
              if (newData.custom_gradient_start !== undefined) setCustomGradientStart(newData.custom_gradient_start);
              if (newData.custom_gradient_end !== undefined) setCustomGradientEnd(newData.custom_gradient_end);
              if (newData.background_image !== undefined) setBackgroundImage(newData.background_image);
              if (newData.background_preference !== undefined) setBackgroundPreference(newData.background_preference);
              if (newData.image_overlay !== undefined) setImageOverlay(newData.image_overlay);
              if (newData.button_style !== undefined) setButtonStyle(newData.button_style);
              if (newData.button_color !== undefined) setButtonColor(newData.button_color);
              if (newData.button_text_color !== undefined) setButtonTextColor(newData.button_text_color);
              if (newData.button_text_opacity !== undefined) setButtonTextColorOpacity(newData.button_text_opacity);
              if (newData.button_background_opacity !== undefined) setButtonBackgroundOpacity(newData.button_background_opacity);
              if (newData.button_border_color !== undefined) setButtonBorderColor(newData.button_border_color);
              if (newData.button_border_opacity !== undefined) setButtonBorderOpacity(newData.button_border_opacity);
              if (newData.button_shadow_color !== undefined) setButtonShadowColor(newData.button_shadow_color);
              if (newData.button_shadow_opacity !== undefined) setButtonShadowOpacity(newData.button_shadow_opacity);
              if (newData.font_family !== undefined) setFontFamily(newData.font_family);
            }}
            setBackgroundImageFile={setBackgroundImage}
          />
        );
      case 'settings':
        return (
          <Settings
            currentSlug={profile?.slug || ''}
            onUpdateSlug={handleUpdateSlug}
            onDeleteAccount={handleDeleteAccount}
            onLogout={handleLogout}
          />
        );
      case 'stats':
        return <Analytics />;
      case 'notifications':
        return <PushNotificationsDashboard className="mb-8" />;
      default:
        return <p>Selecciona una sección</p>;
    }
  };

  const NavLink = ({ tabId, children, icon: Icon }: { tabId: string, children: React.ReactNode, icon: React.ElementType }) => (
    <li>
      <button
        onClick={() => {
          setActiveTab(tabId);
          if (isSidebarOpen) setIsSidebarOpen(false);
        }}
        className={`flex items-center w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${activeTab === tabId ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      >
        <Icon className="mr-3" size={20} />
        {children}
      </button>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col`}>
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">TuLink</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-300 hover:text-white">
                <X size={24} />
            </button>
        </div>
        <nav className="flex-1 space-y-2">
          <ul>
            <NavLink tabId="profile" icon={User}>{t('nav.profile')}</NavLink>
            <NavLink tabId="design" icon={Palette}>{t('nav.design')}</NavLink>
            <NavLink tabId="stats" icon={BarChart2}>{t('nav.stats')}</NavLink>
            <NavLink tabId="notifications" icon={Bell}>{t('nav.notifications')}</NavLink>
            <NavLink tabId="settings" icon={SettingsIcon}>{t('nav.settings')}</NavLink>
          </ul>
        </nav>
        
        {/* Language Selector for Desktop */}
        <div className="hidden md:block p-4 border-t border-gray-700">
          <LanguageSelector />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold md:hidden">{t(`nav.${activeTab}`)}</h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector compact />
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-gray-800 md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-md text-gray-900">
              {renderContent()}
            </div>
            
            <div className="hidden lg:block w-full lg:w-1/3">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Vista Previa</h2>
                <LivePreview
                  profileData={{
                    name: profileName,
                    bio: profileBio,
                    avatar: profileAvatar ? URL.createObjectURL(profileAvatar) : profile?.avatar || '',
                    cover_image: profile?.cover_image || '',
                    slug: profile?.slug || 'preview',
                    links: links,
                    social_icons: socialIcons,
                    theme: theme,
                    custom_gradient_start: customGradientStart,
                    custom_gradient_end: customGradientEnd,
                    background_image: backgroundPreference === 'image' ? (backgroundImage || profile?.background_image) : undefined,
                    background_preference: backgroundPreference,
                    image_overlay: imageOverlay,
                    button_style: buttonStyle,
                    button_color: buttonColor,
                    button_text_color: buttonTextColor,
                    button_text_opacity: buttonTextColorOpacity,
                    button_background_opacity: buttonBackgroundOpacity,
                    button_border_color: buttonBorderColor,
                    button_border_opacity: buttonBorderOpacity,
                    button_shadow_color: buttonShadowColor,
                    button_shadow_opacity: buttonShadowOpacity,
                    font_family: fontFamily,
                  } as import('@/app/utils/styleUtils').ProfileData}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <LinkTypeSelectionModal isOpen={isLinkTypeModalOpen} onClose={() => setIsLinkTypeModalOpen(false)} onSelectType={handleLinkAdd} />
      {profile?.slug && <ShareLinkModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} currentSlug={profile.slug} onUpdateSlug={handleUpdateSlug} />}
      <CoverImageModal 
        isOpen={isCoverModalOpen} 
        onClose={() => setIsCoverModalOpen(false)} 
        currentCover={profile?.cover_image}
        onUpload={handleCoverUpload}
        onDelete={handleCoverDelete}
      />
      <SocialIconModal
        isOpen={isSocialIconModalOpen}
        onClose={() => setIsSocialIconModalOpen(false)}
        onAddIcon={handleAddSocialIcon}
      />
    </div>
  );
}