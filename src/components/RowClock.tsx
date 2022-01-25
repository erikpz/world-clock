import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface RowClockProps {
  location: any;
}

const RowContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "lightgreen",
  height: 80,
  display: "flex",
  alignItems: "center",
}));

export const RowClock: FC<RowClockProps> = (props) => {
  const { location } = props;
  return (
    <RowContainer>
      <IconButton>
        <Delete sx={{ color: "#000" }} fontSize="small" />
      </IconButton>
      <Box>
        <Typography>{location.element.label}</Typography>
        <Typography variant='caption' sx={{color:'#555'}}>{location.element.area}</Typography>
      </Box>
    </RowContainer>
  );
};
