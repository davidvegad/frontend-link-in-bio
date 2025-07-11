'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LivePreview from '@/app/components/LivePreview';
import DesignCustomizer from '@/app/components/DesignCustomizer';
import LinkManager from '@/app/components/LinkManager';
import Settings from '@/app/components/Settings';
import Analytics from '@/app/components/Analytics';
import LinkTypeSelectionModal from '@/app/components/LinkTypeSelectionModal'; // Añadir esta importación
import ShareLinkModal from '@/app/components/ShareLinkModal';
import { debounce } from 'lodash';

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

  // States for form fields
  const [profileName, setProfileName] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileAvatar, setProfileAvatar] = useState<File | null>(null);
  
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

  const handleSaveChanges = async () => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    
    // Append profile data
    formData.append('name', profileName);
    formData.append('bio', profileBio);
    if (profileAvatar) formData.append('avatar', profileAvatar);

    // Filter out links with empty titles before saving profile
    const linksToSave = links.filter(link => link.title && link.title.trim() !== '');
    formData.append('links', JSON.stringify(linksToSave));

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
      // Re-initialize states with potentially updated data from the server
      setLinks(updatedProfile.links || []);
      
      setProfileAvatar(null);
      alert('Cambios guardados exitosamente!');
    } catch (err: any) {
      setError(err.message || 'Failed to save changes.');
    }
  };

  const handleLinkAdd = async (linkType: string) => {
    if (!profile) return;
    const accessToken = localStorage.getItem('accessToken');

    // If title is empty, do not add the link
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
          url: linkType === 'whatsapp' ? 'https://wa.me/' : 'https://example.com', // Provide a default valid URL
          type: linkType // Usar el tipo de enlace seleccionado
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
    console.log("handleLinkUpdate in DashboardPage called with:", { linkId, title, url }); // DEBUG
    const accessToken = localStorage.getItem('accessToken');
    console.log("Updating link:", { linkId, title, url, accessToken: accessToken ? "Exists" : "Missing" }); // DEBUG

    // If title is empty, do not send update to backend, just update local state
    if (!title || title.trim() === '') {
      console.log("Title is empty, not persisting link update for link:", linkId);
      setLinks(prev => prev.map(l => l.id === linkId ? { ...l, title, url } : l)); // Update local state
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
        console.warn("Token expired, attempting refresh..."); // DEBUG
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          console.log("Token refreshed, retrying update..."); // DEBUG
          await handleLinkUpdate(linkId, title, url); // Retry with new token
        }
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update link:', errorData);
        throw new Error(errorData.detail || 'Failed to update link.');
      }
      // Optionally refresh data or update state locally
      setLinks(prev => prev.map(l => l.id === linkId ? { ...l, title, url } : l));
      console.log("Link updated successfully."); // DEBUG
    } catch (err: any) {
      setError(err.message || 'Failed to update link.');
      console.error("Error in handleLinkUpdate:", err);
    }
  };
  
  const debouncedLinkUpdate = useCallback(debounce(handleLinkUpdate, 500), []);

  const handleLinkDelete = async (linkId: number) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("Attempting to delete link:", { linkId, accessToken: accessToken ? "Exists" : "Missing" }); // DEBUG
    try {
      const response = await fetch(`${API_URL}/api/linkinbio/links/${linkId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (response.status === 401) {
        console.warn("Token expired during delete, attempting refresh..."); // DEBUG
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          console.log("Token refreshed, retrying delete..."); // DEBUG
          await handleLinkDelete(linkId); // Retry with new token
        }
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete link:', errorData);
        throw new Error(errorData.detail || 'Failed to delete link.');
      }
      setLinks(prev => prev.filter(link => link.id !== linkId));
      console.log("Link deleted successfully."); // DEBUG
    } catch (err: any) {
      setError(err.message || 'Failed to delete link.');
      console.error("Error in handleLinkDelete:", err); // DEBUG
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
        if (refreshed) {
          await handleReorderLinks(newOrder); // Retry with new token
        }
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to reorder links:', errorData);
        throw new Error(errorData.detail || 'Failed to reorder links.');
      }
      console.log('Links reordered successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to reorder links.');
      console.error("Error in handleReorderLinks:", err);
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
      alert('URL actualizada exitosamente!');
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
      if (!response.ok) {
        throw new Error('Failed to delete account.');
      }
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p>Loading dashboard...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-red-500">Error: {error}</p></div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <section id="profile-section" className="mb-8 pb-6">
              <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>
              {profile && (
                <div className="relative flex flex-col items-center mb-4">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center mb-4">
                      <div className="relative mb-2">
                          {profile.avatar && (
                              <Image
                                  src={profileAvatar ? URL.createObjectURL(profileAvatar) : profile.avatar}
                                  alt={profile.name}
                                  width={128}
                                  height={128}
                                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                              />
                          )}
                          <input
                              type="file"
                              id="profileAvatar"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => setProfileAvatar(e.target.files ? e.target.files[0] : null)}
                          />
                      </div>
                      <label htmlFor="profileAvatar" className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 text-sm">
                          Cambiar Imagen
                      </label>
                  </div>


                  {/* Name Section */}
                  <div className="flex items-center mb-2 w-full max-w-xs mx-auto">
                    <input
                      type="text"
                      id="profileName"
                      className="flex-grow text-xl font-bold text-center border-b-2 border-gray-300 focus:border-indigo-500 outline-none bg-transparent"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                    <button onClick={() => document.getElementById('profileName')?.focus()} className="ml-2 text-gray-500 hover:text-indigo-600 p-2 rounded-full transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                  </div>

                  {/* Share Link Button */}
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Compartir mi enlace
                  </button>

                  {/* Bio Section */}
                  <div className="flex items-start mb-6 w-full max-w-md mx-auto">
                    <textarea
                      id="profileBio"
                      className="flex-grow text-gray-600 text-center border-b-2 border-gray-300 focus:border-indigo-500 outline-none resize-none bg-transparent"
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      rows={3}
                    ></textarea>
                    <button onClick={() => document.getElementById('profileBio')?.focus()} className="ml-2 text-gray-500 hover:text-indigo-600 p-2 rounded-full transition-colors duration-200 self-start mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                  </div>
                </div>
              )}
            </section>

            <LinkManager
              links={links}
              handleLinkChange={handleLinkChange}
              addLink={() => setIsLinkTypeModalOpen(true)} // Modificado para abrir el modal
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
              background_image: backgroundImage || profile?.background_image, // Use local File if present, else use URL from fetched profile
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
      // Add cases for 'stats' and 'settings' when they are built
      default:
        return <p>Selecciona una sección</p>;
    }
  };

  const NavLink = ({ tabId, children }: { tabId: string, children: React.ReactNode }) => (
    <li className="mb-2">
      <button
        onClick={() => setActiveTab(tabId)}
        className={`block w-full text-left py-2 px-4 rounded ${activeTab === tabId ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
      >
        {children}
      </button>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold mb-6">Mi Link</div>
        <nav className="flex-1">
          <ul>
            <NavLink tabId="profile">Perfil</NavLink>
            <NavLink tabId="design">Diseño</NavLink>
            <NavLink tabId="stats">Estadísticas</NavLink>
            <NavLink tabId="settings">Ajustes</NavLink>
          </ul>
        </nav>
        <button
          onClick={handleSaveChanges}
          className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Guardar Cambios
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar (empty for web-only for now) */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 flex gap-8">
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
            {renderContent()}
          </div>
          
          {/* Live Preview Column */}
          <div className="w-1/3">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold mb-4 text-center">Vista Previa</h2>
              {profile?.slug && (
            <LivePreview
              profileSlug={profile.slug}
              name={profileName}
              bio={profileBio}
              avatar={profileAvatar ? URL.createObjectURL(profileAvatar) : profile.avatar}
              links={links}
              button_style={buttonStyle}
              button_color={buttonColor}
              button_text_color={buttonTextColor}
              button_text_opacity={buttonTextColorOpacity}
              button_background_opacity={buttonBackgroundOpacity}
              button_border_color={buttonBorderColor}
              button_border_opacity={buttonBorderOpacity}
              button_shadow_color={buttonShadowColor}
              button_shadow_opacity={buttonShadowOpacity}
              theme={theme}
              custom_gradient_start={customGradientStart}
              custom_gradient_end={customGradientEnd}
              background_image={backgroundPreference === 'image' ? (backgroundImage ? URL.createObjectURL(backgroundImage) : profile.background_image) : null}
              image_overlay={imageOverlay}
              font_family={fontFamily}
            />
          )}
            </div>
          </div>
        </main>
      </div>
    <LinkTypeSelectionModal
        isOpen={isLinkTypeModalOpen}
        onClose={() => setIsLinkTypeModalOpen(false)}
        onSelectType={handleLinkAdd} // Pasar handleLinkAdd como callback
      />

      {profile?.slug && (
        <ShareLinkModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          currentSlug={profile.slug}
          onUpdateSlug={handleUpdateSlug}
        />
      )}
    </div>
  );
}