import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { CircularProgress, Box, Snackbar, Alert, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import DataCard from "./DataCard";
import "../styles.css";

// ✅ Custom marker icon
import soilIcon from "../assets/soil-icon.png"; 

const MapView = () => {
  const [position, setPosition] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // ✅ State for manual input fields
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");

  // ✅ Custom Leaflet icon
  const customIcon = new L.Icon({
    iconUrl: soilIcon,
    iconSize: [40, 40], 
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  });

  // ✅ Click handler for map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        await fetchData(lat, lng);
      },
    });
    return null;
  };

  // ✅ Function to fetch data by lat/lon
  const fetchData = async (lat, lon) => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(`http://localhost:5000/api/soil?lat=${lat}&lon=${lon}`);
      setSoilData(response.data);
    } catch (error) {
      console.error("Failed to fetch soil data", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handler for manual lat/lon submit
  const handleManualSubmit = () => {
    if (manualLat && manualLon) {
      setPosition([parseFloat(manualLat), parseFloat(manualLon)]);
      fetchData(manualLat, manualLon);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      {/* ✅ Manual Input Section */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
        <TextField
          label="Latitude"
          variant="outlined"
          value={manualLat}
          onChange={(e) => setManualLat(e.target.value)}
          type="number"
          style={{ width: "150px" }}
        />
        <TextField
          label="Longitude"
          variant="outlined"
          value={manualLon}
          onChange={(e) => setManualLon(e.target.value)}
          type="number"
          style={{ width: "150px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleManualSubmit}
          disabled={loading}
        >
          Fetch Data
        </Button>
      </Box>

      {/* ✅ Map Section */}
      <MapContainer center={[20, 77]} zoom={5} style={{ height: "65vh", width: "100%", marginTop: "20px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler />

        {position && (
          <Marker position={position} icon={customIcon}>
            <Popup>
              <strong>📍 Location:</strong><br />
              Latitude: {position[0]} <br />
              Longitude: {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ✅ Loader and Error Display */}
      <Box display="flex" justifyContent="center" mt={2}>
        {loading && <CircularProgress />}
        {error && (
          <Snackbar open autoHideDuration={4000}>
            <Alert severity="error">Failed to fetch soil data!</Alert>
          </Snackbar>
        )}
      </Box>

      {/* ✅ Display Soil Data */}
      {soilData && <DataCard data={soilData} />}
    </div>
  );
};

export default MapView;
