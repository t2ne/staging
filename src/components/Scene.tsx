import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

const INITIAL_CAMERA_POSITION = [8, 4, 8] as const;
const ZOOM_MIN = 12;
const ZOOM_MAX = 15;

function Sign({ position, onClick, text }: { position: [number, number, number], onClick: () => void, text: string }) {
  return (
    <group position={position} onClick={onClick}>
      <Box args={[1, 0.5, 0.1]}>
        <meshStandardMaterial color="#ff0066" />
      </Box>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

export function Scene({ onSectionClick, currentSection, isTransitioning }: { 
  onSectionClick: (section: string) => void,
  currentSection: string | null,
  isTransitioning: boolean
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(...INITIAL_CAMERA_POSITION));
  const initialRotation = useRef<THREE.Euler | null>(null);

  useEffect(() => {
    if (!initialRotation.current) {
      initialRotation.current = camera.rotation.clone();
    }
  }, [camera]);

  useFrame((state, delta) => {
    if (isTransitioning) {
      camera.position.lerp(targetPosition.current, delta * 2);
      
      if (currentSection === null && initialRotation.current) {
        const currentRotation = new THREE.Euler().setFromQuaternion(camera.quaternion);
        currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, initialRotation.current.x, delta * 2);
        currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, initialRotation.current.y, delta * 2);
        currentRotation.z = THREE.MathUtils.lerp(currentRotation.z, initialRotation.current.z, delta * 2);
        camera.rotation.copy(currentRotation);
      }
    }
  });

  const handleSignClick = (section: string) => {
    const signPositions = {
      'projects': [-2, 1.5, 1],
      'about': [2, 1.5, 1]
    };
    
    if (section in signPositions) {
      const [x, y, z] = signPositions[section];
      targetPosition.current.set(x + 2, y + 1, z + 2);
      onSectionClick(section);
    }
  };

  return (
    <>
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        minDistance={ZOOM_MIN}
        maxDistance={ZOOM_MAX}
        enabled={!isTransitioning}
      />
      <Environment preset="night" />
      
      <group ref={groupRef} position={[0, -1, 0]}>
        {/* Main building */}
        <Box args={[4, 2.5, 3]} position={[0, 1.25, 0]}>
          <meshStandardMaterial color="#2a2a2a" />
        </Box>
        
        {/* Traditional Japanese roof */}
        <Box args={[5, 0.2, 4]} position={[0, 2.6, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        
        {/* Entrance */}
        <Box args={[1.5, 2, 0.1]} position={[0, 1, 1.55]}>
          <meshStandardMaterial color="#4a3f35" />
        </Box>
        
        {/* Counter */}
        <Box args={[3, 0.8, 0.6]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#654321" />
        </Box>
        
        {/* Stools */}
        {[-1, 0, 1].map((x, i) => (
          <Box key={i} args={[0.4, 0.5, 0.4]} position={[x, 0.25, 0.8]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
        ))}
        
        {/* Interactive signs */}
        <Sign position={[-2, 1.5, 1]} onClick={() => handleSignClick('projects')} text="Projects" />
        <Sign position={[2, 1.5, 1]} onClick={() => handleSignClick('about')} text="About" />
        
        {/* Ground */}
        <Box args={[15, 0.1, 15]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        
        {/* Neon lights */}
        <pointLight position={[0, 2, 1.6]} color="#ff0066" intensity={2} />
        <pointLight position={[-2, 2, 1.6]} color="#00ff66" intensity={1} />
        <pointLight position={[2, 2, 1.6]} color="#0066ff" intensity={1} />
      </group>
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Street lamps */}
      <pointLight position={[-4, 3, 4]} color="#ffaa44" intensity={0.8} />
      <pointLight position={[4, 3, -4]} color="#ffaa44" intensity={0.8} />
      
      {/* Moon light */}
      <directionalLight position={[5, 5, -5]} intensity={0.3} color="#b4c7e6" />
    </>
  );
}