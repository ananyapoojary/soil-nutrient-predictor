const axios = require("axios");

const fetchSoilData = async (lat, lon) => {
  const elevationUrl = `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`;
  const soilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}`;

  const [elevationRes, soilRes] = await Promise.all([
    axios.get(elevationUrl),
    axios.get(soilUrl),
  ]);

  const elevation = elevationRes.data.results[0].elevation;

  const soilData = {};
  const layers = soilRes.data.properties.layers;
  layers.forEach((layer) => {
    const property = layer.name;
    const meanValue = layer.depths[0].values.mean;
    soilData[property] = meanValue;
  });

  return { lat, lon, elevation, ...soilData };
};

const predictNutrients = (data) => {
  const { nitrogen, cec, sand, silt, clay } = data;

  const phosphorus = (0.05 * nitrogen) + (0.01 * cec);
  const potassium = (0.1 * sand) + (0.03 * silt) + (0.02 * clay);

  return {
    phosphorus: phosphorus.toFixed(2),
    potassium: potassium.toFixed(2),
  };
};

module.exports = { fetchSoilData, predictNutrients };
