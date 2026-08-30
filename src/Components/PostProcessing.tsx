import { useRenderPipeline } from "@react-three/fiber/webgpu";
import { folder, useControls } from "leva";
import { useEffect } from "react";
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

export function PostProcessing() {
  const { aoIntensity, aoRadius, bloomIntensity, bloomRadius, bloomThreshold } =
    useControls({
      Postprocessing: folder(
        {
          bloomIntensity: {
            value: 0.25,
            min: 0,
            max: 1,
            step: 0.01,
          },
          bloomRadius: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.01,
          },
          bloomThreshold: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.01,
          },
          aoRadius: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.01,
          },
          aoIntensity: {
            value: 1,
            min: 0,
            max: 5,
            step: 0.01,
          },
        },
        { collapsed: true },
      ),
    });

  const { rebuild } = useRenderPipeline(
    ({ renderPipeline, passes, scene, camera }) => {
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

      const sceneColor = passes.scenePass.getTextureNode("output");

      const aoPass = ao(prePassDepth, prePassNormal, camera);
      aoPass.radius.value = aoRadius;
      aoPass.scale.value = aoIntensity;

      const aoMask = aoPass.getTextureNode().r;
      const aoOut = sceneColor.mul(vec4(vec3(aoMask), 1));

      const bloomPass = bloom(
        sceneColor,
        bloomIntensity,
        bloomRadius,
        bloomThreshold,
      );
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

  useEffect(() => {
    rebuild();
  }, [
    aoIntensity,
    aoRadius,
    bloomIntensity,
    bloomRadius,
    bloomThreshold,
    rebuild,
  ]);

  return null;
}
