/* eslint-disable no-irregular-whitespace */
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Spider: React.FC<{ onPositionChange?: (position: [number, number, number]) => void }> = ({
  onPositionChange,
}) => {
  const { scene, animations } = useGLTF("/ghost-spider.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isMoving, setIsMoving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const speed = 2; // Distance parcourue à chaque mouvement
  const jumpHeight = 2; // Hauteur du saut
  const jumpDuration = 500; // Durée du saut en millisecondes

  useEffect(() => {
    if (actions) {
      const idleAction = actions["ST_Ent_GhostSpider|Anim_GhostSpider_Victory_Idle|Base Layer"];
      if (idleAction) {
        idleAction.reset().play(); // Jouer l'animation Idle par défaut
      }
    }
  }, [actions]);

  useEffect(() => {
    console.log("Animations", animations.map((anim) => anim.name));
  }, [animations]);

  useFrame((_, delta) => {
    mixer.update(delta); // Mettre à jour les animations
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isJumping) return; // Pas d'autres actions pendant le saut

      setIsMoving(true);

      // Déplacer le personnage
      setPosition((prev) => {
        let newPosition: [number, number, number] = [...prev];
        switch (event.key) {
          case "ArrowUp":
          case "w":
            newPosition = [prev[0], prev[1], prev[2] - speed];
            break;
          case "ArrowDown":
          case "s":
            newPosition = [prev[0], prev[1], prev[2] + speed];
            break;
          case "ArrowLeft":
          case "a":
            newPosition = [prev[0] - speed, prev[1], prev[2]];
            break;
          case "ArrowRight":
          case "d":
            newPosition = [prev[0] + speed, prev[1], prev[2]];
            break;
          case "c":
            // Gestion du saut
            { setIsJumping(true);
            const jumpAction = actions["Snc_SpinOn"];
            if (jumpAction) {
              jumpAction.reset().play();
            }

            // Effectuer le saut
            setPosition((prev) => [prev[0], prev[1] + jumpHeight, prev[2]]);
            setTimeout(() => {
              setPosition((prev) => [prev[0], prev[1] - jumpHeight, prev[2]]);
              setIsJumping(false);

              // Revenir à Idle ou Run après le saut
              if (isMoving && actions["Snc_Run"]) {
                actions["Snc_Run"].reset().play();
              } else if (actions["Snc_BossIdle"]) {
                actions["Snc_BossIdle"].reset().play();
              }
            }, jumpDuration);
            return prev; }
        }

        // Mettre à jour l'animation de course si déplacement
        if (!isJumping && actions["Snc_Run"]) {
          actions["Snc_Run"].reset().play();
        }

        if (onPositionChange) onPositionChange(newPosition);
        return newPosition;
      });
    };

    const handleKeyUp = () => {
      setIsMoving(false);

      // Arrêter l'animation de course et revenir à Idle
      const runAction = actions["Snc_Run"];
      const idleAction = actions["Snc_BossIdle"];
      if (runAction) {
        runAction.stop();
      }
      if (!isJumping && idleAction) {
        idleAction.reset().play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onPositionChange, actions, position, isJumping, isMoving]);

  return <primitive object={scene} position={[position[0], position[1] - 5, position[2]]} scale={[10, 10, 10]} />;
};

export default Spider;


/*
0: "Snc_BossIdle"
​
1: "Snc_BossRecoil"
​
2: "Snc_BossToBank"
​
3: "Snc_Dance1_SwipeLeft"
​
4: "Snc_Dance2_SwipeUp"
​
5: "Snc_Dance3_SwipeRight"
​
6: "Snc_Dance4_SwipeDown"
​
7: "Snc_Dash"
​
8: "Snc_Death1"
​
9: "Snc_Death3"
​
10: "Snc_DeathFall"
​
11: "Snc_HopLeft"
​
12: "Snc_HopRight"
​
13: "Snc_Run"
​
14: "Snc_SpinIn"
​
15: "Snc_SpinOut"
​
16: "Snc_SpringBossGlide"
​
17: "Snc_SpringFall"

18: "Snc_SpringFallBank"

19: "Snc_SpringGlide"

20: "Snc_SpringGlideBank"

21: "Snc_SpringLand"

22: "Snc_SpringLaunchBankLoop"

23: "Snc_SpringLaunchBankToGlide"
​
24: "Snc_SpringLaunchBoss"
​
25: "Snc_SpringLaunchLoop"
​
26: "Snc_SpringLaunchToGlide"
​
27: "Snc_Stumble1"

*/