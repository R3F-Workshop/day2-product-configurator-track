import { Bounds, Center, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { MathUtils } from "three";
import { Float } from "../Components/Float";
import { PostProcessing } from "../Components/PostProcessing";
import { ShadowLights } from "../Components/ShadowLights";
import { StudioLights } from "../Components/StudioLights";
import { Watch } from "../Components/Watch";
import { UI } from "../UI";

export function Section6() {
  return (
    <>
      <Suspense fallback={null}>
        <Bounds fit observe margin={1}>
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
        minDistance={3}
        maxDistance={10}
        dampingFactor={0.02}
      />
      <StudioLights />
      <ShadowLights />

      <PostProcessing />
    </>
  );
}

export function Section6UI() {
  return <UI />;
}
