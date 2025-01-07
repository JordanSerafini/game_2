import React from "react";

const River: React.FC = () => {
  return (
    <mesh position={[0, -0.5, 0]}>
      <boxGeometry args={[500, 1, 50]} />
      <meshStandardMaterial color="#1E90FF" opacity={0.8} transparent />
    </mesh>
  );
};

export default River;
