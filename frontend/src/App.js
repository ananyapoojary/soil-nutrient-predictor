import React from "react";
import { Container, Typography } from "@mui/material";
import MapView from "./components/MapView";
import "./styles.css";

const App = () => {
  return (
    <Container maxWidth="lg" className="app-container">
      <Typography variant="h4" align="center" gutterBottom>
        🌿 Soil Nutrient Predictor
      </Typography>
      <MapView />
    </Container>
  );
};

export default App;
