import React from "react";

export default function Advisory() {
  const tips = [
    "Rotate crops every season to improve soil fertility.",
    "Water early morning to reduce evaporation.",
    "Use organic fertilizers when possible.",
    "Monitor pest activity regularly."
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-yellow-600">Advisory Tips</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        {tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
      </ul>
    </div>
  );
}
