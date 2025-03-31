import React from "react";
import { Snackbar, Alert, Slide, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ✅ Slide transition function
const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const AlertSnackbar = ({ 
  open, 
  onClose, 
  message, 
  severity = "info", 
  duration = 4000 
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ 
          width: "100%", 
          boxShadow: 3, 
          borderRadius: 2,
          display: "flex",
          alignItems: "center"
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          {message}
        </Typography>

        <IconButton 
          size="small" 
          aria-label="close" 
          color="inherit" 
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
