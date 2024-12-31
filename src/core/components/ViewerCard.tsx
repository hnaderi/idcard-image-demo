import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useBodySegmentation,
  useFaceDetection,
  useRenderingPipeline,
} from "../hooks/useBodySegmentation";
import OutputViewer from "./OutputViewer";
import SourceViewer from "./SourceViewer";

const PREFIX = "ViewerCard";
const classes = {
  root: `${PREFIX}-root`,
  noOutput: `${PREFIX}-noOutput`,
  avatar: `${PREFIX}-avatar`,
};

const Root = styled(Paper)(({ theme }) => {
  return {
    [`&.${classes.root}`]: {},
    [`&.${classes.noOutput}`]: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    [`&.${classes.avatar}`]: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  };
});

function ViewerCard() {
  const bodySegmenter = useBodySegmentation();
  const faceDetector = useFaceDetection();
  const { canvasRef, render } = useRenderingPipeline(
    bodySegmenter,
    faceDetector,
  );

  return (
    <Root className={classes.root}>
      <SourceViewer onFrame={render} />
      <OutputViewer canvasRef={canvasRef} />
    </Root>
  );
}

export default ViewerCard;
