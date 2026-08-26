import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";

interface LightHelpersProps {
  directionalLightRef: React.RefObject<THREE.DirectionalLight>;
  directionalLightCameraHelperRef: React.RefObject<THREE.OrthographicCamera>;
}

function LightHelpers({
  directionalLightRef,
  directionalLightCameraHelperRef,
}: LightHelpersProps) {
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(directionalLightCameraHelperRef, THREE.CameraHelper);

  return <></>;
}

export interface LightsProps {
  debug?: boolean;
}

export function Lights({ debug }: LightsProps) {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const directionalLightCameraHelperRef = useRef<THREE.OrthographicCamera>(
    null!,
  );
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const light = directionalLightRef.current;
    if (!light) return;

    light.shadow.needsUpdate = true;
    invalidate();
  }, [invalidate]);

  return (
    <>
      {debug && (
        <LightHelpers
          directionalLightRef={directionalLightRef}
          directionalLightCameraHelperRef={directionalLightCameraHelperRef}
        />
      )}

      <directionalLight
        ref={directionalLightRef}
        intensity={50}
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          ref={directionalLightCameraHelperRef}
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <ambientLight />
    </>
  );
}
