import React from "react";
import { WorldClock } from "./components/WorldClock";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const AppContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflowX: "auto",
}));

const App = () => {
  return (
    <AppContainer>
      <Typography
        variant="h2"
        align="center"
        sx={{ color: "#FFF", fontWeight: 800, width: "100%", my: 2 }}
      >
        WorldTimeLite
      </Typography>
      <WorldClock />
    </AppContainer>
  );
};

export default App;
