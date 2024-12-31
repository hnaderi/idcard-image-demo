import { VideocamOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

const PREFIX = "SourceViewer";

const classes = {
  root: `${PREFIX}-root`,
  sourcePlayback: `${PREFIX}-sourcePlayback`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      width: 0,
      overflow: "hidden",
    },

    [theme.breakpoints.up("sm")]: {
      flex: 1,
      borderRightWidth: 1,
      borderRightStyle: "solid",
      borderRightColor: theme.palette.divider,
    },
  },

  [`& .${classes.sourcePlayback}`]: {
    objectFit: "cover",
  },
}));

type SourceViewerProps = {
  onFrame: (source: HTMLImageElement | HTMLVideoElement) => Promise<void>;
};

function SourceViewer(props: SourceViewerProps) {
  const [isLoading, setLoading] = useState(false);
  const [isCameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function getCameraStream() {
      try {
        const constraint = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraint);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          return;
        }
      } catch (error) {
        console.error("Error opening video camera.", error);
      }
      setLoading(false);
      setCameraError(true);
    }
    getCameraStream();
  }, [isLoading]);

  function handleVideoLoad(event: SyntheticEvent) {
    const video = event.target as HTMLVideoElement;
    setLoading(false);

    async function renderLoop() {
      await props.onFrame(video);
      requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
  }

  return (
    <Root className={classes.root}>
      {isLoading && <CircularProgress />}
      {isCameraError ? (
        <VideocamOff fontSize="large" />
      ) : (
        <video
          ref={videoRef}
          className={classes.sourcePlayback}
          hidden={isLoading}
          autoPlay
          playsInline
          controls={false}
          muted
          loop
          onLoadedData={handleVideoLoad}
        />
      )}
    </Root>
  );
}

export default SourceViewer;
