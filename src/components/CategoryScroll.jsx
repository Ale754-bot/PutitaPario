import React from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  "Geles y Aceites",
  "Accesorios",
  "Juegos",
  "Juguetes",
  "Disfraces",
  "Body Splash",
  "Perfumes Afro",
  "Hotmetica",
  "Indumentaria"
];

const CategoryScroll = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    const categoriaParam = name.toLowerCase().replace(/\s/g, '-');
    navigate(`/productos?categoria=${categoriaParam}`);
  };

  return (
    <section className="py-20 overflow-hidden min-h-[400px] bg-black">
      <div className="mx-auto max-w-screen-xl px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-white mx-auto pb-1 w-fit animate-float">
          Explora por Categoría
        </h2>

        <div className="relative w-full overflow-x-scroll overflow-y-hidden touch-pan-x mask-fade-horizontal">
          <div className="flex gap-6 px-6 py-6 animate-marquee-mobile md:animate-marquee-desktop hover:pause-marquee min-w-max">
            {[...CATEGORIES, ...CATEGORIES].map((name, index) => {
              const delay = `${index * 0.2}s`; // ⏱ intercalado progresivo

              return (
                <div
                  key={`${name}-${index}`}
                  onClick={() => handleCategoryClick(name)}
                  className="
                    card-glow-linear
                    relative flex-shrink-0 w-64 h-72 rounded-lg overflow-hidden
                    snap-center transition-transform duration-300 ease-in-out
                    hover:scale-[1.05]
                    border border-transparent cursor-pointer
                    bg-black bg-opacity-30 backdrop-blur-sm group
                    flex flex-col items-center justify-center gap-4 px-4
                  "
                  style={{ animationDelay: delay }}
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryScroll;
