import React from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext"; // 👉 ajustá la ruta según tu proyecto

export default function OfertaPerfume() {
  const { agregarItem } = useCarrito();

  const producto = {
    id: "little-sexy-50ml",
    nombre: "LITTLE SEXY Eau de Toilette 50ml",
    precio: 10000, // 👈 importante: tu context usa "precio" para calcular el total
    imagen: "/litlesexy.jpg",
    variante: "50ml", // opcional, ayuda a generar ID único
  };

  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-6">
      <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-center">

        {/* Imagen protagonista */}
        <motion.div
          className="flex justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.08, rotate: 2 }}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-48 sm:w-64 md:w-[420px] drop-shadow-2xl"
          />
          <div className="absolute inset-0 blur-3xl opacity-20 bg-pink-500 rounded-full"></div>
        </motion.div>

        {/* Texto + CTA */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Descubrí la sensualidad de <span className="text-pink-400">LITTLE SEXY</span>
          </h2>
          <p className="text-sm sm:text-base mb-4">
            Exquisita fragancia afrodisíaca!
            Esta fragancia es una mezcla del glamour de la fruta de la pasión y la orquídea de la vainilla.
          </p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-xl font-bold">${producto.precio}</span>
          </div>
          <motion.button
            className="bg-pink-400 hover:bg-pink-700 border border-yellow-300 text-white font-bold py-1 px-3 rounded-md shadow-md transition text-xs"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255,0,0,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => agregarItem(producto, 1)} // 👈 ahora agrega al carrito
          >
            Agregar al carrito
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
