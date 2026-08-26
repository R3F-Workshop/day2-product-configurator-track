import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three/webgpu";
import { useApp, type CameraPresetName } from "./AppState";

const PRESET_ANGLES: Record<
  CameraPresetName,
  { azimuth: number; polar: number; distance: number }
> = {
  Hero: { azimuth: -0.65, polar: 1.05, distance: 3.25 },
  Front: { azimuth: 0, polar: 1.4, distance: 3.1 },
  Side: { azimuth: -Math.PI / 2, polar: 1.38, distance: 3.1 },
  Top: { azimuth: 0, polar: 0.2, distance: 3.25 },
  Back: { azimuth: Math.PI, polar: 1.4, distance: 3.1 },
};

export function Controls() {
  const controls = useThree((s) => s.controls) as unknown as CameraControlsImpl;
  const scene = useThree((s) => s.scene);
  const size = useThree((s) => s.size);
  const cameraPreset = useApp((state) => state.cameraPreset);

  useEffect(() => {
    if (!controls) return;

    const thing = scene.getObjectByName("main");
    if (!thing) {
      return;
    }

    const sphere = new THREE.Sphere();
    new THREE.Box3().setFromObject(thing).getBoundingSphere(sphere);

    const radius = Math.max(sphere.radius, 0.25);
    const target = sphere.center;
    const preset = PRESET_ANGLES[cameraPreset];
    const distance = radius * preset.distance;

    controls.setTarget(target.x, target.y, target.z, false);
    controls.dollyTo(distance, true);
    controls.rotateAzimuthTo(preset.azimuth, true);
    controls.rotatePolarTo(preset.polar, true);
  }, [controls, scene, size, cameraPreset]);

  return <CameraControls makeDefault />;
}
