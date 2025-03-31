import React from "react";
import { CircularProgress, Box, Typography, Fade } from "@mui/material";

const Loader = ({ message = "Fetching Data..." }) => {
  return (
    <Fade in={true} timeout={500}>
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        height="30vh"
        gap={2}
      >
        <CircularProgress 
          size={60} 
          thickness={5} 
          color="primary" 
        />
        <Typography 
          variant="h6" 
          color="textSecondary"
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loader;
