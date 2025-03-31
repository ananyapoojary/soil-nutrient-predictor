import pandas as pd
import joblib

# Load the models and scaler
best_p_model = joblib.load('best_p_model.pkl')
best_k_model = joblib.load('best_k_model.pkl')
scaler = joblib.load('scaler.pkl')

# Function to predict P and K values
def predict_p_k(n, temperature, humidity, ph):
    features = pd.DataFrame([[n, temperature, humidity, ph]], 
                            columns=['N', 'temperature', 'humidity', 'ph'])
    features_scaled = scaler.transform(features)
    
    p_value = best_p_model.predict(features_scaled)[0]
    k_value = best_k_model.predict(features_scaled)[0]
    
    return {'Phosphorus': p_value, 'Potassium': k_value}

# Example usage
if __name__ == '__main__':
    n = 90
    temperature = 25.5
    humidity = 75
    ph = 6.8
    result = predict_p_k(n, temperature, humidity, ph)
    print("Predicted Values:", result)
