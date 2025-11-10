import React from "react";

export default function CropDetails() {
  const crops = [
    { name: "Rice", soil: "Loamy", water: "High", temp: "20–37°C" },
    { name: "Wheat", soil: "Clay Loam", water: "Moderate", temp: "10–25°C" },
    { name: "Maize", soil: "Sandy Loam", water: "Low", temp: "18–27°C" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-600">Crop Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Crop</th>
            <th className="border p-3">Soil Type</th>
            <th className="border p-3">Water Requirement</th>
            <th className="border p-3">Temperature Range</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((c, idx) => (
            <tr key={idx}>
              <td className="border p-3">{c.name}</td>
              <td className="border p-3">{c.soil}</td>
              <td className="border p-3">{c.water}</td>
              <td className="border p-3">{c.temp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
