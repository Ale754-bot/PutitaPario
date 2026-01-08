// CategoryScroll.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORIES = [
  "Geles, Aceites & Cremas",
  "Perfumes Afrodisíacos y Body Splash",
  "Juegos Sexuales",
  "Vigorizantes",
  "Cuidado Personal Íntimo",
  "Juguetes",
  "Plugs Anales",
  "Dildos",
  "Velas",
  "Lencería",
  "Arneses",
  "BDSM",
  "Disfraces"
];

const CategoryScroll = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleCategoryClick = (name) => {
    const categoriaParam = name.toLowerCase().replace(/\s/g, "-");
    navigate(`/productos?categoria=${categoriaParam}`);
  };

  return (
    <section className="py-6 bg-black relative">
  {/* título */}
  <motion.h2
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-white text-lg sm:text-xl font-semibold px-4 mb-4 tracking-wide text-center"
  >
    Explora por categorías
  </motion.h2>

  {/* contenedor con scroll */}
  <div
    className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 relative"
    ref={scrollRef}
  >
    {CATEGORIES.map((name, index) => (
      <motion.div
        key={name}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex-shrink-0 snap-center flex flex-col items-center cursor-pointer"
        onClick={() => handleCategoryClick(name)}
      >
        {/* círculo con borde animado */}
        <motion.div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full p-[2px]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            style={{
              background:
                "conic-gradient(from 0deg, #000000ff, #bd0000ff, #000000ff, #000000ff)"
            }}
          />
          <div className="relative rounded-full bg-black w-[95%] h-[95%] flex items-center justify-center overflow-hidden">
            <motion.img
              src="/PP1.png"
              alt={name}
              className="max-w-[80%] max-h-[80%] object-contain"
              animate={{ x: [0, -2, 2, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 10 }}
            />
          </div>
        </motion.div>
        {/* nombre debajo */}
        <span className="text-[11px] sm:text-xs text-white mt-2 text-center w-24 line-clamp-2">
          {name}
        </span>
      </motion.div>
    ))}
  </div>

  {/* overlays para el fade */}
  <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black to-transparent"></div>
  <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent"></div>
</section>

  );
};

export default CategoryScroll;
