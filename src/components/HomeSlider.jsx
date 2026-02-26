import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = ["/BANNER 1.jpg", "/BANNER 2.jpg", "/BANNER 3.jpg"];

// 🔧 Componente para PC
function BannerPC({ index }) {
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence>
        <motion.img
          key={index}
          src={banners[index]}
          alt={`Banner ${index + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full object-contain"
        />
      </AnimatePresence>
    </div>
  );
}

// 🔧 Componente para Mobile
function BannerMobile({ index }) {
  return (
    <div className="relative w-full h-[250px] overflow-hidden rounded-lg shadow-md">
      <AnimatePresence>
        <motion.img
          key={index}
          src={banners[index]}
          alt={`Banner ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full h-full object-contain"
        />
      </AnimatePresence>
    </div>
  );
}

// 🔧 Componente principal
export default function HomeSlider() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      {isMobile ? <BannerMobile index={index} /> : <BannerPC index={index} />}

      {/* Botón catálogo debajo del banner */}
      <a
        href="/productos"
        className="px-8 py-2 bg-red-600 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg transition"
      >
        Ver catálogo completo
      </a>
    </div>
  );
}
