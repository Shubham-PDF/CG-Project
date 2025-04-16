
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import ShaderObjects from './ShaderObjects';
import Lights from './Lights';
import { useContext } from 'react';
import { ShadingContext } from '../context/ShadingContext';

export default function Scene() {
  const { showStats } = useContext(ShadingContext);
  
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#222']} />
        <Lights />
        <ShaderObjects />
        <OrbitControls enableDamping dampingFactor={0.05} />
        {showStats && <Stats />}
      </Canvas>
    </div>
  );
}
