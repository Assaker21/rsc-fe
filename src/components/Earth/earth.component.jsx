import { Canvas, useLoader } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  useTexture,
  useCubeTexture,
} from "@react-three/drei";
import { TextureLoader } from "three";

import "./earth.component.scss";

export default function Earth() {
  const [texture_1, texture_2, texture_3, texture_4, texture_5, texture_6] =
    useLoader(TextureLoader, [
      "cubeTextures/right.jpg",
      "cubeTextures/left.jpg",
      "cubeTextures/top.jpg",
      "cubeTextures/bottom.jpg",
      "cubeTextures/front.jpg",
      "cubeTextures/back.jpg",
    ]);

  const texture = useTexture("earth-texture.jpg");

  return (
    <>
      <ambientLight intensity={3} />

      {/*<mesh position={[0, 0, 0]} scale={[1.41, 1.41, 1.41]}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial map={texture_1} attach="material-0" />
        <meshStandardMaterial map={texture_2} attach="material-1" />
        <meshStandardMaterial map={texture_3} attach="material-2" />
        <meshStandardMaterial map={texture_4} attach="material-3" />
        <meshStandardMaterial map={texture_5} attach="material-4" />
        <meshStandardMaterial map={texture_6} attach="material-5" />
  </mesh>*/}

      <mesh position={[0, 0, 0]} scale={[1, 1, 1]} rotation={[0, -Math.PI, 0]}>
        <sphereGeometry />

        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
    </>
  );
}
