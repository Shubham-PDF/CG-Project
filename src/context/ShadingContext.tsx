import { createContext, useState, ReactNode } from 'react';

// Define the type for the context values
type ShadingContextType = {
  shadingMode: 'phong' | 'gouraud';
  setShadingMode: (mode: 'phong' | 'gouraud') => void;
  lightPosition: [number, number, number];
  lightIntensity: number;
  lightColor: string;
  ambientIntensity: number;
  shininess: number;
};

// Create the context with default values
export const ShadingContext = createContext<ShadingContextType>({
  shadingMode: 'phong',
  setShadingMode: () => {},
  lightPosition: [3, 3, 3],
  lightIntensity: 1.0,
  lightColor: '#ffffff',
  ambientIntensity: 0.3,
  shininess: 100,
});

type ShadingProviderProps = {
  children: ReactNode;
};

export const ShadingProvider = ({ children }: ShadingProviderProps) => {
  const [shadingMode, setShadingMode] = useState<'phong' | 'gouraud'>('phong');
  // Keep default values for lighting parameters but don't expose UI controls
  const lightPosition: [number, number, number] = [3, 3, 3];
  const lightIntensity = 1.0;
  const lightColor = '#ffffff';
  const ambientIntensity = 0.3;
  const shininess = 100;

  return (
    <ShadingContext.Provider 
      value={{
        shadingMode,
        setShadingMode,
        lightPosition,
        lightIntensity,
        lightColor,
        ambientIntensity,
        shininess
      }}
    >
      {children}
    </ShadingContext.Provider>
  );
};
