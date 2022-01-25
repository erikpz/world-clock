import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete, Home } from "@mui/icons-material";

interface RowClockProps {
  location: any;
  handleRemove: any;
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
  const { location, handleRemove, first } = props;
  const d = new Date(location.data.datetime);
  return (
    <RowContainer>
      <IconButton onClick={handleRemove} sx={{ p: 0 }}>
        <Delete sx={{ color: "#000" }} fontSize="small" />
      </IconButton>
      {first ? (
        <Home fontSize="small" />
      ) : (
        <Typography align="center" variant="h6" sx={{ width: "20px" }}>
          1
        </Typography>
      )}

      <Box sx={{width:200}}>
        <Typography>{location.element.label}</Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {location.element.area}
        </Typography>
      </Box>

      <Box sx={{width:110}}>
        <Typography>{`${d.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })} ${location.data.abbreviation}`}</Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {`${d.toLocaleDateString("en-US", {
            weekday: "short",
          })}, ${d.toLocaleDateString("en-US", {
            month: "short",
          })} ${d.getDate()}`}
        </Typography>
      </Box>

      <Box
        sx={{ backgroundColor: "lightgreen", alignSelf: "stretch", flex: 1 }}
      >
        sa
      </Box>
    </RowContainer>
  );
};
