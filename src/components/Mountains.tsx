import React from "react";
import { useTexture } from "@react-three/drei";

const Mountains: React.FC = () => {
  const stoneTexture = useTexture("/textures/rock/textures/rock_diff_4k.jpg");

  return (
    <>
      <mesh position={[-100, 50, -100]} castShadow receiveShadow>
        <coneGeometry args={[50, 100, 4]} />
        <meshStandardMaterial map={stoneTexture} />
      </mesh>

      <mesh position={[150, 75, 150]} castShadow receiveShadow>
        <coneGeometry args={[75, 150, 6]} />
        <meshStandardMaterial map={stoneTexture} />
      </mesh>
    </>
  );
};

export default Mountains;