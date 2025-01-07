import { useFrame, useThree } from "@react-three/fiber";

const CameraController: React.FC<{ spiderPosition: React.MutableRefObject<[number, number, number]> }> = ({
  spiderPosition,
}) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.lerp(
      { x: spiderPosition.current[0] + 100, y: 100, z: spiderPosition.current[2] + 100 },
      0.1
    );
    camera.lookAt(spiderPosition.current[0], 0, spiderPosition.current[2]);
  });

  return null;
};

export default CameraController;
