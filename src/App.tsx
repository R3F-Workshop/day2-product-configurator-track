import { Loader } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { Inspector } from "./Inspector";
import { Section5 } from "./Sections/5/Section5";
import { UI } from "./UI";

extend(THREE as any);

export default function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas
        shadows
        camera={{
          position: [5, 5, 5],
          fov: 35,
        }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <Section5 />

        <Inspector />
      </Canvas>

      <UI />
      <Loader />
    </div>
  );
}
