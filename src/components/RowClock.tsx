import React, { FC, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete, Home } from "@mui/icons-material";

interface RowClockProps {
  location: any;
  handleRemove: any;
  homeLocation: any;
  setPos: any;
  first?: boolean;
}

const RowContainer = styled(Box)(({ theme }) => ({
  /* backgroundColor:'lightblue', */
  height: 80,
  display: "flex",
  alignItems: "center",
  gap: 25,
}));

export const RowClock: FC<RowClockProps> = (props) => {
  const { location, handleRemove, homeLocation, first } = props;
  const [locTime, setlocTime] = useState<any>();
  const [homeTime, sethomeTime] = useState<any>();
  const ref = useRef<any>();

  const getDifference = () => {
    if (locTime && homeTime) {
      return Math.floor((locTime - homeTime) / (1000 * 60 * 60));
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

  useEffect(() => {
    if (locTime && first) {
      let x = locTime.getHours();
      x = x > 12 ? x - 12 : x;
      console.log(x);
      props.setPos(ref.current?.getBoundingClientRect().left + 29 * x);
    }
  }, [locTime]);

  return (
    <RowContainer>
      <IconButton onClick={handleRemove} sx={{ p: 0 }}>
        <Delete sx={{ color: "#000" }} fontSize="small" />
      </IconButton>
      {first ? (
        <Home fontSize="small" />
      ) : (
        <IconButton sx={{ color: "#000", p: 0 }}>
          <Typography align="center" variant="h6" sx={{ width: "20px" }}>
            {getDifference()}
          </Typography>
        </IconButton>
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

      <Box
        ref={ref}
        sx={{
          backgroundColor: "lightgreen",
          alignSelf: "stretch",
          width: 600,
          display: "flex",
          alignItems: "center",
        }}
        onMouseMove={(e: any) => {
          props.setPos(e.target.getBoundingClientRect().left);
        }}
      >
        {[
          24, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          21, 22, 23,
        ].map((n: number) => (
          <Box
            key={n}
            sx={{
              bgcolor: "lightblue",
              padding: "0 2px",
              width: 25,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "3px",
            }}
          >
            <Typography align="center">{n}</Typography>
            <Typography
              sx={{
                textAlign: "center",
                display: "block",
                fontWeight: 500,
                fontSize: "10px",
              }}
              variant="caption"
            >
              pm
            </Typography>
          </Box>
        ))}
      </Box>
    </RowContainer>
  );
};
