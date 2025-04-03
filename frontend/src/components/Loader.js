import React from "react";
import { CircularProgress, Box, Typography, Fade } from "@mui/material";
import { motion } from "framer-motion";

const Loader = ({ message = "Fetching Data..." }) => {
  return (
    <Fade in={true} timeout={700}>
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        height="40vh"
        gap={2}
      >
        {/* Animated Circular Progress */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.5 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <CircularProgress 
            size={70} 
            thickness={4.5} 
            sx={{
              color: "linear-gradient(45deg, #1976d2, #42a5f5)", // Gradient effect
            }}
          />
        </motion.div>

        {/* Stylized Loading Message */}
        <Typography 
          variant="h6" 
          color="textSecondary"
          sx={{ 
            fontWeight: "bold", 
            fontStyle: "italic", 
            letterSpacing: 1.2, 
            textTransform: "uppercase",
            background: "linear-gradient(45deg, #1976d2, #42a5f5)", 
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loader;
