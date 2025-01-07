import React from "react";

const Trees: React.FC = () => {
  return (
    <>
      <mesh position={[100, 5, -100]} castShadow>
        <cylinderGeometry args={[5, 5, 50, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[100, 30, -100]} castShadow>
        <sphereGeometry args={[25, 16, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      <mesh position={[-150, 5, 150]} castShadow>
        <cylinderGeometry args={[5, 5, 50, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-150, 30, 150]} castShadow>
        <sphereGeometry args={[25, 16, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </>
  );
};

export default Trees;