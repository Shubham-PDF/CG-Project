
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
  
  // References for animations
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  
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
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.3;
      torusRef.current.rotation.y += delta * 0.1;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x -= delta * 0.15;
      boxRef.current.rotation.y -= delta * 0.25;
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
        return gouraudMaterialRef.current || 
          new THREE.MeshLambertMaterial({ 
            color: "#6495ED",
            flatShading: false
          });
      case 'basic':
      default:
        return new THREE.MeshBasicMaterial({ 
          color: "#6495ED", 
          wireframe: false 
        });
    }
  };

  const material = getMaterial();

  return (
    <group>
      {/* Sphere - Best for showing specular highlights */}
      <mesh ref={sphereRef} position={[-2.5, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={material instanceof THREE.Material ? material.clone() : material} />
      </mesh>
      
      {/* Torus - Complex curves to show shading variations */}
      <mesh ref={torusRef} position={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.8, 0.3, 30, 100]} />
        <primitive object={material instanceof THREE.Material ? material.clone() : material} />
      </mesh>
      
      {/* Box - Sharp edges to show shading differences */}
      <mesh ref={boxRef} position={[2.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <primitive object={material instanceof THREE.Material ? material.clone() : material} />
      </mesh>
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
}
