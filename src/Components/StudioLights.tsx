import { Environment, Lightformer } from "@react-three/drei";

export function StudioLights() {
  return (
    <>
      <Environment resolution={256}>
        <group name="Studio Lightformers" rotation={[0, -Math.PI / 4, 0]}>
          <Lightformer
            name="Key Softbox"
            form="rect"
            intensity={3}
            position={[-6, 5, 4]}
            scale={[6, 4, 1]}
          />

          <Lightformer
            name="Fill Softbox"
            form="rect"
            intensity={4}
            position={[7, 3, 2]}
            scale={[5, 3, 1]}
          />

          <Lightformer
            name="Rim Softbox"
            form="rect"
            intensity={6}
            position={[0, 6, -8]}
            scale={[8, 4, 1]}
          />

          <Lightformer
            name="Top Bounce"
            form="circle"
            intensity={3}
            position={[0, 10, 0]}
            scale={5}
          />

          <Lightformer
            name="Glass Reflection Ring"
            form="ring"
            intensity={30}
            position={[1.5, 3.2, 6]}
            scale={2.4}
          />

          <Lightformer
            name="Ground Ring Bounce"
            form="ring"
            intensity={1.5}
            position={[0, -2, 0]}
            scale={10}
          />
        </group>
      </Environment>
    </>
  );
}
