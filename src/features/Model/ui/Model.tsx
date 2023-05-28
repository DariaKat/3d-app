import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import { FC } from "react";
import { Container } from "./Model.styled";
import { IResult } from "features/Form";

interface IProps {
  getResult: IResult;
}

interface IPropsPlane {
  rotation: number[];
}

function Plane(props: IPropsPlane) {
  const [ref] = usePlane(() => ({ type: "Static", ...props }));
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[0, 0]} />
      <meshStandardMaterial color="#ffb385" />
    </mesh>
  );
}

export const Model: FC<IProps> = ({ getResult }) => {
  console.log(getResult);
  return (
    <Container id="canvas-container">
      <Canvas flat linear>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Physics iterations={6}>
          <Debug scale={1} color="black">
            <Plane rotation={[-Math.PI / 2, 0, 0]} />
            <mesh position={[0, 1.5, 0]} receiveShadow castShadow>
              <boxGeometry args={[5, 3, 1]} />
              <meshStandardMaterial color={"orange"} />
            </mesh>
          </Debug>
        </Physics>
        <OrbitControls />
      </Canvas>
    </Container>
  );
};
