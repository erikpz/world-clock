import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { TimeService } from "../services/TimeService";

const ClockContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "60%",
  maxWidth: 900,
  padding: "35px 45px",
  margin: "30px 0",
  borderRadius: 20,
  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
}));

export const WorldClock = () => {
  const handleFetch = async () => {
    try {
      const timeService = TimeService.getInstance();
      const response = await timeService.getTimeLocations("Europe", "x");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ClockContainer>
      Times
      <button onClick={handleFetch}>fetch</button>
    </ClockContainer>
  );
};
