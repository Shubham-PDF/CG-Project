
import { useContext, useEffect } from 'react';
import { ShadingContext } from '../context/ShadingContext';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { createCustomPhongMaterial, createCustomGouraudMaterial, updateShaderUniforms } from '@/utils/shaderUtils';

export default function ShaderObjects() {
  const { 
    shadingMode, 
    shininess,
    lightPosition,
    lightColor,
    lightIntensity,
    ambientIntensity
  } = useContext(ShadingContext);
  
  // Reference for animation
  const torusRef = useRef<THREE.Mesh>(null);
  
  // Material references
  const phongMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const gouraudMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  
  // Create materials once
  useEffect(() => {
    phongMaterialRef.current = createCustomPhongMaterial("#6495ED", shininess);
    gouraudMaterialRef.current = createCustomGouraudMaterial("#6495ED");
  }, []);
  
  // Update shader uniforms when parameters change
  useEffect(() => {
    if (phongMaterialRef.current) {
      updateShaderUniforms(
        phongMaterialRef.current, 
        lightPosition, 
        lightColor, 
        lightIntensity, 
        ambientIntensity,
        shininess
      );
    }
    
    if (gouraudMaterialRef.current) {
      updateShaderUniforms(
        gouraudMaterialRef.current, 
        lightPosition, 
        lightColor, 
        lightIntensity, 
        ambientIntensity
      );
    }
  }, [lightPosition, lightColor, lightIntensity, ambientIntensity, shininess]);
  
  // Animate objects
  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.3;
      torusRef.current.rotation.y += delta * 0.1;
    }
  });

  // Set material based on shading mode
  const getMaterial = () => {
    switch (shadingMode) {
      case 'phong':
        return phongMaterialRef.current || 
          new THREE.MeshPhongMaterial({ 
            color: "#6495ED", 
            shininess: shininess,
            flatShading: false
          });
      case 'gouraud':
      default:
        return gouraudMaterialRef.current || 
          new THREE.MeshLambertMaterial({ 
            color: "#6495ED",
            flatShading: false
          });
    }
  };

  const material = getMaterial();

  return (
    <group>
      {/* Torus - Good for showing shading variations */}
      <mesh ref={torusRef} position={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.5, 0.5, 16, 30]} />
        <primitive object={material instanceof THREE.Material ? material.clone() : material} />
      </mesh>
      
      {/* Simple ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}
