// src/components/OfertaCremas.jsx
import React from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const productos = [
  {
    id: 47,
    nombre: "Crema Corporal - BE Aphrodisiac",
    descripcion: "",
    imagen: "/images/Geles/s-be.webp",
    stock: true,
    precioOferta: 10000,
  },
  {
    id: 48,
    nombre: "Crema Corporal - Sensual Massage Coconut",
    descripcion: "",
    imagen: "/images/Geles/s-sm.webp",
    stock: true,
    precioOferta: 10000,
  },
];

const OfertaCremas = () => {
  const { agregarItem } = useCarrito();

  return (
    <section className="relative w-full max-w-5xl mx-auto bg-black rounded-xl overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="/CREMAS1.jpg"
        alt="Fondo oferta cremas"
        className="
          w-full object-cover
          h-[250px] sm:h-[300px] lg:h-[500px]
        "
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Desktop: cards a la derecha */}
      <div className="hidden lg:flex absolute inset-0 z-10 items-center justify-end pr-6">
        <div className="flex gap-4">
          {productos.map((producto) => (
            <motion.div
              key={producto.id}
              className="w-40 sm:w-44 lg:w-48 bg-black/50 rounded-xl shadow-lg overflow-hidden flex flex-col border border-red-600"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full aspect-square object-cover object-center"
              />
              <div className="p-2 sm:p-3 flex flex-col flex-grow">
                <h4 className="text-xs sm:text-sm font-semibold text-red-500 mb-1">
                  {producto.nombre}
                </h4>
                <div className="mt-2">
                  <span className="text-sm sm:text-base font-bold text-white">
                    ${producto.precioOferta.toLocaleString("es-AR")}
                  </span>
                </div>
                <button
                  onClick={() =>
                    agregarItem({ ...producto, precio: producto.precioOferta }, 1)
                  }
                  disabled={!producto.stock}
                  className="mt-3 px-2 py-1 rounded-md font-medium text-[10px] sm:text-xs bg-red-600 hover:bg-red-800 text-white"
                >
                  {producto.stock ? "Agregar al carrito" : "Sin stock"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: cards debajo y superpuestas */}
      <div className="lg:hidden -mt-16 relative z-10 flex justify-center gap-4 px-4 pb-6">
        {productos.map((producto) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-36 sm:w-40 bg-black/70 rounded-xl shadow-xl overflow-hidden flex flex-col border border-red-600 transform scale-90"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full aspect-square object-cover object-center"
            />
            <div className="p-2 flex flex-col flex-grow">
              <h4 className="text-xs font-semibold text-red-500 mb-1">
                {producto.nombre}
              </h4>
              <div className="mt-2">
                <span className="text-sm font-bold text-white">
                  ${producto.precioOferta.toLocaleString("es-AR")}
                </span>
              </div>
              <button
                onClick={() =>
                  agregarItem({ ...producto, precio: producto.precioOferta }, 1)
                }
                disabled={!producto.stock}
                className="mt-2 px-2 py-1 rounded-md font-medium text-[10px] bg-red-600 hover:bg-red-800 text-white"
              >
                {producto.stock ? "Agregar al carrito" : "Sin stock"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OfertaCremas;
