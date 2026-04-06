import React from "react";
import productosNuevos from "../data/nuevosIngresos.json";

const NuevosIngresos = () => {
  if (!productosNuevos.length) return null;

  return (
    <section className="py-12 bg-black text-white">
      {/* Banner personalizado */}
      <div className="relative mb-10">
        <img
          src="/ingresos.jpg"
          alt="Banner Nuevos Ingresos"
          className="w-full h-60 object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Mobile: scroll horizontal */}
      <div className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-6 px-4 lg:hidden">
        {productosNuevos.map((p) => (
          <div
            key={p.id}
            className="snap-center min-w-[250px] bg-white text-black  shadow-md flex flex-col items-center p-4"
          >
            {/* Imagen */}
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
              {p.imagen ? (
                <img
                  src={p.imagen}
                  alt={`Producto ${p.id}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Imagen {p.id}</span>
              )}
            </div>

            {/* Botón deshabilitado */}
            <button
              disabled
              className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg cursor-not-allowed font-medium"
            >
              Disponible pronto
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-8 justify-items-center">
        {productosNuevos.map((p) => (
          <div
            key={p.id}
            className="bg-white text-black shadow-md flex flex-col items-center p-4 w-full max-w-[250px]"
          >
            {/* Imagen */}
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
              {p.imagen ? (
                <img
                  src={p.imagen}
                  alt={`Producto ${p.id}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Imagen {p.id}</span>
              )}
            </div>

            {/* Botón deshabilitado */}
            <button
              disabled
              className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg cursor-not-allowed font-medium"
            >
              Disponible pronto
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NuevosIngresos;
