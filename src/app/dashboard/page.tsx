'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { debounce } from 'lodash';
import { 
  Menu, 
  X, 
  User, 
  Palette, 
  BarChart2, 
  Settings as SettingsIcon, 
  Save, 
  Share2, 
  Flame, 
  Bell,
  Home,
  Eye,
  ExternalLink,
  Copy,
  Edit3,
  Plus,
  Trash2,
  Upload,
  Camera,
  LogOut,
  ChevronDown,
  Star,
  TrendingUp,
  Users as UsersIcon,
  Link as LinkIcon,
  Smartphone,
  Globe,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

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
  
  // Estados para feedback de guardado
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

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
    setSaveStatus('saving');
    
    // Si el nombre está vacío, usar un valor por defecto
    const finalName = newValue.trim() || 'Mi Perfil';
    console.log('Final name to save:', finalName);
    
    // Actualizar inmediatamente el estado local
    setProfileName(finalName);
    
    try {
      await handleSaveChanges(finalName, undefined);
      setSaveStatus('saved');
      setLastSaved(new Date());
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving name:', error);
      setSaveStatus('error');
      // En caso de error, revertir al valor original
      setProfileName(profile?.name || 'Mi Perfil');
      
      // Reset error status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSaveProfileBio = async (newValue: string) => {
    console.log('handleSaveProfileBio called with:', newValue);
    setSaveStatus('saving');
    
    // Si la bio está vacía, usar un valor por defecto
    const finalBio = newValue.trim() || 'Mi biografía';
    console.log('Final bio to save:', finalBio);
    
    // Actualizar inmediatamente el estado local
    setProfileBio(finalBio);
    
    try {
      await handleSaveChanges(undefined, finalBio);
      setSaveStatus('saved');
      setLastSaved(new Date());
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving bio:', error);
      setSaveStatus('error');
      // En caso de error, revertir al valor original
      setProfileBio(profile?.bio || 'Mi biografía');
      
      // Reset error status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
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

  // Validate social icon data
  const validateSocialIcon = (icon: SocialIconData): boolean => {
    if (!icon.social_type || !icon.username || !icon.url) {
      console.error('Invalid social icon data:', icon);
      return false;
    }
    
    // Validate URL format
    try {
      new URL(icon.url);
    } catch (e) {
      console.error('Invalid URL in social icon:', icon.url);
      return false;
    }
    
    return true;
  };

  const saveWithSocialIcons = async (socialIconsToSave: SocialIconData[]) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    // Validate all social icons before sending
    const validIcons = socialIconsToSave.filter(validateSocialIcon);
    if (validIcons.length !== socialIconsToSave.length) {
      console.warn('Some social icons were invalid and filtered out');
    }

    const formData = new FormData();
    
    const safeName = profileName?.trim() || 'Mi Perfil';
    const safeBio = profileBio?.trim() || 'Mi biografía';

    formData.append('name', safeName);
    formData.append('bio', safeBio);
    if (originalProfileSlug) formData.append('slug', originalProfileSlug);

    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));
    
    // Debug logging for social icons
    console.log('Social icons to save:', validIcons);
    formData.append('social_icons', JSON.stringify(validIcons));

    const response = await fetch(`${API_URL}/api/linkinbio/profiles/me/`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to save social icons.';
      try {
        const errorData = await response.json();
        console.error('Save social icons error:', errorData);
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (parseError) {
        // If response is not JSON (e.g., HTML error page), get the status text
        console.error('Server returned non-JSON response:', response.status, response.statusText);
        errorMessage = `Server error (${response.status}): ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const updatedProfile = await response.json();
    setProfile(updatedProfile);
    setLinks(updatedProfile.links || []);
    setSocialIcons(updatedProfile.social_icons || []);
  };

  const handleAddSocialIcon = async (socialType: string, username: string, url: string) => {
    console.log('Adding social icon:', { socialType, username, url });
    
    const newSocialIcon: SocialIconData = {
      social_type: socialType,
      username: username,
      url: url,
      order: socialIcons.length, // This will be overridden if replacing
    };
    
    console.log('New social icon data:', newSocialIcon);
    
    // Check if an icon of this type already exists
    const existingIconIndex = socialIcons.findIndex(icon => icon.social_type === socialType);
    
    let updatedSocialIcons: SocialIconData[];
    if (existingIconIndex !== -1) {
      console.log('Replacing existing icon at index:', existingIconIndex);
      // Replace existing icon
      updatedSocialIcons = [...socialIcons];
      updatedSocialIcons[existingIconIndex] = {
        ...newSocialIcon,
        id: socialIcons[existingIconIndex].id, // Keep the original id
        order: socialIcons[existingIconIndex].order // Keep the original order
      };
    } else {
      console.log('Adding new icon');
      // Add new icon
      updatedSocialIcons = [...socialIcons, newSocialIcon];
    }
    
    console.log('Updated social icons array:', updatedSocialIcons);
    
    setSocialIcons(updatedSocialIcons);
    
    // Save immediately to backend with updated social icons
    try {
      await saveWithSocialIcons(updatedSocialIcons);
    } catch (error) {
      console.error('Error saving social icon:', error);
      // Revert on error
      setSocialIcons(socialIcons);
      
      // Show user-friendly error message
      setError(`Error al guardar ${socialType}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('dashboard.loading')}</h2>
          <p className="text-gray-600">{t('dashboard.loadingDesc')}</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('dashboard.error')}</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('dashboard.retry')}
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <section id="profile-section" className="mb-8">
              <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50/30 p-8 rounded-2xl border border-gray-200/50 shadow-xl backdrop-blur-sm"  style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 50%, rgba(239,246,255,0.95) 100%)'
              }}>
                <div className="flex flex-col items-center text-center">
                  {/* Cover Image */}
                  <div className="relative w-full mb-6">
                    {profile?.cover_image ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg group">
                        <Image
                          src={profile.cover_image}
                          alt="Cover"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 group cursor-pointer">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-gray-600 text-sm font-medium">Añade una imagen de portada</span>
                          <p className="text-gray-400 text-xs mt-1">Haz clic para personalizar tu perfil</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Botón de compartir - Esquina superior derecha */}
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg font-medium text-sm flex items-center gap-2 backdrop-blur-sm"
                    >
                      <Flame size={16} className="text-white drop-shadow-sm" />
                      <span className="hidden sm:inline drop-shadow-sm">Compartir mi enlace</span>
                      <span className="sm:hidden drop-shadow-sm">Compartir</span>
                    </button>
                    
                    {/* Botón de editar portada */}
                    <button
                      onClick={() => setIsCoverModalOpen(true)}
                      className="absolute -bottom-3 -right-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg group"
                    >
                      <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-6 -mt-20 group">
                    <div className="relative">
                      {/* Avatar container with enhanced effects */}
                      <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-white p-1">
                          <Image
                            src={profileAvatar ? URL.createObjectURL(profileAvatar) : profile?.avatar || '/default-avatar.png'}
                            alt={profileName || 'Avatar'}
                            width={140}
                            height={140}
                            className="w-full h-full rounded-full object-cover transition-all duration-300 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      {/* Enhanced upload button */}
                      <label htmlFor="profileAvatar" className={`absolute -bottom-1 -right-1 ${
                        avatarUploading 
                          ? 'bg-gradient-to-r from-gray-400 to-gray-500' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                      } text-white p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg group/btn ${
                        avatarUploading ? 'animate-pulse scale-110' : ''
                      }`}>
                        {avatarUploading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Upload className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
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
                      
                      {/* Status indicator (online) */}
                      <div className="absolute bottom-2 right-8 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 w-full max-w-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <InlineEditableField
                        value={profileName}
                        onSave={handleSaveProfileName}
                        placeholder="Tu Nombre"
                        className="text-2xl font-bold text-center text-gray-900"
                        maxLength={50}
                        showCharacterCount={true}
                        validation={{
                          required: true,
                          minLength: 2,
                          customValidator: (value) => {
                            if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
                            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) return 'Solo se permiten letras y espacios';
                            return null;
                          }
                        }}
                      />
                      
                      {/* Badges de estado */}
                      <div className="flex gap-1">
                        {/* Badge verificado (simulado - puedes conectar con datos reales) */}
                        <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Verificado
                        </div>
                        
                        {/* Badge premium (simulado) */}
                        <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium rounded-full shadow-sm">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Pro
                        </div>
                      </div>
                    </div>
                    
                    {/* Estadísticas rápidas */}
                    <div className="flex justify-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">1.2k</span>
                        <span>vistas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span className="font-medium">{socialIcons.length}</span>
                        <span>redes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LinkIcon className="w-4 h-4" />
                        <span className="font-medium">{links.length}</span>
                        <span>enlaces</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-md">
                    <InlineEditableField
                      value={profileBio}
                      onSave={handleSaveProfileBio}
                      placeholder="Tu biografía increíble aquí."
                      isTextarea
                      className="text-center text-gray-600"
                      maxLength={160}
                      showCharacterCount={true}
                      validation={{
                        minLength: 10,
                        customValidator: (value) => {
                          if (value.trim().length > 0 && value.trim().length < 10) {
                            return 'La biografía debe tener al menos 10 caracteres';
                          }
                          return null;
                        }
                      }}
                    />
                  </div>

                  {/* Social Icons Section */}
                  <div className="mt-6 w-full max-w-md">
                    {socialIcons.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-3 mb-4">
                        {socialIcons.map((icon, index) => (
                          <div key={`${icon.social_type}-${index}`} className="relative group" style={{ animationDelay: `${index * 100}ms` }}>
                            <a
                              href={icon.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group-hover:rotate-3"
                            >
                              <div className="w-7 h-7 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                                {getSocialIcon(icon.social_type, 24, 'text-gray-700 group-hover:text-blue-600')}
                              </div>
                            </a>
                            <button
                              onClick={() => handleDeleteSocialIcon(icon.social_type)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <button
                      onClick={() => setIsSocialIconModalOpen(true)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
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

  const NavLink = ({ tabId, children, icon: Icon, badge }: { tabId: string, children: React.ReactNode, icon: React.ElementType, badge?: number }) => (
    <li>
      <button
        onClick={() => {
          setActiveTab(tabId);
          if (isSidebarOpen) setIsSidebarOpen(false);
        }}
        className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-xl transition-all duration-200 group ${
          activeTab === tabId 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-102'
        }`}
      >
        <div className="flex items-center">
          <Icon className="mr-3" size={20} />
          {children}
        </div>
        {badge && badge > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </button>
    </li>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col shadow-2xl`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EnlacePro
              </h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* User Profile Summary */}
          <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={profileAvatar ? URL.createObjectURL(profileAvatar) : profile?.avatar || '/default-avatar.png'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{profileName || 'Tu Nombre'}</p>
                <p className="text-gray-300 text-sm truncate">{profile?.slug || 'tu-enlace'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            <NavLink tabId="profile" icon={User}>{t('nav.profile')}</NavLink>
            <NavLink tabId="design" icon={Palette}>{t('nav.design')}</NavLink>
            <NavLink tabId="stats" icon={BarChart2}>{t('nav.stats')}</NavLink>
            <NavLink tabId="notifications" icon={Bell} badge={0}>{t('nav.notifications')}</NavLink>
            <NavLink tabId="settings" icon={SettingsIcon}>{t('nav.settings')}</NavLink>
          </ul>
          
          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-4">
              {t('dashboard.quickActions')}
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center w-full text-left py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
              >
                <ExternalLink className="mr-3" size={16} />
                {t('dashboard.viewPage')}
              </button>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center w-full text-left py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
              >
                <Share2 className="mr-3" size={16} />
                {t('dashboard.sharePage')}
              </button>
            </div>
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="hidden md:block mb-4">
            <LanguageSelector />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left py-2 px-3 rounded-lg text-red-300 hover:bg-red-600/20 hover:text-red-200 transition-colors text-sm"
          >
            <LogOut className="mr-3" size={16} />
            {t('dashboard.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 md:hidden transition-colors"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {t(`dashboard.${activeTab}Title`)}
                </h1>
                <p className="text-gray-600 text-sm hidden md:block">
                  {t(`dashboard.${activeTab}Desc`)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{links.length}</div>
                  <div className="text-gray-600">{t('dashboard.links')}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{socialIcons.length}</div>
                  <div className="text-gray-600">{t('dashboard.socials')}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">●</div>
                  <div className="text-gray-600">{t('dashboard.online')}</div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* Save Status Indicator */}
                {saveStatus !== 'idle' && (
                  <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    saveStatus === 'saving' 
                      ? 'bg-blue-100 text-blue-700' 
                      : saveStatus === 'saved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {saveStatus === 'saving' && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                    {saveStatus === 'saved' && <Check className="w-4 h-4 mr-1" />}
                    {saveStatus === 'error' && <AlertCircle className="w-4 h-4 mr-1" />}
                    <span className="hidden sm:inline">
                      {saveStatus === 'saving' && 'Guardando...'}
                      {saveStatus === 'saved' && 'Guardado'}
                      {saveStatus === 'error' && 'Error al guardar'}
                    </span>
                    <span className="sm:hidden">
                      {saveStatus === 'saving' && '...'}
                      {saveStatus === 'saved' && '✓'}
                      {saveStatus === 'error' && '!'}
                    </span>
                  </div>
                )}
                
                <LanguageSelector compact />
                
                <button
                  onClick={() => window.open(`/${profile?.slug}`, '_blank')}
                  className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{t('dashboard.preview')}</span>
                </button>
                
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg text-sm font-medium"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{t('dashboard.share')}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-6 md:p-8">
                  {renderContent()}
                </div>
              </div>
            </div>
            
            {/* Live Preview Sidebar */}
            <div className="hidden xl:block w-80">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-5 h-5" />
                        <h2 className="font-semibold">{t('dashboard.livePreview')}</h2>
                      </div>
                      <button
                        onClick={() => window.open(`/${profile?.slug}`, '_blank')}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50">
                    <div className="transform scale-90 origin-top">
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
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('dashboard.lastUpdated')}</span>
                      <div className="flex items-center gap-2">
                        {saveStatus === 'saving' && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
                        {saveStatus === 'saved' && <Check className="w-3 h-3 text-green-500" />}
                        {saveStatus === 'error' && <AlertCircle className="w-3 h-3 text-red-500" />}
                        <span className="text-gray-900 font-medium">
                          {lastSaved 
                            ? lastSaved.toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                second: '2-digit'
                              })
                            : t('dashboard.justNow')
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Modals */}
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