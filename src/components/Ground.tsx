import React from "react";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Texture } from "three";

const Ground: React.FC = () => {
  const groundTexture = useTexture("/textures/ground/textures/ground_diff_4k.jpg");

  // Améliorer la texture : répétition et anisotropie
  if (groundTexture instanceof Texture) {
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(50, 50); // Ajuster la répétition (50x50 par défaut)
    groundTexture.anisotropy = 16; // Améliorer la qualité des textures sur les angles
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial map={groundTexture} roughness={0.8} metalness={0} />
    </mesh>
  );
};

export default Ground;
