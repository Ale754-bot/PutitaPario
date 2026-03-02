import React from "react";
import productosNuevos from "../data/nuevosIngresos.json";
import ProductCardIngresos from "./ProductCardIngresos";

const NuevosIngresos = () => {
  if (!productosNuevos.length) return null;

  return (
    <section className="py-12 bg-black text-white">
      {/* Banner personalizado */}
      <div className="relative mb-10">
        {/* Opción con imagen */}
        <img
          src="/titulo1.jpg"
          alt="Banner Nuevos Ingresos"
          className="w-full h-60 object-contain rounded-lg shadow-lg"
        />
    
      </div>

      {/* Mobile: scroll horizontal */}
      <div className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-6 px-4 lg:hidden">
        {productosNuevos.map((p) => (
          <div key={p.id} className="snap-center min-w-[250px]">
            <ProductCardIngresos producto={p} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-8 justify-items-center">
        {productosNuevos.map((p) => (
          <ProductCardIngresos key={p.id} producto={p} />
        ))}
      </div>
    </section>
  );
};

export default NuevosIngresos;
