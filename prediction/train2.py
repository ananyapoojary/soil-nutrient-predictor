import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load dataset
df = pd.read_csv("soil_dataset.csv")  # Ensure it has columns: Temp, Humidity, pH, Rainfall, N, P, K

# Define features & target variables
X = df[['Temperature', 'Humidity', 'pH', 'Rainfall']]
y = df[['N', 'P', 'K']]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "soil_npk_model.pkl")
print("Model trained & saved!")
