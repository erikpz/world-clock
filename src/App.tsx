import React from "react";
import { WorldClock } from "./components/WorldClock";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const AppContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const App = () => {
  return (
    <AppContainer>
      <Typography variant="h2" sx={{ color: "#FFF", fontWeight: 800 }}>
        WorldTimeLite
      </Typography>
      <WorldClock />
    </AppContainer>
  );
};

export default App;
