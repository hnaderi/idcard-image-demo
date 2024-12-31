import type { CracoConfig } from "@craco/types";
import { PluginOptions } from "copy-webpack-plugin";
import { dirname, join } from "path";
const CopyPlugin = require("copy-webpack-plugin");

const tfjsWasmBackend = dirname(
  dirname(require.resolve("@tensorflow/tfjs-backend-wasm")),
);
const modelFiles = "*.{js,tflite,data,wasm,binarypb}";
const mediapipeFaceDetection = dirname(
  require.resolve("@mediapipe/face_detection"),
);
const mediapipeSelfie = dirname(
  require.resolve("@mediapipe/selfie_segmentation"),
);

const ov: CracoConfig = {
  webpack: {
    configure: (webpackConfig) => {
      const outDir = webpackConfig.output!.path!;
      const output = join(dirname(outDir), "build", "static");
      const options: PluginOptions = {
        patterns: [
          {
            from: join(tfjsWasmBackend, "wasm-out"),
            to: join(output, "tfjs", "[name][ext]"),
          },
          {
            from: join(mediapipeFaceDetection, modelFiles),
            to: join(output, "face", "[name][ext]"),
          },
          {
            from: join(mediapipeSelfie, modelFiles),
            to: join(output, "selfie", "[name][ext]"),
          },
        ],
      };

      webpackConfig.plugins?.push(new CopyPlugin(options));
      return webpackConfig;
    },
  },
};
module.exports = ov;
