import React from "react";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Texture } from "three";

const Mountains: React.FC = () => {
  const stoneTexture = useTexture("/textures/rock/textures/rock_diff_4k.jpg");

  // Améliorer la texture : répétition et anisotropie
  if (stoneTexture instanceof Texture) {
    stoneTexture.wrapS = RepeatWrapping;
    stoneTexture.wrapT = RepeatWrapping;
    stoneTexture.repeat.set(5, 5); // Ajuster la répétition
    stoneTexture.anisotropy = 16; // Améliorer la qualité de la texture
  }

  return (
    <>
      {/* Première montagne */}
      <mesh position={[-100, 50, -100]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[50, 100, 4]} />
        <meshStandardMaterial map={stoneTexture} roughness={1} metalness={0} />
      </mesh>

      {/* Deuxième montagne */}
      <mesh position={[150, 75, 150]} rotation={[0, Math.PI / 6, 0]} castShadow receiveShadow>
        <coneGeometry args={[75, 150, 6]} />
        <meshStandardMaterial map={stoneTexture} roughness={1} metalness={0} />
      </mesh>

      {/* Troisième montagne */}
      <mesh position={[0, 60, -200]} rotation={[0, Math.PI / 3, 0]} castShadow receiveShadow>
        <coneGeometry args={[60, 120, 5]} />
        <meshStandardMaterial map={stoneTexture} roughness={1} metalness={0} />
      </mesh>
    </>
  );
};

export default Mountains;
