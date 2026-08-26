import { Bounds, Center, Float, OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";
import { Car } from "../../Shared/Car";
import { PostProcessing } from "../../Shared/PostProcessing";
import { StandaloneContactShadows } from "../../Shared/StandaloneContactShadows";
import { StudioLights } from "../../Shared/StudioLights";

export function Section5() {
  return (
    <>
      <OrbitControls makeDefault target={[0, 2, 0]} />
      {/* <Controls /> */}

      <color args={["#232323"]} attach="background" />

      {/* <Lights debug /> */}
      <StudioLights />

      {/* <Billboard>
        <Center left position={[-1, 0.2, 0]}>
          <Text3D font="/fonts/SF Pro Display_Regular.json" depth={0.01}>
            APPLE
          </Text3D>
        </Center>
        <Center right position={[1, 0.2, 0]}>
          <Text3D font="/fonts/SF Pro Display_Regular.json" depth={0.01}>
            WATCH
          </Text3D>
        </Center>
      </Billboard> */}

      <Bounds fit clip observe margin={1}>
        <Center top position={[0, 0.2, 0]}>
          <Float speed={0.002}>
            <Car
              scale={50}
              rotation={[0, MathUtils.degToRad(30), MathUtils.degToRad(30)]}
            />
          </Float>
        </Center>
      </Bounds>

      <StandaloneContactShadows />

      <PostProcessing />

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
