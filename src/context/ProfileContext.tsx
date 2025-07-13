'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define la estructura para un enlace individual
interface Link {
  id?: number | string;
  title: string;
  url: string;
  type: string;
}

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
  links?: Link[]; // Campo unificado para todos los enlaces
}

// Define la forma del contexto
interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (newData: Partial<ProfileData>) => void;
  submitProfile: () => Promise<void>;
  isLoaded: boolean;
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

    const formData = new FormData();

    // Añadir campos de texto y otros datos
    for (const key in profileData) {
      if (Object.prototype.hasOwnProperty.call(profileData, key)) {
        const value = profileData[key as keyof ProfileData];
        
        // Excluir archivos y el array de enlaces, que se manejan por separado
        if (value !== undefined && value !== null && !(value instanceof File) && key !== 'links') {
          formData.append(key, String(value));
        }
      }
    }

    // Añadir archivos
    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar);
    }
    if (profileData.background_image) {
      formData.append('background_image', profileData.background_image);
    }

    // Añadir el array de enlaces unificado como una cadena JSON
    if (profileData.links) {
        const linksToSubmit = profileData.links.map(link => {
            if (typeof link.id === 'string') {
                // Remove temporary frontend IDs
                const { id, ...rest } = link;
                return rest;
            }
            return link;
        });
        formData.append('links', JSON.stringify(linksToSubmit));
    }

    // Debugging: Log FormData contents
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error("No se encontró el token JWT. El usuario debe iniciar sesión.");
      alert("Debes iniciar sesión para guardar tu perfil.");
      return Promise.reject("No token");
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/linkinbio/profiles/me/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al guardar el perfil:", errorData);
        alert(`Error al guardar el perfil: ${JSON.stringify(errorData)}`);
        return Promise.reject(errorData);
      }

      const result = await response.json();
      console.log("Perfil guardado exitosamente:", result);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('welcomeProfileData');
      }
      return Promise.resolve();

    } catch (error) {
      console.error("Error de red o inesperado:", error);
      alert("Ocurrió un error inesperado al guardar el perfil.");
      return Promise.reject(error);
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
