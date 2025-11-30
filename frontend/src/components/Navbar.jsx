import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sprout, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.cropRecommendation"), path: "/crop-recommendation" },
    { name: t("nav.weather"), path: "/weather" },
    { name: t("nav.pestDetect"), path: "/advisory" },
    { name: t("nav.cropDetails"), path: "/crop-details" },
  ];

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide hover:text-accent transition">
          <Sprout size={32} className="text-accent" />
          SmartFarm
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`transition-colors duration-300 hover:text-accent ${location.pathname === link.path ? "text-accent border-b-2 border-accent" : "text-white"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 hover:text-accent transition focus:outline-none"
            >
              <Globe size={20} />
              <span className="uppercase font-semibold">{language}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white text-primary rounded-lg shadow-xl overflow-hidden border border-gray-100 z-50">
                <button
                  onClick={() => { setLanguage("en"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "en" ? "font-bold bg-green-50" : ""}`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage("hi"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "hi" ? "font-bold bg-green-50" : ""}`}
                >
                  Hindi
                </button>
                <button
                  onClick={() => { setLanguage("mr"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "mr" ? "font-bold bg-green-50" : ""}`}
                >
                  Marathi
                </button>
                <button
                  onClick={() => { setLanguage("pa"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "pa" ? "font-bold bg-green-50" : ""}`}
                >
                  Punjabi
                </button>
                <button
                  onClick={() => { setLanguage("ta"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "ta" ? "font-bold bg-green-50" : ""}`}
                >
                  Tamil
                </button>
                <button
                  onClick={() => { setLanguage("te"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "te" ? "font-bold bg-green-50" : ""}`}
                >
                  Telugu
                </button>
                <button
                  onClick={() => { setLanguage("bn"); setIsLangOpen(false); }}
                  className={`block w-full text-left px-4 py-2 hover:bg-green-50 transition ${language === "bn" ? "font-bold bg-green-50" : ""}`}
                >
                  Bengali
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-green-700 overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-6 text-lg">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-accent transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Mobile Language Switcher */}
              <li className="flex flex-wrap gap-3 mt-4 border-t border-green-700 pt-4 w-full justify-center px-4">
                {[
                  { code: "en", label: "English" },
                  { code: "hi", label: "Hindi" },
                  { code: "mr", label: "Marathi" },
                  { code: "pa", label: "Punjabi" },
                  { code: "ta", label: "Tamil" },
                  { code: "te", label: "Telugu" },
                  { code: "bn", label: "Bengali" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                    className={`px-3 py-1 rounded text-sm ${language === lang.code ? "bg-accent text-primary font-bold" : "text-white border border-green-600"}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
