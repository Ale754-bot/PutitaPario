import React from "react";
import { motion } from "framer-motion";

const BannerLenceria = () => {
  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg mb-12">
      {/* Imagen de fondo */}
      <img
        src="/bannerlen.jpg" // reemplazá con tu imagen real
        alt="Nueva colección de lencería"
        className="w-full h-64 object-cover object-center opacity-80"
      />

      {/* Contenido superpuesto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 uppercase drop-shadow-lg"
        >
          Nuevos Ingresos de Lencería
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-gray-200 max-w-md"
        >
          Sensualidad y estilo en cada detalle. Descubrí los nuevos ingresos que elevan tu experiencia.
        </motion.p>

        <motion.a
          href="/productos?categoria=Lencería"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-800 transition"
        >
          Ver Lencería
        </motion.a>
      </div>
    </div>
  );
};

export default BannerLenceria;
