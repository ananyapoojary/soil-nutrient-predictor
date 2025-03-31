import React from "react";
import ReactDOM from "react-dom";
import "leaflet/dist/leaflet.css";    // ✅ Import Leaflet CSS globally
import App from "./App";
import "./styles.css";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById("root"));

// Measure performance
reportWebVitals();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
