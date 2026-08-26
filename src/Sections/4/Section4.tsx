import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Car } from "../../Shared/Car";
import { StudioLights } from "../../Shared/StudioLights";

export function Section4() {
  return (
    <>
      <OrbitControls makeDefault target={[0, 2, 0]} />
      <PerspectiveCamera position={[5, 5, 5]} makeDefault fov={35} />

      <color args={["#232323"]} attach="background" />

      {/* <Lights debug /> */}
      <StudioLights />

      <Suspense>
        <Center top>
          <Car scale={50} />
        </Center>
      </Suspense>

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={1} />
      </mesh>

      {/* <AccumulativeShadows
        position={[0, -0.001, 0]}
        scale={20}
        frames={120}
        temporal
        alphaTest={0.9}
        opacity={0.95}
      >
        <RandomizedLight
          amount={8}
          radius={3.5}
          ambient={0.35}
          intensity={1.25}
          position={[8, 10, 6]}
          bias={0.0005}
        />
      </AccumulativeShadows> */}
    </>
  );
}
