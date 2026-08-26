import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export function Section1() {
  return (
    <>
      <OrbitControls makeDefault />
      <PerspectiveCamera position={[5, 5, 5]} makeDefault fov={35} />

      <axesHelper />
      <gridHelper />
    </>
  );
}
