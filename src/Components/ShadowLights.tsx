import { useHelper } from "@react-three/drei";
import { folder, useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three/webgpu";

function Helpers({ directionalLightRef, shadowCameraRef }: any) {
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 0.5, "red");
  useHelper(shadowCameraRef, THREE.CameraHelper);

  return (
    <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="red" opacity={0.5} transparent />
    </mesh>
  );
}

export function ShadowLights() {
  const { showLightHelpers } = useControls({
    Debug: folder(
      {
        showLightHelpers: {
          value: false,
          label: "Show Light Helpers",
        },
      },
      { collapsed: true },
    ),
  });

  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const shadowCameraRef = useRef<THREE.OrthographicCamera>(null!);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        intensity={0}
        position={[5, 4, 2]}
      >
        <orthographicCamera
          ref={shadowCameraRef}
          args={[-5, 5, 5, -5, 0.1, 20]}
          attach="shadow-camera"
        />
      </directionalLight>

      <mesh
        receiveShadow
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.2} />
      </mesh>

      {showLightHelpers && (
        <Helpers
          directionalLightRef={directionalLightRef}
          shadowCameraRef={shadowCameraRef}
        />
      )}
    </>
  );
}
