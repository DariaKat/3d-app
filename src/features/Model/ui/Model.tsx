import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FC } from "react";
import { Container } from "./Model.styled";
import { IResult } from "features/Form";

interface IProps {
  getResult: IResult;
}

export const Model: FC<IProps> = ({ getResult }) => {
  console.log(getResult);
  return (
    <Container id="canvas-container">
      <Canvas flat linear>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </Container>
  );
};
