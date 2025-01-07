import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Spider } from "./components/Spider";
import Ground from "./components/Ground";
// import Mountains from "./components/Mountains";
import Rocks from "./components/Rocks";
import Trees from "./components/Trees";
import River from "./components/River";
// import CameraController from "./components/CameraController";

const App: React.FC = () => {
  const spiderPosition = useRef<[number, number, number]>([0, 0, 0]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [100, 100, 100], fov: 50 }} style={{ background: "#87CEEB" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[200, 500, 200]} intensity={1.2} castShadow />

        {/* Composants de la scène */}
        <Ground />
        <Rocks />
        {/* <Mountains /> */}
        <Trees />
        <River />
        <Spider
          onPositionChange={(position: [number, number, number]) => {
            spiderPosition.current = position;
          }}
        />

        {/* Contrôleur de caméra
        <CameraController spiderPosition={spiderPosition} /> */}

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;