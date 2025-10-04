// src/components/Destacados.jsx

import React from 'react';
import destacados from '../data/destacados.json';
import ProductCard from './ProductCard'; // Asegurate de que este componente esté bien conectado

const Destacados = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-10 text-white text-center">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {destacados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destacados;
