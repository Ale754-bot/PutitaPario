import React from "react";
import { motion } from "framer-motion";


const OfertaPerfumes = () => {
  return (
<div className="relative w-full max-w-screen-xl mx-auto overflow-hidden rounded-xl shadow-lg bg-black">
      {/* Imagen del banner */}
      <motion.img
  src="/banner-perfumes.jpg"
  alt="Oferta Perfumes For Him"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="mx-auto w-auto max-w-full h-auto rounded-xl shadow-lg"
/>


      {/* Botón CTA */}
      <div className="p-4 bg-black text-center">
        <motion.a
            href="/productos?categoria=perfumes#hombre"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block px-6 py-2 bg-red-800 text-white rounded-full shadow-md hover:bg-red-800 transition"
        >
          Descubrilos
        </motion.a>
      </div>
    </div>
  );
};

export default OfertaPerfumes;
