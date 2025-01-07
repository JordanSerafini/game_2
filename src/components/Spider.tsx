import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const Spider: React.FC<{ onPositionChange?: (position: [number, number, number]) => void }> = ({
  onPositionChange,
}) => {
  const { scene, animations } = useGLTF("/sonic.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  const speed = 10;

  useEffect(() => {
    // Vérifiez et jouez l'animation Idle par défaut
    if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Idle|Base Layer"]) {
      actions["ST_Ent_GhostSpider/Anim_GhostSpider_Idle|Base Layer"].reset().play();
    }
  }, [actions]);

  useFrame((_, delta) => {
    mixer.update(delta); // Mettre à jour le mixeur à chaque frame
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPosition((prev) => {
        const newPosition: [number, number, number] = (() => {
          switch (event.key) {
            case "ArrowUp":
              if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"]) {
                actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"].reset().play();
              }
              return [prev[0], prev[1], prev[2] - speed];
            case "ArrowDown":
              if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"]) {
                actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"].reset().play();
              }
              return [prev[0], prev[1], prev[2] + speed];
            case "ArrowLeft":
              if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"]) {
                actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"].reset().play();
              }
              return [prev[0] - speed, prev[1], prev[2]];
            case "ArrowRight":
              if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"]) {
                actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"].reset().play();
              }
              return [prev[0] + speed, prev[1], prev[2]];
            default:
              return prev;
          }
        })();

        if (onPositionChange) onPositionChange(newPosition);
        return newPosition;
      });
    };

    const handleKeyUp = () => {
      if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"]) {
        actions["ST_Ent_GhostSpider/Anim_GhostSpider_Basic_Webbed|Base Layer"].stop();
      }
      if (actions && actions["ST_Ent_GhostSpider/Anim_GhostSpider_Idle|Base Layer"]) {
        actions["ST_Ent_GhostSpider/Anim_GhostSpider_Idle|Base Layer"].reset().play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onPositionChange, actions]);

  return <primitive object={scene} position={position} scale={[10, 10, 10]} />;
};
