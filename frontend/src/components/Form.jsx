import React, { useState } from "react";
import { predictCrop } from "../api/api";
import { Loader2, Leaf, Droplets, Thermometer, Wind, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

function CropForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");
    setError("");
    setLoading(true);
    try {
      const res = await predictCrop(formData);
      setResult(res.predicted_crop);
    } catch (err) {
      console.error(err);
      setError(t("cropRecommendation.form.error"));
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    { name: "N", label: t("cropRecommendation.form.nitrogen"), icon: <FlaskConical size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "90" },
    { name: "P", label: t("cropRecommendation.form.phosphorus"), icon: <FlaskConical size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "42" },
    { name: "K", label: t("cropRecommendation.form.potassium"), icon: <FlaskConical size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "43" },
    { name: "temperature", label: t("cropRecommendation.form.temperature"), icon: <Thermometer size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "20.8" },
    { name: "humidity", label: t("cropRecommendation.form.humidity"), icon: <Droplets size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "82" },
    { name: "ph", label: t("cropRecommendation.form.ph"), icon: <FlaskConical size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "6.5" },
    { name: "rainfall", label: t("cropRecommendation.form.rainfall"), icon: <Wind size={18} />, placeholder: t("cropRecommendation.form.placeholder") + "202" },
  ];

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputs.map((input) => (
          <div key={input.name} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="text-primary">{input.icon}</span>
              {input.label}
            </label>
            <input
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
              type="number"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none bg-gray-50 focus:bg-white"
              required
            />
          </div>
        ))}

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> {t("cropRecommendation.form.loading")}
              </>
            ) : (
              <>
                <Leaf /> {t("cropRecommendation.form.submit")}
              </>
            )}
          </button>
        </div>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200 text-center"
        >
          <h3 className="text-gray-600 font-medium mb-2">{t("cropRecommendation.form.result")}</h3>
          <p className="text-4xl font-extrabold text-primary capitalize flex justify-center items-center gap-3">
            <Sprout className="w-10 h-10" /> {result}
          </p>
        </motion.div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

// Helper component for the result display
function Sprout({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.4-1.2-.6-2.1-1.9-2.1-3.3 0-1.9.9-3.2 2.3-4.1 1-.7 2.3-.9 3.3-.3" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1.7-1.3 2.9-3.3 3-5.5 0-.7-.5-1.5-1.2-1.5-1.9 0-4.1.9-5 4.4" />
    </svg>
  );
}

export default CropForm;
