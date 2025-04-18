
import { createContext, useState, ReactNode } from 'react';

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
  
  return (
    <ShadingContext.Provider 
      value={{
        shadingMode,
        setShadingMode,
        lightPosition: [3, 3, 3],
        lightIntensity: 1.0,
        lightColor: '#ffffff',
        ambientIntensity: 0.3,
        shininess: 100
      }}
    >
      {children}
    </ShadingContext.Provider>
  );
};
