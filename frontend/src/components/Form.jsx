import React, { useState } from "react";
import { predictCrop } from "../api/api";

function CropForm() {
  const [formData, setFormData] = useState({
    N: "", P: "", K: "",
    temperature: "", humidity: "",
    ph: "", rainfall: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(""); setError("");
    try {
      const res = await predictCrop(formData);
      setResult(res.predicted_crop);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please check server logs.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Crop Recommendation</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key.toUpperCase()}
            className="border rounded-lg p-2"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Predict Crop
        </button>
      </form>

      {result && (
        <div className="mt-4 text-center text-lg text-green-700 font-semibold">
          🌱 Recommended Crop: {result}
        </div>
      )}
      {error && (
        <div className="mt-4 text-center text-red-600 font-semibold">{error}</div>
      )}
    </div>
  );
}

export default CropForm;
