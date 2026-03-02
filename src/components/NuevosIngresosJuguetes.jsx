import React from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const productosNuevos = [
  { id: 2001, nombre: "Masturbador Ultra Realístico - Con vibración", precio: 156000, imagen: "/masturbadorultrareal.jpg", stock: false },
  { id: 2002, nombre: "Ducha Limpieza Anal - 89ml ", precio: 22000, imagen: "/images/plugs/duchanal.webp", stock: true },
  { id: 2003, nombre: "Huevo Vibrador Texturizado Con Control Remoto", precio: 65000, imagen: "/huevo.jpg", stock: true },
  { id: 2004, nombre: "Vibrador Doble Brighty", precio: 58000, imagen: "/brighty.jpg", stock: true },
  { id: 2005, nombre: "Masturbador Masculino Premium", precio: 83000, imagen: "/masturbadorpremium.jpg", stock: true },
  { id: 2006, nombre: "Dildo Vibrador Sopapa", precio: 85000, imagen: "/dildosopapavibrador.jpg", stock: false },
];

const NuevosIngresosJuguetes = () => {
  const { agregarItem } = useCarrito();

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -3 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.05em" }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
      >
        ✨ NUEVOS INGRESOS ✨
      </motion.h2>

      {/* Mobile: scroll horizontal con snap */}
      <div className="lg:hidden px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-6"
        >
          {productosNuevos.map((producto) => (
            <motion.div
              key={producto.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="snap-center min-w-[240px] bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700 flex flex-col"
            >
              <div className="relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-2 right-2 bg-gradient-to-r from-red-700 to-black text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md animate-pulse">
                  Nuevo ingreso
                </span>
                {!producto.stock && (
                  <div className="absolute top-0 left-0 bg-black/70 text-white text-xs font-bold px-2 py-1">
                    SIN STOCK
                  </div>
                )}
              </div>
              <div className="p-3 text-center flex flex-col flex-grow">
                <h3 className="text-sm font-semibold mb-2">{producto.nombre}</h3>
                <p className="text-base font-bold text-red-500 mb-2">
                  ${producto.precio.toLocaleString("es-AR")}
                </p>
                <motion.button
                  whileHover={{ scale: producto.stock ? 1.1 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => producto.stock && agregarItem(producto)}
                  disabled={!producto.stock}
                  className={`mt-auto text-sm font-semibold py-2 px-4 rounded transition-colors shadow-md
                    ${producto.stock 
                      ? "bg-red-600 hover:bg-red-800 text-white" 
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
                >
                  {producto.stock ? "Agregar al carrito" : "Sin stock"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Desktop: grid con efectos modernos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hidden lg:grid lg:grid-cols-3 gap-8 px-8"
      >
        {productosNuevos.map((producto) => (
          <motion.div
            key={producto.id}
            variants={cardVariants}
            whileHover={{ scale: 1.08, rotate: 1, boxShadow: "0px 0px 25px rgba(255,0,100,0.6)" }}
            className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700 flex flex-col group"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="absolute top-2 right-2 bg-gradient-to-r from-red-700 to-black text-white text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md animate-pulse">
                Nuevo ingreso
              </span>
              {!producto.stock && (
                <div className="absolute top-0 left-0 bg-black/70 text-white text-xs font-bold px-2 py-1">
                  SIN STOCK
                </div>
              )}
            </div>
            <div className="p-5 text-center flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">
                {producto.nombre}
              </h3>
              <p className="text-xl font-extrabold text-red-500 mb-4">
                ${producto.precio.toLocaleString("es-AR")}
              </p>
              <motion.button
                whileHover={{ scale: producto.stock ? 1.1 : 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => producto.stock && agregarItem(producto)}
                disabled={!producto.stock}
                className={`mt-auto text-sm font-semibold py-2 px-6 rounded transition-colors shadow-lg
                  ${producto.stock 
                    ? "bg-red-600 hover:bg-red-800 text-white" 
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
              >
                {producto.stock ? "Agregar al carrito" : "Sin stock"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default NuevosIngresosJuguetes;
