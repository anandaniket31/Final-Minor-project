import React, { useState } from "react";
import axios from "axios";
import { Upload, AlertTriangle, CheckCircle, Loader2, Bug } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Advisory() {
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setImage(f || null);
    setResult(null);
    setError("");
    if (f) setPreview(URL.createObjectURL(f));
  };

  const detect = async () => {
    if (!image) return setError(t("advisory.errorMissing"));
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const form = new FormData();
      form.append("image", image);
      const { data } = await axios.post("http://localhost:5000/api/advisory/pest-detect", form);
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || t("advisory.errorFailed"));
      }
    } catch (e) {
      console.error("Detection error:", e);
      const errorMsg = e.response?.data?.error || e.response?.data?.details || e.message;
      setError(`Detection failed: ${errorMsg || "Please ensure backend and ML service are running."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581093448798-5dc94a9a3b58?auto=format&fit=crop&w=1600&q=80"
          alt="Advisory Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90" />
      </div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary font-heading flex justify-center items-center gap-3">
            <Bug className="text-accent" size={36} /> {t("advisory.title")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("advisory.subtitle")}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
              {preview ? (
                <img src={preview} alt="preview" className="max-h-64 rounded-lg shadow-md object-contain" />
              ) : (
                <>
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <p className="text-gray-500 font-medium">{t("advisory.upload")}</p>
                  <p className="text-xs text-gray-400">{t("advisory.formats")}</p>
                </>
              )}
            </label>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={detect}
              disabled={loading || !image}
              className="w-full flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-green-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> {t("advisory.loading")}
                </>
              ) : (
                <>
                  <Bug size={20} /> {t("advisory.button")}
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100"
            >
              <AlertTriangle size={20} />
              {error}
            </motion.div>
          )}

          {/* Result Display */}
          {result?.success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-green-800">{t("advisory.successTitle")}</h3>
              </div>

              <div className="grid gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{t("advisory.detectedPest")}</p>
                  <p className="text-2xl font-bold text-primary capitalize">{result.pest}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{t("advisory.confidence")}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-accent h-2.5 rounded-full"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-700">{result.confidence}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
