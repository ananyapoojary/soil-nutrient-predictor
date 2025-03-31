import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { CircularProgress, Box, Snackbar, Alert } from "@mui/material";
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

  // 🔥 Custom Leaflet icon
  const customIcon = new L.Icon({
    iconUrl: soilIcon,
    iconSize: [40, 40],  // Custom icon size
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  });

  // 🔥 Click handler with marker animation
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setLoading(true);
        setError(false);

        try {
          const response = await axios.get(`http://localhost:5000/api/soil?lat=${lat}&lon=${lng}`);
          setSoilData(response.data);
        } catch (error) {
          console.error("Failed to fetch soil data", error);
          setError(true);
        } finally {
          setLoading(false);
        }
      },
    });
    return null;
  };

  return (
    <div>
      <MapContainer center={[20, 77]} zoom={5} style={{ height: "75vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
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

      <Box display="flex" justifyContent="center" mt={2}>
        {loading && <CircularProgress />}
        {error && (
          <Snackbar open autoHideDuration={4000}>
            <Alert severity="error">Failed to fetch soil data!</Alert>
          </Snackbar>
        )}
      </Box>

      {soilData && <DataCard data={soilData} />}
    </div>
  );
};

export default MapView;
