
import * as THREE from 'three';

// This function creates a custom shader material that implements Phong shading
export const createCustomPhongMaterial = (color: string | number, shininess: number) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      lightPosition: { value: new THREE.Vector3(3, 3, 3) },
      lightColor: { value: new THREE.Color(0xffffff) },
      lightIntensity: { value: 1.0 },
      ambientLight: { value: 0.3 },
      shininess: { value: shininess }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vNormal = normalMatrix * normal;
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform vec3 lightPosition;
      uniform vec3 lightColor;
      uniform float lightIntensity;
      uniform float ambientLight;
      uniform float shininess;
      
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        // Normalize the normal vector
        vec3 normal = normalize(vNormal);
        
        // Calculate light direction
        vec3 lightDir = normalize(lightPosition - vPosition);
        
        // Calculate the view direction
        vec3 viewDir = normalize(-vPosition);
        
        // Ambient component
        vec3 ambient = ambientLight * color;
        
        // Diffuse component (Lambert)
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = diff * lightColor * color * lightIntensity;
        
        // Specular component (Blinn-Phong)
        vec3 halfwayDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
        vec3 specular = spec * lightColor * lightIntensity;
        
        // Combine components
        vec3 finalColor = ambient + diffuse + specular;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  });
};

// This function creates a custom shader material that implements Gouraud shading
export const createCustomGouraudMaterial = (color: string | number) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      lightPosition: { value: new THREE.Vector3(3, 3, 3) },
      lightColor: { value: new THREE.Color(0xffffff) },
      lightIntensity: { value: 1.0 },
      ambientLight: { value: 0.3 }
    },
    vertexShader: `
      uniform vec3 color;
      uniform vec3 lightPosition;
      uniform vec3 lightColor;
      uniform float lightIntensity;
      uniform float ambientLight;
      
      varying vec3 vColor;

      void main() {
        // Transform vertex position and normal
        vec3 posWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        vec3 normalWorld = normalize(mat3(modelMatrix) * normal);
        
        // Calculate view position and light direction
        vec3 viewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        vec3 lightDir = normalize(lightPosition - posWorld);
        vec3 viewDir = normalize(-viewPosition);
        
        // Ambient component
        vec3 ambient = ambientLight * color;
        
        // Diffuse component (Lambert)
        float diff = max(dot(normalWorld, lightDir), 0.0);
        vec3 diffuse = diff * lightColor * color * lightIntensity;
        
        // Specular component (much less pronounced in Gouraud)
        vec3 halfwayDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normalWorld, halfwayDir), 0.0), 16.0); // Fixed lower shininess
        vec3 specular = spec * lightColor * 0.5 * lightIntensity; // Reduced specular intensity
        
        // Compute color at the vertex (will be interpolated across the face)
        vColor = ambient + diffuse + specular;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        // Just use the interpolated color from vertex shader
        gl_FragColor = vec4(vColor, 1.0);
      }
    `
  });
};

// Update shader uniforms with new lighting parameters
export const updateShaderUniforms = (
  material: THREE.ShaderMaterial, 
  lightPosition: [number, number, number], 
  lightColor: string,
  lightIntensity: number,
  ambientIntensity: number,
  shininess?: number
) => {
  if (material.uniforms) {
    material.uniforms.lightPosition.value = new THREE.Vector3(...lightPosition);
    material.uniforms.lightColor.value = new THREE.Color(lightColor);
    material.uniforms.lightIntensity.value = lightIntensity;
    material.uniforms.ambientLight.value = ambientIntensity;
    
    if (shininess !== undefined && material.uniforms.shininess) {
      material.uniforms.shininess.value = shininess;
    }
  }
};
