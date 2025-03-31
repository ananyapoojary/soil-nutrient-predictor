import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Box, Divider, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DataCard = ({ data }) => {
  const { lat, lon, elevation, nitrogen, predictions, ...allData } = data;
  const [open, setOpen] = useState(false);

  // ✅ Check for missing values
  const isDataAvailable = (
    elevation !== null &&
    nitrogen !== null &&
    predictions &&
    predictions.phosphorus !== null &&
    predictions.potassium !== null
  );

  // 🔥 Toggle Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box mt={4}>
      <Card 
        variant="outlined" 
        sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {isDataAvailable ? "🌾 Soil Data & Predictions" : "⚠️ Data Unavailable"}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {isDataAvailable ? (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Latitude:</strong> {lat}</Typography>
                <Typography variant="body1"><strong>Longitude:</strong> {lon}</Typography>
                <Typography variant="body1"><strong>Elevation:</strong> {elevation ?? "N/A"} m</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1"><strong>Nitrogen:</strong> {nitrogen ?? "N/A"} mg/kg</Typography>
                <Typography variant="body1">
                  <strong>Phosphorus:</strong> {predictions.phosphorus ?? "N/A"} mg/kg
                </Typography>
                <Typography variant="body1">
                  <strong>Potassium:</strong> {predictions.potassium ?? "N/A"} mg/kg
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="warning" sx={{ mt: 2 }}>
              🚫 No soil data available for this location. Please try another area.
            </Alert>
          )}

          {/* 🔥 Display All Data Button */}
          {isDataAvailable && (
            <Box mt={3} display="flex" justifyContent="center">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleOpen}
                sx={{ textTransform: "none", borderRadius: "8px" }}
              >
                Show All Data
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* 🔥 Dialog with All Data */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>📊 All Available Soil Data</DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Parameter</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(allData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
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
