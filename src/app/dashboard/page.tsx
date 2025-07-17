'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { debounce } from 'lodash';
import { Menu, X, User, Palette, BarChart2, Settings as SettingsIcon, Save, Share2 } from 'lucide-react';

import LivePreview from '../components/LivePreview';
import DesignCustomizer from '../components/DesignCustomizer';
import LinkManager from '../components/LinkManager';
import Settings from '../components/Settings';
import Analytics from '../components/Analytics';
import LinkTypeSelectionModal from '../components/LinkTypeSelectionModal';
import ShareLinkModal from '../components/ShareLinkModal';
import EditableField from '../components/EditableField';

// Interfaces
interface LinkData {
  id: number;
  title: string;
  url: string;
  type?: string;
  order?: number;
}

interface ProfileData {
  id: number;
  user?: string;
  name: string;
  bio: string;
  avatar: string;
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
}

// Main Component
export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States for form fields
  const [profileName, setProfileName] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileAvatar, setProfileAvatar] = useState<File | null>(null);
  const [originalProfileSlug, setOriginalProfileSlug] = useState('');
  
  // Design states
  const [theme, setTheme] = useState('');
  const [customGradientStart, setCustomGradientStart] = useState('');
  const [customGradientEnd, setCustomGradientEnd] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
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
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [isLinkTypeModalOpen, setIsLinkTypeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const saveDesignChanges = useCallback(async (currentDesignStates: any) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('theme', currentDesignStates.theme);
    formData.append('custom_gradient_start', currentDesignStates.customGradientStart);
    formData.append('custom_gradient_end', currentDesignStates.customGradientEnd);
    
    if (currentDesignStates.backgroundPreference === 'color') {
      formData.append('background_image', ''); 
    } else if (currentDesignStates.backgroundImage) {
      formData.append('background_image', currentDesignStates.backgroundImage);
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

    try {
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

    formData.append('name', currentName);
    formData.append('bio', currentBio);
    if (profileAvatar) formData.append('avatar', profileAvatar);
    if (originalProfileSlug) formData.append('slug', originalProfileSlug); // Always send the original slug

    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));

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
      
      setProfileAvatar(null);
      
    } catch (err: any) {
      setError(err.message || 'Failed to save changes.');
    }
  }, [profile, profileName, profileBio, profileAvatar, links, API_URL]);

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
    setProfileName(newValue);
    await handleSaveChanges();
  };

  const handleSaveProfileBio = async (newValue: string) => {
    console.log('handleSaveProfileBio called with:', newValue);
    setProfileBio(newValue);
    await handleSaveChanges();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p>Loading dashboard...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-red-500">Error: {error}</p></div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <section id="profile-section" className="mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={profileAvatar ? URL.createObjectURL(profileAvatar) : profile?.avatar || '/default-avatar.png'}
                    alt={profileName || 'Avatar'}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label htmlFor="profileAvatar" className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-transform duration-200 hover:scale-110">
                    <User size={18} />
                    <input
                      type="file"
                      id="profileAvatar"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setProfileAvatar(e.target.files ? e.target.files[0] : null)}
                    />
                  </label>
                </div>

                <EditableField
                  id="profileName"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  onSave={handleSaveProfileName}
                  placeholder="Tu Nombre"
                  className="text-2xl font-bold text-center text-gray-900"
                  label="nombre"
                />
                <EditableField
                  id="profileBio"
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  onSave={handleSaveProfileBio}
                  placeholder="Tu biografía increíble aquí."
                  isTextarea
                  className="text-center text-gray-900 mt-2"
                  label="biografía"
                />

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="mt-6 inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  <Share2 size={18} className="mr-2" />
                  Compartir
                </button>
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
            <NavLink tabId="profile" icon={User}>Perfil</NavLink>
            <NavLink tabId="design" icon={Palette}>Diseño</NavLink>
            <NavLink tabId="stats" icon={BarChart2}>Estadísticas</NavLink>
            <NavLink tabId="settings" icon={SettingsIcon}>Ajustes</NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-gray-800">
            <Menu size={24} />
          </button>
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
                    slug: profile?.slug || 'preview',
                    links: links,
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
    </div>
  );
}