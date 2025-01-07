import React from "react";
import { useTexture } from "@react-three/drei";

const Ground: React.FC = () => {
  const groundTexture = useTexture("/textures/ground/textures/ground_diff_4k.jpg");

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial map={groundTexture} />
      </mesh>
    </>
  );
};

export default Ground;
