import React from "react";
import productosNuevos from "../data/nuevosIngresos.json";
import { useCarrito } from "../context/CarritoContext";

const NuevosIngresos = () => {
  const { agregarItem } = useCarrito();

  if (!productosNuevos.length) return null;

  return (
    <section className="py-12 bg-black text-white">
      {/* Banner */}
      <div className="relative mb-2">
        <img
          src="/nuevosingresos.jpg"
          alt="Banner Nuevos Ingresos"
          className="w-full h-60 object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Mobile: scroll horizontal */}
      <div className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-6 px-4 lg:hidden">
        {productosNuevos.map((p) => (
          <div
            key={p.id}
            className="snap-center min-w-[250px] bg-white text-black shadow-md flex flex-col items-center p-4"
          >
            {/* Imagen */}
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
              <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
            </div>

            {/* Nombre y precio */}
            <h3 className="mt-3 font-bold text-lg">{p.nombre}</h3>
            <p className="text-red-600 font-semibold">${p.precio}</p>

            {/* Botón compra */}
            {p.stock ? (
              <button
                onClick={() => agregarItem(p)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-all"
              >
                Agregar al carrito
              </button>
            ) : (
              <p className="mt-3 text-gray-400 italic">Sin stock</p>
            )}
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
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
              <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
            </div>

            <h3 className="mt-3 font-bold text-lg">{p.nombre}</h3>
            <p className="text-red-600 font-semibold">${p.precio}</p>

            {p.stock ? (
              <button
                onClick={() => agregarItem(p)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-all"
              >
                Agregar al carrito
              </button>
            ) : (
              <p className="mt-3 text-gray-400 italic">Sin stock</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NuevosIngresos;
