import React from "react";
import { useTexture } from "@react-three/drei";

const Rocks: React.FC = () => {
  const rockTexture = useTexture("/textures/rock/textures/rock_diff_4k.jpg");

  return (
    <>
      <mesh position={[50, 1.5, 50]} castShadow>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial map={rockTexture} />
      </mesh>

      <mesh position={[-50, 1.5, -75]} castShadow>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial map={rockTexture} />
      </mesh>
    </>
  );
};

export default Rocks;