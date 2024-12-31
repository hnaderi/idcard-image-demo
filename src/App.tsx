import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Face from "./Face";

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Face />
    </Box>
  );
}
