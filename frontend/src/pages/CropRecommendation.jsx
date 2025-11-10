import React from "react";
import CropForm from "../components/Form";

export default function CropRecommendation() {
  return (
    <div className="flex justify-center items-center py-10 bg-green-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
          🌿 Crop Recommendation
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your soil and weather details below to get the best crop suggestion.
        </p>
        <CropForm />
      </div>
    </div>
  );
}
