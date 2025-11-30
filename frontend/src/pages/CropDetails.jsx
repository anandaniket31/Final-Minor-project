import React, { useState } from "react";
import { Droplets, Thermometer, Sprout, MapPin, Search, ArrowLeft, Beaker, Wind, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { soilData } from "../utils/soilData";

// Mock Data for Crop Requirements
const cropData = [
  { name: "Rice", soil: "Clayey / Loamy", water: "High (100-200cm)", temp: "20–37°C", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80" },
  { name: "Wheat", soil: "Loamy / Clay Loam", water: "Moderate (50-75cm)", temp: "10–25°C", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80" },
  { name: "Maize", soil: "Sandy Loam", water: "Moderate (50-100cm)", temp: "18–27°C", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80" },
  { name: "Cotton", soil: "Black Soil", water: "Moderate (50-100cm)", temp: "21–30°C", img: "https://images.unsplash.com/photo-1595126730973-04e33e38de28?auto=format&fit=crop&w=800&q=80" },
  { name: "Sugarcane", soil: "Deep Loamy", water: "High (150-250cm)", temp: "20–35°C", img: "https://images.unsplash.com/photo-1601625463687-25541fb72f62?auto=format&fit=crop&w=800&q=80" },
  { name: "Tea", soil: "Acidic Loam", water: "High (150-300cm)", temp: "15–30°C", img: "https://images.unsplash.com/photo-1564860145639-e9878202a820?auto=format&fit=crop&w=800&q=80" },
  { name: "Coffee", soil: "Red Loamy", water: "High (150-250cm)", temp: "15–28°C", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" },
  { name: "Potato", soil: "Sandy Loam", water: "Moderate (50-75cm)", temp: "15–25°C", img: "https://images.unsplash.com/photo-1518977676651-b53c82a63460?auto=format&fit=crop&w=800&q=80" },
  { name: "Tomato", soil: "Loamy / Sandy", water: "Moderate (60-100cm)", temp: "18–27°C", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
  { name: "Mustard", soil: "Sandy Loam", water: "Low (25-40cm)", temp: "10–25°C", img: "https://images.unsplash.com/photo-1505569127510-bde15360d7f6?auto=format&fit=crop&w=800&q=80" },
];

export default function CropDetails() {
  const { t } = useLanguage();
  const [view, setView] = useState("selection"); // 'selection', 'soil', 'crop'
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [soilResult, setSoilResult] = useState(null);
  const [cropSearch, setCropSearch] = useState("");
  const [error, setError] = useState("");

  const handleSoilSearch = () => {
    if (selectedState && selectedDistrict && soilData[selectedState] && soilData[selectedState][selectedDistrict]) {
      setSoilResult({ city: selectedDistrict, ...soilData[selectedState][selectedDistrict] });
      setError("");
    } else {
      setSoilResult(null);
      setError(t("cropDetails.errorCity"));
    }
  };

  const filteredCrops = cropData.filter(c =>
    c.name.toLowerCase().includes(cropSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-12 px-6 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1579710759509-4af7320c5d1b?auto=format&fit=crop&w=1600&q=80"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-heading mb-2">{t("cropDetails.title")}</h2>
          <p className="text-gray-600 text-lg">{t("cropDetails.subtitle")}</p>
        </div>

        {/* SELECTION VIEW */}
        {view === "selection" && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100 cursor-pointer group"
              onClick={() => setView("soil")}
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Beaker size={32} className="text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("cropDetails.soilAnalysis")}</h3>
              <p className="text-gray-600">{t("cropDetails.soilAnalysisDesc")}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100 cursor-pointer group"
              onClick={() => setView("crop")}
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Sprout size={32} className="text-orange-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("cropDetails.cropRequirements")}</h3>
              <p className="text-gray-600">{t("cropDetails.cropRequirementsDesc")}</p>
            </motion.div>
          </div>
        )}

        {/* SOIL ANALYSIS VIEW */}
        {view === "soil" && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => { setView("selection"); setSoilResult(null); setSelectedState(""); setSelectedDistrict(""); setError(""); }}
              className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft size={20} /> {t("cropDetails.back")}
            </button>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {/* State Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("cropDetails.selectState")}</label>
                  <div className="relative">
                    <input
                      list="state-list"
                      value={selectedState}
                      onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                      placeholder={t("cropDetails.selectState")}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                    />
                    <datalist id="state-list">
                      {Object.keys(soilData).map((state) => (
                        <option key={state} value={state} />
                      ))}
                    </datalist>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                {/* District Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("cropDetails.selectDistrict")}</label>
                  <div className="relative">
                    <input
                      list="district-list"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      disabled={!selectedState}
                      placeholder={t("cropDetails.selectDistrict")}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
                    />
                    <datalist id="district-list">
                      {selectedState && soilData[selectedState] && Object.keys(soilData[selectedState]).map((district) => (
                        <option key={district} value={district} />
                      ))}
                    </datalist>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSoilSearch}
                disabled={!selectedState || !selectedDistrict}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl mb-6"
              >
                {t("cropDetails.search")}
              </button>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 border border-red-100">
                  {error}
                </div>
              )}

              {soilResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MapPin className="text-primary" />
                    {t("cropDetails.soilReport")} <span className="text-primary capitalize">{soilResult.city}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500 block mb-1">{t("cropDetails.soil")}</span>
                      <span className="text-lg font-semibold text-gray-800">{soilResult.type}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500 block mb-1">{t("cropDetails.ph")}</span>
                      <span className="text-lg font-semibold text-gray-800">{soilResult.ph}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500 block mb-1">{t("cropDetails.nitrogen")}</span>
                      <span className="text-lg font-semibold text-blue-600">{soilResult.n}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500 block mb-1">{t("cropDetails.phosphorus")}</span>
                      <span className="text-lg font-semibold text-orange-600">{soilResult.p}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500 block mb-1">{t("cropDetails.potassium")}</span>
                      <span className="text-lg font-semibold text-purple-600">{soilResult.k}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-sm text-gray-500 block mb-1">{t("cropDetails.moisture")}</span>
                      <span className="text-lg font-semibold text-cyan-600">{soilResult.moisture}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* CROP REQUIREMENTS VIEW */}
        {view === "crop" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <button
                onClick={() => setView("selection")}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors self-start md:self-auto"
              >
                <ArrowLeft size={20} /> {t("cropDetails.back")}
              </button>

              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t("cropDetails.searchCrop")}
                  value={cropSearch}
                  onChange={(e) => setCropSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCrops.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Sprout size={24} className="text-accent" /> {c.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <Beaker size={16} className="text-green-600" /> {t("cropDetails.soil")}
                      </div>
                      <span className="font-semibold text-green-800 text-right text-sm">{c.soil}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <Droplets size={16} className="text-blue-500" /> {t("cropDetails.water")}
                      </div>
                      <span className="font-semibold text-blue-800 text-right text-sm">{c.water}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <Thermometer size={16} className="text-orange-500" /> {t("cropDetails.temp")}
                      </div>
                      <span className="font-semibold text-orange-800 text-right text-sm">{c.temp}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
