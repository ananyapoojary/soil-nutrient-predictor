import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import joblib

# Load the dataset
file_path = "Crop_recommendation.csv"  # Ensure the CSV is in the same directory
data = pd.read_csv(file_path)

# Define features and targets
X = data[['N', 'temperature', 'humidity', 'ph']]
y = data[['P', 'K']]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Define the parameter grid
param_grid = {
    'n_estimators': [300, 500, 700],
    'max_depth': [20, 30, 50],
    'min_samples_split': [2, 4, 6],
    'min_samples_leaf': [1, 2, 4],
    'max_features': ['sqrt', 'log2']
}

# Grid search with 5-fold cross-validation
rf_p = RandomForestRegressor(random_state=42)
rf_k = RandomForestRegressor(random_state=42)

grid_p = GridSearchCV(estimator=rf_p, param_grid=param_grid, cv=5, n_jobs=-1, scoring='r2')
grid_k = GridSearchCV(estimator=rf_k, param_grid=param_grid, cv=5, n_jobs=-1, scoring='r2')

grid_p.fit(X_train_scaled, y_train['P'])
grid_k.fit(X_train_scaled, y_train['K'])

# Best models
best_p_model = grid_p.best_estimator_
best_k_model = grid_k.best_estimator_

# Save models and scaler
joblib.dump(best_p_model, 'best_p_model.pkl')
joblib.dump(best_k_model, 'best_k_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Predictions
p_pred = best_p_model.predict(X_test_scaled)
k_pred = best_k_model.predict(X_test_scaled)

# Evaluate performance
mse_p = mean_squared_error(y_test['P'], p_pred)
mse_k = mean_squared_error(y_test['K'], k_pred)
r2_p = r2_score(y_test['P'], p_pred)
r2_k = r2_score(y_test['K'], k_pred)

print(f"Phosphorus - R2: {r2_p}, MSE: {mse_p}")
print(f"Potassium - R2: {r2_k}, MSE: {mse_k}")
