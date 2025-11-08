import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  "Geles, Aceites & Cremas",
  "Perfumes Afrodisíacos y Body Splash",
  "Juegos Sexuales",
  "Vigorizantes",
  "Juguetes",
  "Plugs Anales",
  "Velas",
  "Lencería",
  "Disfraces"
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.15 },
  }),
};

const CategoryScroll = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleCategoryClick = (name) => {
    const categoriaParam = name.toLowerCase().replace(/\s/g, '-');
    navigate(`/productos?categoria=${categoriaParam}`);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-2 overflow-hidden min-h-[400px] bg-gradient-to-b from-black via-black to-black relative">
      <div className="mx-auto max-w-screen-xl px-4">
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-white tracking-tight"
        >
          Explorá por Categoría
        </motion.h2>

        {/* Flechas laterales */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={scrollLeft}
          className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-2 rounded-full hover:bg-acento transition"
          aria-label="Scroll izquierda"
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={scrollRight}
          className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-2 rounded-full hover:bg-acento transition"
          aria-label="Scroll derecha"
        >
          →
        </motion.button>

        {/* Scroll manual con snapping */}
        <motion.div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden touch-pan-x scroll-smooth snap-x snap-mandatory no-scrollbar"
          whileTap={{ cursor: 'grabbing' }}
        >
          <div className="flex gap-6 px-6 py-6 min-w-max">
            {CATEGORIES.map((name, i) => (
              <motion.div
                key={name}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                onClick={() => handleCategoryClick(name)}
                className="
                  relative flex-shrink-0 w-64 h-72 rounded-xl overflow-hidden
                  snap-start transition-transform duration-300 ease-in-out
                  hover:scale-[1.07] hover:z-10
                  border border-white/10 cursor-pointer
                  bg-gradient-to-br from-black via-neutral-900 to-black backdrop-blur-sm group
                  flex flex-col items-center justify-center gap-4 px-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]
                "
                aria-label={`Ver productos en la categoría ${name}`}
              >
                <motion.img
                  src={`/PP1.png`}
                  alt={name}
                  className="max-w-[160px] max-h-[160px] object-contain transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ rotate: 2 }}
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white leading-none drop-shadow uppercase tracking-wide">
                    {name}
                  </h3>
                  <p className="text-sm text-white/80 font-medium">Ver más →</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryScroll;
