import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { useApp, type CameraPresetName } from "../State/AppState";

interface CameraPresetConfig {
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: Record<CameraPresetName, CameraPresetConfig> = {
  Hero: {
    position: [5, 4, 6],
    target: [0, 1.8, 0],
  },
  Front: {
    position: [0, 2.4, 7],
    target: [0, 1.8, 0],
  },
  Side: {
    position: [7, 2.2, 0],
    target: [0, 1.8, 0],
  },
  Top: {
    position: [0, 9, 0.1],
    target: [0, 1.8, 0],
  },
  Back: {
    position: [0, 2.4, -7],
    target: [0, 1.8, 0],
  },
};

export function CameraPresetRig() {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const controls = useThree((state) => state.controls) as {
    target: THREE.Vector3;
    update: () => void;
  } | null;
  const preset = useApp((state) => state.cameraPreset);

  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const { position, target } = CAMERA_PRESETS[preset];

    targetPosition.set(position[0], position[1], position[2]);
    targetLookAt.set(target[0], target[1], target[2]);

    const smoothing = 1 - Math.exp(-4 * delta);

    camera.position.lerp(targetPosition, smoothing);
    if (controls) {
      controls.target.lerp(targetLookAt, smoothing);
      controls.update();
    } else {
      camera.lookAt(targetLookAt);
    }
  });

  return null;
}
