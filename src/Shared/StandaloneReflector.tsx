import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import { hashBlur } from "three/addons/tsl/display/hashBlur.js";
import {
  Fn,
  mix,
  rangeFogFactor,
  reflector,
  sample,
  uniform,
  vec4,
} from "three/tsl";
import * as THREE from "three/webgpu";

export interface StandaloneReflectorProps {
  size?: number;
  roughness?: number;
  blurRadius?: number;
  resolutionScale?: number;
  blurRepeats?: number;
  reflectionIntensity?: number;
}

export function StandaloneReflector({
  size = 100,
  roughness = 0.9,
  blurRadius = 0.2,
  resolutionScale = 0.5,
  blurRepeats = 40,
  reflectionIntensity = 0.1,
}: StandaloneReflectorProps) {
  const scene = useThree((state) => state.scene);

  const roughnessNode = useMemo(() => uniform(roughness), []);
  const radiusNode = useMemo(() => uniform(blurRadius), []);

  const reflection = useMemo(
    () => reflector({ resolutionScale, depth: true, bounces: false }),
    [],
  );

  useLayoutEffect(() => {
    roughnessNode.value = roughness;
    radiusNode.value = blurRadius;
    reflection.reflector.resolutionScale = resolutionScale;
  }, [
    blurRadius,
    reflection,
    resolutionScale,
    roughness,
    radiusNode,
    roughnessNode,
  ]);

  useLayoutEffect(() => {
    reflection.target.rotateX(-Math.PI / 2);
    scene.add(reflection.target);

    return () => {
      scene.remove(reflection.target);
    };
  }, [reflection, scene]);

  const floorMaterial = useMemo(() => {
    const reflectionDepth = reflection.getDepthNode();

    const material = new THREE.MeshStandardNodeMaterial();
    material.transparent = true;

    material.colorNode = Fn(() => {
      const radiusRange = mix(0.01, 0.1, radiusNode);
      const roughnessRange = mix(0.3, 0.03, roughnessNode);

      const maskReflection = sample((uv) => {
        const reflected = reflection.sample(uv);
        const depth = reflectionDepth.sample(uv);

        return vec4(reflected.rgb, reflected.a.mul(depth.r));
      }, reflection.uvNode as any);

      const reflectionBlurred = hashBlur(maskReflection, radiusRange, {
        repeats: blurRepeats,
        premultipliedAlpha: true,
      } as any);

      const reflectionMask = reflectionBlurred.a
        .mul(reflectionDepth.r)
        .remapClamp(0, roughnessRange);

      const reflectionMixFactor = reflectionMask.mul(
        roughnessNode.mul(2).min(1),
      );
      const reflectionFinal = mix(
        reflection.rgb,
        reflectionBlurred.rgb,
        reflectionMixFactor,
      ).mul(reflectionIntensity);

      const outputColor = reflectionFinal;
      const opacity = rangeFogFactor(7, 25).oneMinus();

      return vec4(outputColor, opacity);
    })();

    return material;
  }, [blurRepeats, radiusNode, reflection, reflectionIntensity, roughnessNode]);

  useLayoutEffect(() => {
    return () => {
      floorMaterial.dispose();
    };
  }, [floorMaterial]);

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[size, size]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>
    </>
  );
}
