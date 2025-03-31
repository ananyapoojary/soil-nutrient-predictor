from flask import Flask, request, jsonify
import requests
import pandas as pd

app = Flask(__name__)

# ✅ Hybrid model weights
ALPHA = 0.5  # 50% Scientific, 50% Kaggle

# ✅ Soil data fetching function
def fetch_soil_data(lat, lon):
    """Fetch soil data from multiple APIs."""
    elevation_api = f"https://api.open-elevation.com/api/v1/lookup?locations={lat},{lon}"
    soil_api = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}"

    elevation_response = requests.get(elevation_api).json()
    soil_response = requests.get(soil_api).json()

    try:
        elevation = elevation_response['results'][0]['elevation']
        properties = soil_response['properties']['layers']

        data = {
            "Latitude": lat,
            "Longitude": lon,
            "Elevation": elevation,
            "Mean Temperature": 25,  # Static value (replace with dynamic data if available)
            "Humidity": 60,         # Static value (replace with dynamic data if available)
            "Rainfall": 120,        # Static value (replace with dynamic data if available)
        }

        # Extracting soil parameters
        for layer in properties:
            name = layer['name']
            value = layer['depths'][0]['values']['mean']
            data[name] = value

        return data

    except Exception as e:
        return {"error": str(e)}

# ✅ Hybrid model calculation function
def calculate_hybrid_model(data):
    """Apply hybrid formula to soil data."""

    # ✅ Scientific formulae
    scientific_n = 2.5 * data['soc'] + 0.4 * data['clay'] + 0.2 * data['cec']
    scientific_p = 1.8 * data['soc'] - 0.3 * data['phh2o'] + 0.2 * data['Rainfall']
    scientific_k = 1.5 * data['clay'] + 0.2 * data['phh2o'] + 0.3 * data['Rainfall']

    # ✅ Kaggle formulae
    kaggle_n = (
        0.0083 * data['Mean Temperature'] + 
        0.3065 * data['Humidity'] + 
        5.0813 * data['phh2o'] + 
        0.0447 * data['Rainfall'] - 8.9525
    )
    kaggle_p = (
        -0.7596 * data['Mean Temperature'] - 
        0.1370 * data['Humidity'] - 
        6.9668 * data['phh2o'] - 
        0.0507 * data['Rainfall'] + 132.9677
    )
    kaggle_k = (
        -2.1513 * data['Mean Temperature'] + 
        0.5601 * data['Humidity'] - 
        13.0846 * data['phh2o'] - 
        0.1003 * data['Rainfall'] + 158.1141
    )

    # ✅ Hybrid model formula
    hybrid_n = ALPHA * scientific_n + (1 - ALPHA) * kaggle_n
    hybrid_p = ALPHA * scientific_p + (1 - ALPHA) * kaggle_p
    hybrid_k = ALPHA * scientific_k + (1 - ALPHA) * kaggle_k

    return {
        "Hybrid_N": round(hybrid_n, 2),
        "Hybrid_P": round(hybrid_p, 2),
        "Hybrid_K": round(hybrid_k, 2)
    }

# ✅ API route for fetching and predicting
@app.route('/predict', methods=['GET'])
def predict():
    lat = float(request.args.get('lat'))
    lon = float(request.args.get('lon'))

    # ✅ Fetch soil data
    soil_data = fetch_soil_data(lat, lon)

    if "error" in soil_data:
        return jsonify({"error": "Failed to fetch soil data"})

    # ✅ Calculate hybrid model
    predictions = calculate_hybrid_model(soil_data)

    # ✅ Send combined data
    return jsonify({
        "location": {"lat": lat, "lon": lon},
        "soil_data": soil_data,
        "predictions": predictions
    })

if __name__ == '__main__':
    app.run(debug=True)
