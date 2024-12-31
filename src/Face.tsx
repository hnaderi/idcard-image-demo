import { styled } from "@mui/material/styles";
import ViewerCard from "./core/components/ViewerCard";

const PREFIX = "App";

const classes = {
  root: `${PREFIX}-root`,
  resourceSelectionCards: `${PREFIX}-resourceSelectionCards`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: "grid",

    [theme.breakpoints.up("xs")]: {
      margin: theme.spacing(1),
      gap: theme.spacing(1),
      gridTemplateColumns: "1fr",
    },

    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2),
      gap: theme.spacing(2),
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },

  [`& .${classes.resourceSelectionCards}`]: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Face() {
  return (
    <Root className={classes.root}>
      <ViewerCard />
    </Root>
  );
}

export default Face;
