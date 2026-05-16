# ML Portfolio

A collection of machine learning projects with a shared React dashboard and FastAPI backend.

## Projects

### 1. House Price Predictor

Predicts California median house prices using real census data.

| Model             | MAE     | R²    |
| ----------------- | ------- | ----- |
| Linear Regression | $50,413 | 0.649 |
| Random Forest     | $31,678 | 0.826 |
| XGBoost           | $31,015 | 0.835 |

### 2. Sentiment Analysis

Classifies movie reviews as positive or negative using both traditional ML and transformer models.

| Model                   | Accuracy |
| ----------------------- | -------- |
| Logistic Regression     | 89.17%   |
| Linear SVC              | 88.17%   |
| Naive Bayes             | 85.53%   |
| HuggingFace Transformer | ~99%     |

## Tech Stack

- **ML**: Python, scikit-learn, XGBoost, HuggingFace Transformers, PyTorch
- **Backend**: FastAPI, uvicorn
- **Frontend**: React, Vite, Tailwind CSS

## How to Run

### Backend

```bash
cd house-price/backend
source .venv/bin/activate
uvicorn main:app --reload
```

### Frontend

```bash
cd house-price/frontend
npm install
npm run dev
```

Then open http://localhost:5173

## Deployment Notes

- The deployed version uses Logistic Regression for sentiment analysis (89% accuracy) due to free tier memory limits
- To run the transformer version (99% accuracy) locally:
  1. Run `sentiment-analysis/notebook/sentiment.ipynb` to regenerate `transformer_sentiment.joblib`
  2. In `main.py`, replace the joblib loads with:

```python
     from transformers import pipeline
     sentiment_model = pipeline("sentiment-analysis")
```

3. Run `uvicorn main:app --reload` locally

## Data

- House prices: [California Housing Dataset](https://www.kaggle.com/datasets/camnugent/california-housing-prices)
- Sentiment: [IMDB Movie Reviews](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)
