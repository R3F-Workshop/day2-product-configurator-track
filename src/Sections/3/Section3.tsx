import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Car } from "../../Shared/Car";

export function Section3() {
  return (
    <>
      <OrbitControls makeDefault />
      <PerspectiveCamera position={[5, 5, 5]} makeDefault fov={35} />

      <axesHelper />
      <gridHelper />

      <color args={["#ff9621"]} attach="background" />

      <directionalLight intensity={50} position={[10, 10, 10]} />
      <ambientLight />

      <Center top>
        <Car />
      </Center>
    </>
  );
}
