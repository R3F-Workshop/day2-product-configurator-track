import { OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";
import { Watch } from "../Components/Watch";

export function Section2() {
  return (
    <>
      <ambientLight intensity={1} />
      <axesHelper args={[2]} />
      <gridHelper args={[12, 12, "#808080", "#3f3f3f"]} />
      <OrbitControls makeDefault />

      <Watch
        scale={50}
        rotation={[0, MathUtils.degToRad(30), MathUtils.degToRad(30)]}
      />
    </>
  );
}
