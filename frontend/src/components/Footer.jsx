import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4">SmartFarm</h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            {t("footer.brandDesc")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("footer.quickLinks")}</h3>
          <ul className="space-y-2 text-gray-200">
            <li><a href="/" className="hover:text-accent transition">{t("nav.home")}</a></li>
            <li><a href="/crop-recommendation" className="hover:text-accent transition">{t("nav.cropRecommendation")}</a></li>
            <li><a href="/weather" className="hover:text-accent transition">{t("nav.weather")}</a></li>
            <li><a href="/advisory" className="hover:text-accent transition">{t("nav.pestDetect")}</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("footer.contactUs")}</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MapPin size={18} className="text-accent" /> 462022 Madhya pradesh
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} className="text-accent" /> anandaniket1947@gmail.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone size={18} className="text-accent" /> 9801260273
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-green-800 mt-8 pt-4 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} {t("footer.rights")}
      </div>
    </footer>
  );
}
