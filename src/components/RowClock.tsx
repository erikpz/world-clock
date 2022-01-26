import React, { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete, Home } from "@mui/icons-material";

interface RowClockProps {
  location: any;
  handleRemove: any;
  homeLocation: any;
  first?: boolean;
}

const RowContainer = styled(Box)(({ theme }) => ({
  /* backgroundColor: "lightgreen", */
  height: 80,
  display: "flex",
  alignItems: "center",
  gap: 25,
}));

export const RowClock: FC<RowClockProps> = (props) => {
  const { location, handleRemove, homeLocation, first } = props;
  const [locTime, setlocTime] = useState<any>();
  const [homeTime, sethomeTime] = useState<any>();

  const getDifference = () => {
    if (locTime && homeTime) {
      return Math.ceil((homeTime - locTime) / (1000 * 60 * 60));
    }
    return "";
  };

  useEffect(() => {
    setlocTime(
      new Date(
        new Date(location.data.datetime).toLocaleString("en-US", {
          timeZone: location.data.timezone,
        })
      )
    );
    sethomeTime(
      new Date(
        new Date(homeLocation.data.datetime).toLocaleString("en-US", {
          timeZone: homeLocation.data.timezone,
        })
      )
    );
  }, []);

  return (
    <RowContainer>
      <IconButton onClick={handleRemove} sx={{ p: 0 }}>
        <Delete sx={{ color: "#000" }} fontSize="small" />
      </IconButton>
      {first ? (
        <Home fontSize="small" />
      ) : (
        <Typography align="center" variant="h6" sx={{ width: "20px" }}>
          {getDifference()}
        </Typography>
      )}

      <Box sx={{ width: 200 }}>
        <Typography>{location.element.label}</Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {location.element.area}
        </Typography>
      </Box>

      <Box sx={{ width: 110 }}>
        <Typography>
          {locTime?.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {`${locTime?.toLocaleDateString("en-US", {
            weekday: "short",
          })}, ${locTime?.toLocaleDateString("en-US", {
            month: "short",
          })} ${locTime?.getDate()}`}
        </Typography>
      </Box>

      {/* <Box
        sx={{ backgroundColor: "lightgreen", alignSelf: "stretch", flex: 1, display:'flex' }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((n: number) => (
          <p>{n}</p>
        ))}
      </Box> */}
    </RowContainer>
  );
};
