import { Bounds, Center, Gltf, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { MathUtils } from "three";
import { PostProcessing } from "../Components/PostProcessing";
import { ShadowLights } from "../Components/ShadowLights";
import { StudioLights } from "../Components/StudioLights";
import { Watch } from "../Components/Watch";

const base = import.meta.env.BASE_URL;

export function Section3() {
  return (
    <>
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={0.9}>
          <Center top position={[0, 0.2, 0]}>
            <Watch
              rotation={[0, MathUtils.degToRad(30), MathUtils.degToRad(30)]}
            />
          </Center>
        </Bounds>
      </Suspense>

      <OrbitControls makeDefault target={[0, 2, 0]} />
      {/* <BasicLights /> */}
      <ShadowLights />
      <StudioLights />
    </>
  );
}

export function Section3Lamp() {
  return (
    <>
      <Bounds fit clip observe margin={1}>
        <Gltf src={base + "desk_lamp.glb"} />
      </Bounds>

      <StudioLights />
      <PostProcessing />

      <OrbitControls makeDefault target={[0, 2, 0]} />
    </>
  );
}
