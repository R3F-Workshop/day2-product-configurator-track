import { useRenderPipeline } from "@react-three/fiber/webgpu";
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
  useRenderPipeline(
    ({ renderPipeline, passes, scene, camera }) => {
      if (!renderPipeline) {
        return;
      }

      // Dispose any previously registered pre-pass before replacing it.
      const previousPrePass = passes.prePass as
        | {
            dispose?: () => void;
          }
        | undefined;
      previousPrePass?.dispose?.();

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

      const sceneColor = passes.scenePass.getTextureNode("output");

      const aoPass = ao(prePassDepth, prePassNormal, camera);
      aoPass.radius.value = 0.5;
      aoPass.resolutionScale = 1;
      aoPass.useTemporalFiltering = false;

      const aoMask = aoPass.getTextureNode().r;
      const aoOut = sceneColor.mul(vec4(vec3(aoMask), 1));

      const bloomPass = bloom(sceneColor, 0.05, 1, 0.5);
      renderPipeline.outputNode = aoOut.add(bloomPass);

      return { prePass };
    },
    ({ passes }) => {
      passes.scenePass.setMRT(
        mrt({
          output,
        }),
      );
    },
  );

  return null;
}
