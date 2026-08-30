import { Bounds, Center, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { MathUtils } from "three";
import { Float } from "../Components/Float";
import { PostProcessing } from "../Components/PostProcessing";
import { ShadowLights } from "../Components/ShadowLights";
import { StudioLights } from "../Components/StudioLights";
import { Watch } from "../Components/Watch";

export function Section5() {
  return (
    <>
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={0.8}>
          <Center top position={[0, 0.2, 0]}>
            <Float speed={0.001}>
              <Watch
                rotation={[0, MathUtils.degToRad(30), MathUtils.degToRad(30)]}
              />
            </Float>
          </Center>
        </Bounds>
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0, 2, 0]}
        enablePan={false}
        minDistance={1}
        maxDistance={3}
      />
      <StudioLights />
      <ShadowLights />

      <PostProcessing />
    </>
  );
}
