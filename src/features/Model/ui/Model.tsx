import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import { FC } from "react";
import { Container } from "./Model.styled";
import { IResult } from "features/Form";
import FireModal from "./FireModal";

interface IProps {
  getResult: IResult;
}

interface IPropsPlane {
  rotation: number[];
}

interface ILayer {
  temp: number[];
  index: number;
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

function Layer(props: ILayer) {
  console.log(props.temp);

  return (
    <mesh position={[0, 1.5, props.index * 0.2]} receiveShadow castShadow>
      <boxGeometry args={[5, 3, 0.2]} />
      <meshStandardMaterial color={`#CD5151`} />
    </mesh>
  );
}

export const Model: FC<IProps> = ({ getResult }) => {
  console.log(getResult);
  return (
    <Container id="canvas-container">
      <Canvas flat linear camera={{ position: [-15, 10, 15], fov: 25 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Physics iterations={6}>
          <Debug scale={1} color="black">
            <Plane rotation={[-Math.PI / 2, 0, 0]} />
            {getResult && (
              <>
                <FireModal
                  position={[0, 1.3, getResult.tlayer?.length * 0.25]}
                />

                {getResult.tlayer.map((item, index) => (
                  <Layer key={index} temp={item} index={index} />
                ))}
              </>
            )}
          </Debug>
        </Physics>
        <OrbitControls />
        {/* <Stats /> */}
      </Canvas>
    </Container>
  );
};
