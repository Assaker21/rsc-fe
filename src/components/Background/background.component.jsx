import { Canvas, useLoader } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  useTexture,
  useCubeTexture,
} from "@react-three/drei";
import { TextureLoader } from "three";

import "./background.component.scss";

export default function Background({ content }) {
  return (
    <div className="canvas-container">
      <div className="vignette" />
      {/*<Canvas>
        <OrbitControls
          enablePan={false}
          enableDamping={true}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.1}
        />
        <Stars
          radius={50}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0}
        />
        {content}
  </Canvas>*/}
    </div>
  );
}
