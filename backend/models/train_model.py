import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load dataset
data = pd.read_csv("soil_data.csv")

X = data[["latitude", "longitude", "nitrogen", "cec", "sand", "silt", "clay"]]
y_p = data["phosphorus"]
y_k = data["potassium"]

X_train, X_test, y_p_train, y_p_test = train_test_split(X, y_p, test_size=0.2)
X_train, X_test, y_k_train, y_k_test = train_test_split(X, y_k, test_size=0.2)

# Train models
p_model = RandomForestRegressor(n_estimators=500)
k_model = RandomForestRegressor(n_estimators=500)

p_model.fit(X_train, y_p_train)
k_model.fit(X_train, y_k_train)

# Save models
joblib.dump(p_model, "p_model.pkl")
joblib.dump(k_model, "k_model.pkl")
