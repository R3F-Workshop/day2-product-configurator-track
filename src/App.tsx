import { Loader } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { PostProcessing } from "./Components/PostProcessing";
import { Scene } from "./Scene";
import { UI } from "./UI";

extend(THREE as any);

export default function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas
        shadows
        renderer="webgpu"
        camera={{
          position: [5, 5, 5],
          fov: 35,
        }}
      >
        <Scene />
        <PostProcessing />

        {/* <Inspector /> */}
      </Canvas>

      <UI />
      <Loader />
    </div>
  );
}
