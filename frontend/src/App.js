import React from "react";
import { ThemeProvider, createTheme, CssBaseline, Container, Typography } from "@mui/material";
import MapView from "./components/MapView";
import DataCard from "./components/DataCard";  // Import your DataCard component
import "./styles.css";

// ✅ Define the theme correctly
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",  // ✅ Ensure paper is defined
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  }
});

// ✅ Define the App function correctly
const App = () => {
  // const mockData = {
  //   lat: 15.7039,
  //   lon: 84.4848,
  //   elevation: 300,
  //   nitrogen: 40,
  //   predictions: {
  //     phosphorus: 12,
  //     potassium: 220
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
        <Typography variant="h4" align="center" gutterBottom>
          Soil Nutrient Predictor
        </Typography>
        
        {/* Map Component */}
        <MapView />

        {/* Mock Data Display
        <DataCard data={mockData} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default App;
