const express = require("express");
const { fetchSoilData, predictNutrients } = require("../controllers/soilController");
const router = express.Router();

router.get("/soil", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const soilData = await fetchSoilData(lat, lon);
    const predictions = predictNutrients(soilData);
    res.json({ ...soilData, predictions });
  } catch (error) {
    console.error("Error fetching soil data:", error);
    res.status(500).json({ message: "Failed to fetch soil data" });
  }
});

module.exports = router;
