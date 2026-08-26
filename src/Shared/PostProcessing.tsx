import type { CameraControlsImpl } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import { ao } from "three/addons/tsl/display/GTAONode.js";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import {
  mrt,
  normalView,
  output,
  packNormalToRGB,
  pass,
  sample,
  unpackRGBToNormal,
  vec3,
  vec4,
  velocity,
} from "three/tsl";
import * as THREE from "three/webgpu";

export function PostProcessing() {
  const gl = useThree((state) => state.gl as unknown as THREE.WebGPURenderer);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const pipeline = useMemo(() => new THREE.RenderPipeline(gl), [gl]);

  useLayoutEffect(() => {
    const prePass = pass(scene, camera);
    prePass.name = "Pre-Pass";
    prePass.transparent = false;
    prePass.setMRT(
      mrt({
        output: packNormalToRGB(normalView),
        velocity,
      }),
    );

    const prePassNormal = sample((uv) => {
      return unpackRGBToNormal(prePass.getTextureNode().sample(uv));
    });
    const prePassDepth = prePass.getTextureNode("depth");

    // Store normal as 8-bit packed RGB to reduce pre-pass bandwidth.
    const normalTexture = prePass.getTexture("output");
    normalTexture.type = THREE.UnsignedByteType;

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
      mrt({
        output,
      }),
    );
    const sceneColor = scenePass.getTextureNode("output");

    const aoPass = ao(prePassDepth, prePassNormal, camera);
    aoPass.radius.value = 0.5;
    aoPass.resolutionScale = 1;
    aoPass.useTemporalFiltering = false;

    const aoMask = aoPass.getTextureNode().r;
    const aoOut = sceneColor.mul(vec4(vec3(aoMask), 1));

    const bloomPass = bloom(sceneColor, 0.05, 1, 0.5);
    const bloomedColor = aoOut.add(bloomPass);

    const finalColor = bloomedColor;

    pipeline.outputNode = finalColor;
    pipeline.needsUpdate = true;

    return () => {
      prePass.dispose();
      scenePass.dispose();
    };
  }, [camera, pipeline, scene]);

  useFrame(({ controls }, dt) => {
    pipeline.render();

    const c = controls as CameraControlsImpl;
    if (c) {
      c.update(dt);
    }
  }, 1);

  return null!;
}
