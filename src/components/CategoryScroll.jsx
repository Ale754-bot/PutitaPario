import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <section className="py-20 overflow-hidden min-h-[400px] bg-black relative">
      <div className="mx-auto max-w-screen-xl px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-white mx-auto pb-1 w-fit animate-float">
          Explora por Categoría
        </h2>

        {/* Flechas laterales (solo visibles en desktop) */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-2 rounded-full hover:bg-acento transition"
          aria-label="Scroll izquierda"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white px-3 py-2 rounded-full hover:bg-acento transition"
          aria-label="Scroll derecha"
        >
          →
        </button>

        {/* Scroll manual con snapping */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden touch-pan-x mask-fade-horizontal scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          <div className="flex gap-6 px-6 py-6 min-w-max">
            {CATEGORIES.map((name) => (
              <div
                key={name}
                onClick={() => handleCategoryClick(name)}
                className="
                  card-glow-linear
                  relative flex-shrink-0 w-64 h-72 rounded-lg overflow-hidden
                  snap-start transition-transform duration-300 ease-in-out
                  hover:scale-[1.05]
                  border border-transparent cursor-pointer
                  bg-black bg-opacity-30 backdrop-blur-sm group
                  flex flex-col items-center justify-center gap-4 px-4
                "
                aria-label={`Ver productos en la categoría ${name}`}
              >
                <img
                  src={`/PP1.png`}
                  alt={name}
                  className="max-w-[160px] max-h-[160px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold text-white leading-none drop-shadow-lg uppercase">
                    {name}
                  </h3>
                  <p className="text-sm text-white font-medium">Ver más &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryScroll;
