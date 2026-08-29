import { Bounds, Center, Gltf, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { StudioLights } from "./Components/StudioLights";

const base = import.meta.env.BASE_URL;

export function Scene() {
  return (
    <>
      <color args={["#232323"]} attach="background" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1}>
          <Center top position={[0, 0.2, 0]}>
            {/* <Float speed={0.002}> */}
            {/* <Watch
                scale={50}
                rotation={[0, MathUtils.degToRad(30), MathUtils.degToRad(30)]}
              /> */}
            <Gltf
              src={base + "/1986_alfa_romeo_spider_quadrifoglio_verde.glb"}
            />
            {/* </Float> */}
          </Center>
        </Bounds>
      </Suspense>

      <OrbitControls makeDefault target={[0, 2, 0]} />
      <StudioLights />
    </>
  );
}
