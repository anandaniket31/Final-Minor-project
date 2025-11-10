import React from "react";
import { Link } from "react-router-dom";
import { Sprout, CloudSun, Brain, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      title: "Crop Recommendation",
      path: "/crop-recommendation",
      icon: <Brain className="w-8 h-8 text-green-100" />,
      img: "https://images.unsplash.com/photo-1598965402089-897ce52e89b2?auto=format&fit=crop&w=1600&q=80", // Crop AI
      gradient: "from-green-600/70 to-emerald-700/70",
    },
    {
      title: "Weather Insights",
      path: "/weather",
      icon: <CloudSun className="w-8 h-8 text-yellow-100" />,
      img: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1600&q=80", // Cloudy sky over farm
      gradient: "from-sky-500/70 to-blue-700/70",
    },
    {
      title: "Farming Advisory",
      path: "/advisory",
      icon: <Leaf className="w-8 h-8 text-green-100" />,
      img: "https://images.unsplash.com/photo-1581093448798-5dc94a9a3b58?auto=format&fit=crop&w=1600&q=80", // Farmer hand inspecting crops
      gradient: "from-yellow-500/70 to-amber-700/70",
    },
    {
      title: "Crop Details",
      path: "/crop-details",
      icon: <Sprout className="w-8 h-8 text-green-100" />,
      img: "https://images.unsplash.com/photo-1579710759509-4af7320c5d1b?auto=format&fit=crop&w=1600&q=80", // Close-up of green leaves
      gradient: "from-lime-500/70 to-green-700/70",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-10 w-36 h-36 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold text-green-800 drop-shadow-md mb-4 flex justify-center items-center gap-2">
          <Sprout className="w-10 h-10 text-green-600" /> SmartFarm 🌾
        </h1>
        <p className="text-gray-700 text-lg mb-12">
          AI-powered <span className="font-semibold text-green-700">Crop & Weather Intelligence</span>  
          for smarter, data-driven agriculture.
        </p>
      </motion.div>

      {/* Function Image Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10"
      >
        {features.map((feature, i) => (
          <Link to={feature.path} key={i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${feature.gradient} flex flex-col items-center justify-center text-white backdrop-blur-[2px]`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-3"
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-all">
                    Click to explore
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="mt-20 text-center z-10"
      >
        <p className="text-gray-700 text-lg mb-4">
          🌱 Begin your Smart Farming journey with AI insights.
        </p>
        <Link
          to="/crop-recommendation"
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}
