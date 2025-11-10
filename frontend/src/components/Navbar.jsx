import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">SmartFarm</h1>
        <ul className="flex gap-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/crop-recommendation">Crop Recommendation</Link></li>
          <li><Link to="/weather">Weather</Link></li>
          <li><Link to="/advisory">Advisory</Link></li>
          <li><Link to="/crop-details">Crop Details</Link></li>
        </ul>
      </div>
    </nav>
  );
}
