# %%
import pandas as pd
import matplotlib.pyplot as plt
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import *
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

# %%
df = pd.read_csv("housing.csv")

# %%
print(df.info())
print(df.head())
df.shape
df.columns

# %%
df = df.dropna()
df.shape

# %%
df = pd.get_dummies(df, columns=["ocean_proximity"], dtype=int, drop_first=True)
print(df.head(1))
df.columns

# %%
y = df["median_house_value"]
x = df.drop(columns="median_house_value")
print(x.head(1))
print(y.head(1))

# %%
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)
print(x_train.head(1))
print(x_test.head(1))
print(y_train.head(1))
print(y_test.head(1))

# %%
print(x_train.shape)
print(x_test.shape)
print(y_train.shape)
print(y_test.shape)

# %%
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

# %%
model = LinearRegression()
model.fit(x_train_scaled, y_train)
y_predicted = model.predict(x_test_scaled)

# %%
mae = mean_absolute_error(y_test, y_predicted)
mse = mean_squared_error(y_test, y_predicted)
r2s = r2_score(y_test, y_predicted)
print("MAE: ", mae, "\nMSE: ", mse, "\nR2S: ", r2s)

# %%
regressor = RandomForestRegressor(n_estimators=100, random_state=42)
regressor.fit(x_train, y_train)
y_reg_pred = regressor.predict(x_test)

# %%
mae = mean_absolute_error(y_test, y_reg_pred)
mse = mean_squared_error(y_test, y_reg_pred)
r2s = r2_score(y_test, y_reg_pred)
print("MAE: ", mae, "\nMSE: ", mse, "\nR2S: ", r2s)

# %%
xgb = XGBRegressor(n_estimators=300, learning_rate=0.1, random_state=42)
xgb.fit(x_train, y_train)
y_xgb_pred = xgb.predict(x_test)

# %%
mae = mean_absolute_error(y_test, y_xgb_pred)
mse = mean_squared_error(y_test, y_xgb_pred)
r2s = r2_score(y_test, y_xgb_pred)
print("MAE: ", mae, "\nMSE: ", mse, "\nR2S: ", r2s)

# %%
joblib.dump(xgb, "xgb.joblib")
joblib.dump(scaler, "scaler.joblib")
