import React from "react";
import {
  Box,
  CircularProgress,
  circularProgressClasses,
  Stack,
  Typography,
} from "@mui/material";

function Loader({ loadingText }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%", width: "100%" }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
      />
      {loadingText && <Typography marginTop={2}>{loadingText}</Typography>}
    </Stack>
  );
}

export default Loader;
