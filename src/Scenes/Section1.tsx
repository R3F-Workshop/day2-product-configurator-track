import { OrbitControls } from "@react-three/drei";

export function Section1() {
  return (
    <>
      <ambientLight intensity={1} />
      <axesHelper args={[2]} />
      <gridHelper args={[12, 12, "#808080", "#3f3f3f"]} />
      <OrbitControls makeDefault />
    </>
  );
}
