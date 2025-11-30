import React from "react";
import CropForm from "../components/Form";
import { Sprout } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function CropRecommendation() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1740&auto=format&fit=crop"
          alt="Farm Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/90" />
      </div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-primary font-heading">
            {t("cropRecommendation.title")}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {t("cropRecommendation.subtitle")}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          <CropForm />
        </div>
      </div>
    </div>
  );
}
