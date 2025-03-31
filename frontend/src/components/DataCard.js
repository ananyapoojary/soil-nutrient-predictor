import React from "react";
import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";

const DataCard = ({ data }) => {
  return (
    <Box mt={4}>
      <Card variant="outlined" sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>🌾 Soil Data & Predictions</Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Latitude:</strong> {data.lat}</Typography>
              <Typography variant="body1"><strong>Longitude:</strong> {data.lon}</Typography>
              <Typography variant="body1"><strong>Elevation:</strong> {data.elevation} m</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1"><strong>Nitrogen:</strong> {data.nitrogen} mg/kg</Typography>
              <Typography variant="body1"><strong>Phosphorus:</strong> {data.predictions.phosphorus} mg/kg</Typography>
              <Typography variant="body1"><strong>Potassium:</strong> {data.predictions.potassium} mg/kg</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DataCard;
