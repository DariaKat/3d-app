import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, Debug, usePlane } from "@react-three/cannon";
import { FC, useState } from "react";
import { Slider } from "antd";
import { Container, Time } from "./Model.styled";
import { IResult } from "features/Form";
import FireModal from "./FireModal";
import { converTemtToNumber } from "shared/lib/convertTempToColor";

interface IProps {
  getResult: IResult;
}

interface IPropsPlane {
  rotation: number[];
}

interface ILayer {
  temp: number[];
  index: number;
  value: number;
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
  return (
    <mesh position={[0, 1.5, props.index * 0.2]} receiveShadow castShadow>
      <boxGeometry args={[5, 3, 0.2]} />
      <meshStandardMaterial
        color={converTemtToNumber(props.value, props.temp)}
      />
    </mesh>
  );
}

export const Model: FC<IProps> = ({ getResult }) => {
  const [value, setValue] = useState(getResult.tmn[0]);

  return (
    <Container id="canvas-container">
      <Time>
        Время:{" "}
        <Slider
          style={{ width: "100%", marginLeft: "15px" }}
          min={0}
          max={getResult.time[getResult.time.length - 1]}
          step={getResult.interval}
          onChange={(value: number) => setValue(getResult.time.indexOf(value))}
        />
      </Time>
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
                  position={[0, 1.3, -getResult.tlayer?.length * 0.25]}
                />

                {getResult.tlayer.map((item, index) => (
                  <Layer key={index} temp={item} index={index} value={value} />
                ))}
              </>
            )}
          </Debug>
        </Physics>
        <OrbitControls />
      </Canvas>
    </Container>
  );
};
