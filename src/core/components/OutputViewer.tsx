import { styled } from "@mui/material/styles";
import { MutableRefObject } from "react";

const PREFIX = "OutputViewer";

const classes = {
  root: `${PREFIX}-root`,
  render: `${PREFIX}-render`,
  stats: `${PREFIX}-stats`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    flex: 1,
    position: "relative",
  },

  [`& .${classes.render}`]: {
    objectFit: "cover",
  },
}));

type OutputViewerProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
};

function OutputViewer(props: OutputViewerProps) {
  return (
    <Root className={classes.root}>
      <canvas ref={props.canvasRef} className={classes.render} />
    </Root>
  );
}

export default OutputViewer;
