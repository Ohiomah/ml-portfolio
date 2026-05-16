from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from transformers import pipeline
model = joblib.load("xgb.joblib")
sentiment_model = pipeline("sentiment-analysis")

@app.post("/predict")
def predict(data: dict):
    features = list(data.values())
    array = np.array(features)
    array = array.reshape(1, -1)
    predicted = model.predict(array)
    return {"predicted_price": float(predicted[0])}

@app.post("/sentiment")
def sentiment(data: dict):
    review = data["review"]
    result = sentiment_model(review)
    return {
        "label": result[0]["label"],
        "score": round(result[0]["score"] * 100, 2)
    }