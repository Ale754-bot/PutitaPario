import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mensajes = [
  "TENEMOS NOVEDADES",
  "Nuevos ingresos en camino",
  "No te lo pierdas"
];

export default function HomeSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-xl shadow-lg overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="/lips.jpg" // 🔧 tu imagen en public/
        alt="Background"
        className="absolute w-full h-full object-contain"
      />

      {/* Overlay oscuro para contraste */}
      <div className="absolute w-full h-full bg-black/40"></div>

      {/* Texto animado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute text-center px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white animate-pulse">
            {mensajes[index]}
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
