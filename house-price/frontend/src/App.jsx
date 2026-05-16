import { useState } from "react";

const API_URL = "http://localhost:8000";

function App() {
  const [formData, setFormData] = useState({
    longitude: 0,
    latitude: 0,
    housing_median_age: 0,
    total_rooms: 0,
    total_bedrooms: 0,
    population: 0,
    households: 0,
    median_income: 0,
    ocean_proximity_INLAND: 0,
    ocean_proximity_ISLAND: 0,
    "ocean_proximity_NEAR BAY": 0,
    "ocean_proximity_NEAR OCEAN": 0,
  });

  const [activeTab, setActiveTab] = useState("house");
  const [prediction, setPrediction] = useState(null);
  const [oceanProximity, setOceanProximity] = useState("INLAND");

  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]:
        value === "" || value === "-" ? value : parseFloat(e.target.value),
    });
  };

  const handleOceanChange = (e) => {
    setOceanProximity(e.target.value);
    setFormData({
      ...formData,
      ocean_proximity_INLAND: 0,
      ocean_proximity_ISLAND: 0,
      "ocean_proximity_NEAR BAY": 0,
      "ocean_proximity_NEAR OCEAN": 0,
      [e.target.value]: 1,
    });
  };

  const handleSubmit = async () => {
    const parsedData = Object.fromEntries(
      Object.entries(formData).map(([key, val]) => [key, parseFloat(val) || 0]),
    );
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setPrediction(
      data.predicted_price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    );
  };

  const handleSentiment = async () => {
    const response = await fetch(`${API_URL}/sentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: review }),
    });
    const data = await response.json();
    setSentiment(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-12">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("house")}
          className={`px-6 py-2 rounded-lg font-bold transition-colors ${
            activeTab === "house"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          House Price
        </button>
        <button
          onClick={() => setActiveTab("sentiment")}
          className={`px-6 py-2 rounded-lg font-bold transition-colors ${
            activeTab === "sentiment"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Sentiment Analysis
        </button>
      </div>
      {activeTab === "house" && (
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl text-white text-center">
            House Price Predictor
          </h1>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Longitude
            </label>
            <input
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Latitude</label>
            <input
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              House Age (years)
            </label>
            <input
              name="housing_median_age"
              value={formData.housing_median_age}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Total Rooms
            </label>
            <input
              name="total_rooms"
              value={formData.total_rooms}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Total Bedrooms
            </label>
            <input
              name="total_bedrooms"
              value={formData.total_bedrooms}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Population
            </label>
            <input
              name="population"
              value={formData.population}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Number of Households
            </label>
            <input
              name="households"
              value={formData.households}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Median Income
            </label>
            <input
              name="median_income"
              value={formData.median_income}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">
              Select Ocean Proximity
            </label>
            <select
              value={oceanProximity}
              onChange={handleOceanChange}
              className="w-full h-12 bg-gray-800 text-white rounded-lg p-3 border-gray-700 focus:outlinne-none focus:border-blue-500"
            >
              <option value="ocean_proximity_INLAND">Inland</option>
              <option value="ocean_proximity_ISLAND">Island</option>
              <option value="ocean_proximity_NEAR BAY">Near Bay</option>
              <option value="ocean_proximity_NEAR OCEAN">Near Ocean</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg mt-6 transition-colors"
          >
            Predict
          </button>

          {prediction && (
            <h2 className="my-4 text-center text-white">
              Predicted Price: {prediction}
            </h2>
          )}
        </div>
      )}
      {activeTab === "sentiment" && (
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl text-white text-center">
            Sentiment Analysis
          </h1>

          <div className="my-4">
            <textarea
              name="review_data"
              placeholder="Please enter review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full text-white border border-gray-700 bg-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            ></textarea>

            <button
              onClick={handleSentiment}
              className="w-full h-10 bg-blue-600 rounded-lg text-white font-bold mt-6 transition-colors hover:bg-blue-700"
            >
              Submit
            </button>

            {sentiment && (
              <div className="my-4 text-center">
                <h2 className="my-4 text-center text-white">
                  {sentiment.label}
                </h2>
                <h2 className="my-4 text-center text-white">
                  Confidence: {sentiment.score}%
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
