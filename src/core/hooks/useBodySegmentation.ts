import { blue, green } from "@mui/material/colors";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import * as faceDetection from "@tensorflow-models/face-detection";
import { Face } from "@tensorflow-models/face-detection";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import { useEffect, useRef, useState } from "react";

const wasmPath = `${process.env.PUBLIC_URL}/static/tfjs/`;
const facePath = `${process.env.PUBLIC_URL}/static/face`;
const selfiePath = `${process.env.PUBLIC_URL}/static/selfie`;

let tfjsReady: Promise<void> | undefined;
function initiateTF() {
  async function i() {
    console.log("Initiating tfjs...");
    tfjsWasm.setWasmPaths(wasmPath);
    await tf.ready();
    console.log("TFJS is ready!");
  }
  if (!tfjsReady) tfjsReady = i();
  return tfjsReady;
}

function waitInQ() {
  let last: Promise<void> = Promise.resolve();
  return function (f: () => Promise<void>) {
    last = last.then(f);
    return last;
  };
}

const queue = waitInQ();

function useBodySegmentation() {
  const [bodySegmenter, setSegmenter] =
    useState<bodySegmentation.BodySegmenter>();
  const [isInitiated, setInitiated] = useState<boolean>(false);

  useEffect(() => {
    async function loadBodySegmenter() {
      setInitiated(true);
      await initiateTF();
      const model =
        bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
      console.log("Loading body segmentation model...");
      const segmenter = await bodySegmentation.createSegmenter(model, {
        runtime: "mediapipe",
        solutionPath: selfiePath,
      });
      setSegmenter(segmenter);
      console.log("Body segmenter loaded!");
    }

    if (!isInitiated) queue(loadBodySegmenter);
  }, [isInitiated]);

  return bodySegmenter;
}

function useFaceDetection() {
  const [detector, setDetector] = useState<faceDetection.FaceDetector>();
  const [isInitiated, setInitiated] = useState<boolean>(false);

  async function init() {
    setInitiated(true);
    await initiateTF();
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    console.log("Loading mediapipe face detection...");
    setDetector(
      await faceDetection.createDetector(model, {
        runtime: "mediapipe",
        solutionPath: facePath,
      }),
    );
    console.log("Face detection loaded!");
  }

  useEffect(() => {
    if (!isInitiated) queue(init);
  }, [isInitiated]);

  return detector;
}

const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };

function useRenderingPipeline(
  bodySegmenter?: bodySegmentation.BodySegmenter,
  faceDetector?: faceDetection.FaceDetector,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const render = async (
    sourcePlayback: HTMLImageElement | HTMLVideoElement,
  ) => {
    if (!canvasRef.current || !bodySegmenter) return;
    const result = await bodySegmenter.segmentPeople(sourcePlayback);
    // await bodySegmentation.drawBokehEffect(canvasRef.current, sourcePlayback, result)
    if (result.length > 0) {
      const first = result[0];
      first.mask.toCanvasImageSource();
      const mask = await bodySegmentation.toColoredMask(
        first,
        () => foregroundColor,
        backgroundColor,
      );
      await bodySegmentation.drawMask(canvasRef.current, sourcePlayback, mask);
    }

    const faces = await faceDetector?.estimateFaces(sourcePlayback);
    const ctx = canvasRef.current.getContext("2d");
    if (faces && ctx) drawResults(ctx, faces);
  };

  return {
    render,
    canvasRef,
  };
}

const NUM_KEYPOINTS = 6;
/**
 * Draw the keypoints on the video.
 * @param ctx 2D rendering context.
 * @param faces A list of faces to render.
 * @param boundingBox Whether or not to display the bounding box.
 * @param showKeypoints Whether or not to display the keypoints.
 */
function drawResults(
  ctx: CanvasRenderingContext2D,
  faces: Face[],
  boundingBox: boolean = true,
  showKeypoints: boolean = true,
) {
  faces.forEach((face) => {
    const keypoints = face.keypoints.map((keypoint) => [
      keypoint.x,
      keypoint.y,
    ]);

    if (boundingBox) {
      ctx.strokeStyle = blue[100];
      ctx.lineWidth = 1;

      const box = face.box;
      drawPath(
        ctx,
        [
          [box.xMin, box.yMin],
          [box.xMax, box.yMin],
          [box.xMax, box.yMax],
          [box.xMin, box.yMax],
        ],
        true,
      );
    }

    if (showKeypoints) {
      ctx.fillStyle = green[100];

      for (let i = 0; i < NUM_KEYPOINTS; i++) {
        const x = keypoints[i][0];
        const y = keypoints[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 3 /* radius */, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  });
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  points: string | any[],
  closePath: boolean,
) {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }

  if (closePath) {
    region.closePath();
  }
  ctx.stroke(region);
}

export { useBodySegmentation, useFaceDetection, useRenderingPipeline };
