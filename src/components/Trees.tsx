import React from "react";

// Composant pour un arbre individuel
const Tree: React.FC<{ position: [number, number, number]; trunkHeight?: number; crownSize?: number }> = ({
  position,
  trunkHeight = 50,
  crownSize = 25,
}) => {
  return (
    <>
      {/* Tronc de l'arbre */}
      <mesh position={[position[0], position[1] + trunkHeight / 2, position[2]]} castShadow receiveShadow>
        <cylinderGeometry args={[5, 5, trunkHeight, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Feuillage de l'arbre */}
      <mesh position={[position[0], position[1] + trunkHeight + crownSize / 2, position[2]]} castShadow receiveShadow>
        <sphereGeometry args={[crownSize, 16, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </>
  );
};

// Composant pour la forêt
const Trees: React.FC = () => {
  return (
    <>
      <Tree position={[100, 0, -100]} trunkHeight={50} crownSize={25} />
      <Tree position={[-150, 0, 150]} trunkHeight={60} crownSize={30} />
      <Tree position={[50, 0, 50]} trunkHeight={40} crownSize={20} />
      <Tree position={[-100, 0, -50]} trunkHeight={55} crownSize={28} />
      <Tree position={[0, 0, 200]} trunkHeight={70} crownSize={35} />
    </>
  );
};

export default Trees;
