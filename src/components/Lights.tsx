
import { useContext } from 'react';
import { ShadingContext } from '../context/ShadingContext';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Lights() {
  const { 
    lightPosition, 
    lightIntensity, 
    lightColor,
    ambientIntensity,
    shadingMode
  } = useContext(ShadingContext);
  
  // Create a reference for the directional light
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  
  // Show light helper in development (but not for basic shading)
  useHelper(
    shadingMode !== 'basic' ? directionalLightRef : null, 
    THREE.DirectionalLightHelper, 
    0.5, 
    lightColor
  );

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={ambientIntensity} />
      
      {/* Directional light as the main light source */}
      <directionalLight
        ref={directionalLightRef}
        position={lightPosition}
        intensity={lightIntensity}
        color={lightColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Small hemisphere light for more natural lighting */}
      <hemisphereLight intensity={0.1} color="#eaeaea" groundColor="#000000" />
      
      {/* Visualize light position with a small sphere */}
      <mesh position={lightPosition}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={lightColor} />
      </mesh>
    </>
  );
}
