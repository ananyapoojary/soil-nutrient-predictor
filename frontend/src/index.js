import React from "react";
import ReactDOM from "react-dom/client";  // Use the new createRoot API
import App from "./App";
import "leaflet/dist/leaflet.css";   // ✅ Import Leaflet CSS globally

import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
