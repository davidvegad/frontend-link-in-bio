'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define la estructura de los datos del perfil
interface ProfileData {
  profile_type?: string;
  purpose?: string;
  template_style?: string;
  name?: string;
  bio?: string;
  avatar?: File | null;
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: File | null;
  background_preference?: 'image' | 'color';
  button_style?: string;
  button_color?: string;
  button_text_color?: string;
  social_links?: Record<string, string>;
  custom_links?: { id: number; title: string; url: string }[];
}

// Define la forma del contexto
interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (newData: Partial<ProfileData>) => void;
  submitProfile: () => Promise<void>;
  isLoaded: boolean; // Nuevo campo para indicar si los datos han sido cargados
}

// Crea el contexto
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Crea el Provider del contexto
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('welcomeProfileData');
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      }
      setIsLoaded(true);
    }
  }, []);

  const updateProfileData = (newData: Partial<ProfileData>) => {
    setProfileData(prevData => {
      const updatedData = { ...prevData, ...newData };
      if (typeof window !== 'undefined') {
        localStorage.setItem('welcomeProfileData', JSON.stringify(updatedData));
      }
      return updatedData;
    });
  };

  const submitProfile = async () => {
    console.log("Enviando datos a la API:", profileData);
    console.log("ProfileData antes de FormData:", profileData);

    const formData = new FormData();

    // Append text fields
    for (const key in profileData) {
      if (profileData.hasOwnProperty(key)) {
        const value = profileData[key as keyof ProfileData];
        // Excluir File objects y JSON fields que se manejan por separado
        if (value !== undefined && value !== null && !(value instanceof File) && key !== 'social_links' && key !== 'custom_links') {
          formData.append(key, String(value));
        }
      }
    }

    // Append files
    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar);
    }
    if (profileData.background_image) {
      formData.append('background_image', profileData.background_image);
    }

    // Append social links (convert to JSON string)
    if (profileData.social_links) {
      formData.append('social_links', JSON.stringify(profileData.social_links));
    }

    // Append custom links (convert to JSON string)
    if (profileData.custom_links) {
      formData.append('custom_links', JSON.stringify(profileData.custom_links));
    }

    // TODO: Get the actual user's profile ID. For now, we'll assume a placeholder or fetch it.
    // In a real app, you'd likely fetch the user's profile ID after login or from a global state.
    // For demonstration, let's assume a profile ID of '1' or that the backend handles creation/update based on user token.
    // If the profile doesn't exist, this would be a POST to /api/profiles/
    // If it exists, it's a PATCH to /api/profiles/{id}/

    // Placeholder for JWT token
    const token = localStorage.getItem('accessToken'); // Assuming JWT is stored here

    if (!token) {
      console.error("No JWT token found. User must be logged in.");
      alert("Debes iniciar sesión para guardar tu perfil.");
      return;
    }

    try {
      // This is a simplified example. In a real app, you'd get the profile ID from the user's session.
      // For now, let's assume we are updating the *current* user's profile, and the backend handles finding it.
      // If the backend expects a specific ID, you'd need to fetch it first.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/linkinbio/profiles/me/`, { // Assuming a 'me' endpoint or similar
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is NOT set here; fetch sets it automatically for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al guardar el perfil:", errorData);
        alert(`Error al guardar el perfil: ${JSON.stringify(errorData)}`);
        console.log("Respuesta completa del error:", response);
        return;
      }

      const result = await response.json();
      console.log("Perfil guardado exitosamente:", result);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('welcomeProfileData'); // Clear stored data after successful submission
      }      return Promise.resolve(); // Resolve the promise on success

    } catch (error) {
      console.error("Error de red o inesperado:", error);
      alert("Ocurrió un error inesperado al guardar el perfil.");
      return Promise.reject(error); // Reject the promise on error
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData, submitProfile, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile debe ser usado dentro de un ProfileProvider');
  }
  return context;
};
