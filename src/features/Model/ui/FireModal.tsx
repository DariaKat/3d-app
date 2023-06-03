import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

interface IProps {
  position: number[];
}

export default function FireModal({ position }: IProps) {
  const group = useRef();

  const { scene, animations }: any = useGLTF("/scene.gltf", true);
  const { actions, mixer, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].play();
  }, [mixer]);

  return (
    <primitive
      scale={[0.2, 0.2, 0.2]}
      position={position}
      ref={group}
      object={scene}
      dispose={null}
    />
  );
}

useGLTF.preload("/scene.gltf");
