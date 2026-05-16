from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://ml-portfolio-eight.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("xgb.joblib")
sentiment_model = joblib.load("sentiment_model.joblib")
tfidf = joblib.load("tfidf_vectorizer.joblib")

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
    cleaned = review.lower()
    vectorized = tfidf.transform([cleaned])
    prediction = sentiment_model.predict(vectorized)
    score = sentiment_model.predict_proba(vectorized)
    label = "POSITIVE" if prediction[0] == 1 else "NEGATIVE"
    confidence = round(max(score[0]) * 100, 2)
    return {
        "label": label,
        "score": confidence
    }