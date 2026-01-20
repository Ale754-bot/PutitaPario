// src/components/Destacados.jsx

import React from 'react';
import destacados from '../data/destacados.json';
import ProductCard from './ProductCard';

const Destacados = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-black text-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold mb-6 sm:mb-8 text-white text-center">
          Productos destacados
        </h2>

        {/* Mobile: scroll horizontal | Desktop: grid */}
        <div className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory
          sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:snap-none
        ">
          {destacados.map((producto) => (
            <div
              key={producto.id}
              className="snap-center flex-shrink-0 w-56 sm:w-auto transform scale-90 sm:scale-95 lg:scale-90"
            >
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destacados;
