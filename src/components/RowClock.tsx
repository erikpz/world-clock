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

  const resetPos = () => {
    if (locTime && first) {
      let currentTime = locTime.getHours();
      let pos = getHoursArray().indexOf(currentTime);
      props.setPos(ref.current?.getBoundingClientRect().left + 25 * pos);
    }
  };

  const getHourColor = (num: number, prop: string) => {
    if (prop === "bg") {
      if ([0, 1, 2, 3, 4, 5, 21, 22, 23].includes(num)) {
        return "black";
      } else if ([6, 7, 18, 19, 20].includes(num)) {
        return "#DBEDFF";
      } else {
        return "white";
      }
    } else {
      if ([0, 1, 2, 3, 4, 5, 21, 22, 23].includes(num)) {
        return "white";
      } else {
        return "black";
      }
    }
  };

  const getBorders = (num: number) => {
    if (num === 23) {
      return "0 8px 8px 0";
    } else if (num === 0) {
      return "8px 0 0 8px";
    }
    return 0;
  };

  const getHoursArray = () => {
    let hArr: number[] = [];
    /*    if (locTime && !locHome) { */
    if (locTime && homeTime) {
      let hour = first ? homeTime.getHours() : locTime.getHours();
      /* let hour = locTime.getHours(); */
      for (let i = 0; i < 24; i++) {
        if (hour + i > 23) {
          hArr = [...hArr, hour + i - 24];
        } else {
          hArr = [...hArr, hour + i];
        }
      }
      console.log(hArr);
      return hArr;
    }
    return hArr;
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
    resetPos();
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

      <Box sx={{ width: 180 }}>
        <Typography sx={{ fontSize: "14px" }}>
          {location.element.label}
        </Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {location.element.area}
        </Typography>
      </Box>

      <Box sx={{ width: 100 }}>
        <Typography sx={{ fontSize: "14px" }}>
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
          alignSelf: "stretch",
          width: 600,
          display: "flex",
          alignItems: "center",
        }}
        onMouseMove={(e: any) => {
          props.setPos(e.target.getBoundingClientRect().left);
        }}
      >
        {getHoursArray().map((n: number, i: number) => (
          <Box
            key={n}
            sx={{
              width: 25,
              boxSizing: "border-box",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                bgcolor: getHourColor(n, "bg"),
                color: getHourColor(n, "col"),
                borderRadius: getBorders(n),
                padding: "5px 0",
              }}
            >
              <Typography
                align="center"
                sx={{ fontSize: "12px", fontWeight: 600 }}
              >
                {n === 0
                  ? locTime?.toLocaleDateString("en-US", {
                      month: "short",
                    })
                  : n}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  display: "block",
                  fontWeight: 400,
                  fontSize: "10px",
                }}
                variant="caption"
              >
                {n === 0 ? locTime?.getDate() : n > 11 ? "pm" : "am"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </RowContainer>
  );
};
