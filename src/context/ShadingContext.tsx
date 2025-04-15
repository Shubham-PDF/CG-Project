
import { createContext, useState, ReactNode } from 'react';

// Define the type for the context values
type ShadingContextType = {
  shadingMode: 'phong' | 'gouraud' | 'basic';
  setShadingMode: (mode: 'phong' | 'gouraud' | 'basic') => void;
  lightPosition: [number, number, number];
  setLightPosition: (position: [number, number, number]) => void;
  lightIntensity: number;
  setLightIntensity: (intensity: number) => void;
  lightColor: string;
  setLightColor: (color: string) => void;
  ambientIntensity: number;
  setAmbientIntensity: (intensity: number) => void;
  showStats: boolean;
  setShowStats: (show: boolean) => void;
  shininess: number;
  setShininess: (shininess: number) => void;
};

// Create the context with default values
export const ShadingContext = createContext<ShadingContextType>({
  shadingMode: 'phong',
  setShadingMode: () => {},
  lightPosition: [3, 3, 3],
  setLightPosition: () => {},
  lightIntensity: 1.0,
  setLightIntensity: () => {},
  lightColor: '#ffffff',
  setLightColor: () => {},
  ambientIntensity: 0.3,
  setAmbientIntensity: () => {},
  showStats: false,
  setShowStats: () => {},
  shininess: 100,
  setShininess: () => {},
});

type ShadingProviderProps = {
  children: ReactNode;
};

export const ShadingProvider = ({ children }: ShadingProviderProps) => {
  const [shadingMode, setShadingMode] = useState<'phong' | 'gouraud' | 'basic'>('phong');
  const [lightPosition, setLightPosition] = useState<[number, number, number]>([3, 3, 3]);
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [lightColor, setLightColor] = useState('#ffffff');
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [showStats, setShowStats] = useState(false);
  const [shininess, setShininess] = useState(100);

  return (
    <ShadingContext.Provider 
      value={{
        shadingMode,
        setShadingMode,
        lightPosition,
        setLightPosition,
        lightIntensity,
        setLightIntensity,
        lightColor,
        setLightColor,
        ambientIntensity,
        setAmbientIntensity,
        showStats,
        setShowStats,
        shininess,
        setShininess
      }}
    >
      {children}
    </ShadingContext.Provider>
  );
};
