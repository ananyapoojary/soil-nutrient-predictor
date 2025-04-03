import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { motion } from "framer-motion";

// 🌟 Neumorphic Card Design
const StyledCard = styled(Card)(({ theme }) => ({
  padding: "30px",
  background: theme.palette.background.paper,
  borderRadius: "20px",
  boxShadow: "4px 4px 12px rgba(0,0,0,0.1), -4px -4px 12px rgba(255,255,255,0.6)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "6px 6px 18px rgba(0,0,0,0.15), -6px -6px 18px rgba(255,255,255,0.6)",
  },
}));

// 🌟 Animated Button
const StyledButton = styled(motion(Button))(({ theme }) => ({
  textTransform: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  padding: "10px 20px",
  background: theme.palette.primary.main,
  transition: "background 0.3s ease-in-out",
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

const DataCard = ({ data }) => {
  const theme = useTheme();
  const { lat, lon, elevation, nitrogen, predictions, ...allData } = data;
  const [open, setOpen] = useState(false);

  // ✅ Check for missing values
  const isDataAvailable =
    elevation !== null &&
    nitrogen !== null &&
    predictions &&
    predictions.phosphorus !== null &&
    predictions.potassium !== null;

  // 🔥 Toggle Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box mt={4}>
      <StyledCard>
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "primary.main",
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            gutterBottom
          >
            {isDataAvailable ? "🌾 Soil Data & Predictions" : "⚠️ Data Unavailable"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {isDataAvailable ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body1" color="textSecondary">
                  <strong>📍 Latitude:</strong> {lat}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>📍 Longitude:</strong> {lon}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>🏔️ Elevation:</strong> {elevation ?? "N/A"} m
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" color="success.main">
                  <strong>🌿 Nitrogen:</strong> {nitrogen ?? "N/A"} mg/kg
                </Typography>
                <Typography variant="body1" color="success.main">
                  <strong>💧 Phosphorus:</strong> {predictions.phosphorus ?? "N/A"} mg/kg
                </Typography>
                <Typography variant="body1" color="success.main">
                  <strong>🌱 Potassium:</strong> {predictions.potassium ?? "N/A"} mg/kg
                </Typography>
              </Box>
            </Box>
          ) : (
            <Alert severity="warning" sx={{ mt: 2 }}>
              🚫 No soil data available for this location. Please try another area.
            </Alert>
          )}

          {/* 🔥 Display All Data Button */}
          {isDataAvailable && (
            <Box mt={4} display="flex" justifyContent="center">
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show All Data
              </StyledButton>
            </Box>
          )}
        </CardContent>
      </StyledCard>

      {/* 🔥 Dialog with All Data */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>📊 All Available Soil Data</DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: theme.palette.grey[200] }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(allData).map(([key, value], index) => (
                  <TableRow
                    key={key}
                    sx={{
                      background: index % 2 === 0 ? theme.palette.grey[50] : "white",
                    }}
                  >
                    <TableCell sx={{ textTransform: "capitalize" }}>{key.replace(/_/g, " ")}</TableCell>
                    <TableCell>{value !== null ? value : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataCard;
