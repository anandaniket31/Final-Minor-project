import React from "react";
import { Link } from "react-router-dom";
import { Sprout, CloudSun, Brain, Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("home.features.cropRecommendation"),
      path: "/crop-recommendation",
      icon: <Brain className="w-10 h-10 text-white" />,
      img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80", // Farm field
      description: t("home.features.cropRecommendationDesc"),
    },
    {
      title: t("home.features.weatherInsights"),
      path: "/weather",
      icon: <CloudSun className="w-10 h-10 text-white" />,
      img: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80", // Green field with sky
      description: t("home.features.weatherInsightsDesc"),
    },
    {
      title: t("home.features.pestDetect"),
      path: "/advisory",
      icon: <Leaf className="w-10 h-10 text-white" />,
      img: "https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?q=80&w=1000&auto=format&fit=crop", // Farmer with tablet
      description: t("home.features.pestDetectDesc"),
    },
    {
      title: t("home.features.cropDetails"),
      path: "/crop-details",
      icon: <Sprout className="w-10 h-10 text-white" />,
      img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80", // Close up leaf
      description: t("home.features.cropDetailsDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1740&auto=format&fit=crop"
            alt="Farm Hero"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/1920x1080?text=Smart+Farming"; }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading tracking-tight">
            {t("home.heroTitle")} <span className="text-accent">{t("home.heroTitleAccent")}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light">
            {t("home.heroSubtitle")}
          </p>
          <Link
            to="/crop-recommendation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold text-lg rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
          >
            {t("home.getStarted")} <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">{t("home.keyFeatures")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("home.keyFeaturesSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <Link to={feature.path} key={i} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(feature.title)}`; }}
                  />
                  <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 bg-primary/90 p-3 rounded-xl backdrop-blur-sm">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-secondary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    {t("home.learnMore")} <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
