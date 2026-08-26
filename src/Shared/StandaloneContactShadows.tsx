import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import { gaussianBlur } from "three/addons/tsl/display/GaussianBlurNode.js";
import { depth, float, texture, uniform, vec3 } from "three/tsl";
import * as THREE from "three/webgpu";

export interface StandaloneContactShadowsProps {
  width?: number;
  height?: number;
  cameraHeight?: number;
  mapSize?: number;
  planeY?: number;
  blur?: number;
  darkness?: number;
  shadowOpacity?: number;
  planeColor?: string;
  planeOpacity?: number;
  showWireframe?: boolean;
}

export function StandaloneContactShadows({
  width = 2.5,
  height = 2.5,
  cameraHeight = 0.3,
  mapSize = 512,
  planeY = -0.3,
  blur = 3.5,
  darkness = 1,
  shadowOpacity = 1,
  planeColor = "#ffffff",
  planeOpacity = 0,
  showWireframe = false,
}: StandaloneContactShadowsProps) {
  const gl = useThree((state) => state.gl as unknown as THREE.WebGPURenderer);
  const scene = useThree((state) => state.scene);

  const uBlur = useMemo(() => uniform(blur), []);
  const uDarkness = useMemo(() => uniform(darkness), []);
  const uShadowOpacity = useMemo(() => uniform(shadowOpacity), []);
  const uPlaneOpacity = useMemo(() => uniform(planeOpacity), []);
  const uPlaneColor = useMemo(() => uniform(new THREE.Color(planeColor)), []);

  useLayoutEffect(() => {
    uBlur.value = blur;
    uDarkness.value = darkness;
    uShadowOpacity.value = shadowOpacity;
    uPlaneOpacity.value = planeOpacity;
    uPlaneColor.value.set(planeColor);
  }, [
    blur,
    darkness,
    planeColor,
    planeOpacity,
    shadowOpacity,
    uBlur,
    uDarkness,
    uPlaneColor,
    uPlaneOpacity,
    uShadowOpacity,
  ]);

  const renderTarget = useMemo(() => {
    const target = new THREE.RenderTarget(mapSize, mapSize, {
      depthBuffer: true,
    });
    target.texture.generateMipmaps = false;

    if (!target.texture.image) {
      target.texture.image = { width: mapSize, height: mapSize } as any;
    }

    return target;
  }, [mapSize]);

  const planeGeometry = useMemo(
    () => new THREE.PlaneGeometry(width, height).rotateX(Math.PI / 2),
    [height, width],
  );

  const depthMaterial = useMemo(() => {
    const material = new THREE.NodeMaterial();

    material.colorNode = vec3(0);
    material.opacityNode = float(1).sub(depth).mul(uDarkness);
    material.depthTest = false;
    material.depthWrite = false;

    return material;
  }, [uDarkness]);

  const shadowPlaneMaterial = useMemo(() => {
    const material = new THREE.NodeMaterial();
    material.transparent = true;
    material.depthWrite = false;

    const blurredShadow = gaussianBlur(
      texture(renderTarget.texture),
      uBlur,
      4,
      {
        premultipliedAlpha: false,
      },
    );

    material.colorNode = vec3(0);
    material.opacityNode = blurredShadow.a.mul(uShadowOpacity);

    return material;
  }, [renderTarget, uBlur, uShadowOpacity]);

  const fillPlaneMaterial = useMemo(() => {
    const material = new THREE.NodeMaterial();
    material.transparent = true;
    material.depthWrite = false;
    material.colorNode = uPlaneColor;
    material.opacityNode = uPlaneOpacity;

    return material;
  }, [uPlaneColor, uPlaneOpacity]);

  const shadowCamera = useMemo(
    () =>
      new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        height / 2,
        -height / 2,
        0,
        cameraHeight,
      ),
    [cameraHeight, height, width],
  );

  const cameraHelper = useMemo(
    () => new THREE.CameraHelper(shadowCamera),
    [shadowCamera],
  );

  useLayoutEffect(() => {
    if (showWireframe) {
      scene.add(cameraHelper);
    } else {
      scene.remove(cameraHelper);
    }

    return () => {
      scene.remove(cameraHelper);
    };
  }, [cameraHelper, scene, showWireframe]);

  useFrame(() => {
    const initialBackground = scene.background;
    scene.background = null;

    const previousOverrideMaterial = scene.overrideMaterial;
    const previousHelperVisibility = cameraHelper.visible;
    const previousAutoClear = gl.autoClear;
    const previousRenderTarget = gl.getRenderTarget();
    const previousClearAlpha = (gl as any).getClearAlpha?.();

    cameraHelper.visible = false;
    scene.overrideMaterial = depthMaterial;
    gl.autoClear = true;

    if (previousClearAlpha !== undefined) {
      (gl as any).setClearAlpha(0);
    }

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, shadowCamera);

    scene.overrideMaterial = previousOverrideMaterial;
    gl.setRenderTarget(previousRenderTarget);
    gl.autoClear = previousAutoClear;
    scene.background = initialBackground;
    cameraHelper.visible = previousHelperVisibility;

    if (previousClearAlpha !== undefined) {
      (gl as any).setClearAlpha(previousClearAlpha);
    }
  }, 0);

  useLayoutEffect(() => {
    return () => {
      cameraHelper.dispose();
      planeGeometry.dispose();
      depthMaterial.dispose();
      shadowPlaneMaterial.dispose();
      fillPlaneMaterial.dispose();
      renderTarget.dispose();
    };
  }, [
    cameraHelper,
    depthMaterial,
    fillPlaneMaterial,
    planeGeometry,
    renderTarget,
    shadowPlaneMaterial,
  ]);

  return (
    <group position-y={planeY}>
      <mesh
        geometry={planeGeometry}
        material={shadowPlaneMaterial}
        renderOrder={1}
        scale-y={-1}
        scale-z={-1}
      />

      {planeOpacity > 0 && (
        <mesh
          geometry={planeGeometry}
          material={fillPlaneMaterial}
          rotation-x={Math.PI}
        />
      )}

      <primitive object={shadowCamera} rotation-x={Math.PI / 2} />
    </group>
  );
}
