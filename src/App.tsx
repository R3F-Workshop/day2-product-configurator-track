import { useCursor } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useState } from "react";
import * as THREE from "three/webgpu";
import { Section6, Section6UI } from "./Scenes/Section6";

extend(THREE as any);

export default function App() {
  const [clicked, set] = useState(false);
  useCursor(clicked, "grabbing", "grab");

  const { bgColor } = useControls({
    bgColor: {
      value: "#fafafa",
      label: "Background Color",
    },
  });

  return (
    <div className="h-screen w-screen bg-[#fafafa] text-zinc-900">
      <Leva collapsed titleBar={{ title: "Controls" }} hidden />

      <Canvas
        shadows
        renderer="webgpu"
        background={bgColor}
        camera={{
          position: [5, 5, 5],
          fov: 35,
        }}
        onPointerDown={() => set(true)}
        onPointerUp={() => set(false)}
      >
        <Section6 />
      </Canvas>
      <Section6UI />
    </div>
  );
}
