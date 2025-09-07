from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

# Load model and scaler
model = joblib.load("diabete_health.pkl")
scaler = joblib.load("scaler.pkl")

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost:3000",  # React dev server
    # you can add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],    # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)

# Input schema
class InputData(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(data: InputData):
    X_new = np.array([data.features])
    X_new_scaled = scaler.transform(X_new)
    y_prob = model.predict_proba(X_new_scaled)[:, 1][0]
    return {"diabetes_risk": f"{y_prob*100:.2f}%"}
