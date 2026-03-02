import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const ProductCardIngresos = ({ producto }) => {
  const { agregarItem } = useCarrito();
  const [showDesc, setShowDesc] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative m-4 w-full max-w-xs overflow-hidden rounded-lg bg-black shadow-md border border-red-900"
    >
      {/* Imagen + badge */}
      <div className="relative">
        <img
          className="h-60 w-full rounded-t-lg object-cover transition-transform duration-500 hover:scale-110"
          src={producto.imagen}
          alt={producto.nombre}
        />
        <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-red-700 text-center text-sm text-white">
          {producto.stock ? "Nuevo" : "Sin stock"}
        </span>
      </div>

      {/* Contenido */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-s font-semibold tracking-tight text-white">
          {producto.nombre}
        </h5>

        {/* Botón para desplegar descripción */}
        <button
          onClick={() => setShowDesc(!showDesc)}
          className="mt-2 text-sm text-red-600 hover:underline focus:outline-none"
        >
          {showDesc ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {/* Descripción animada */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={showDesc ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden text-sm text-gray-700 mt-2"
        >
          <p>{producto.descripcion}</p>
        </motion.div>

        {/* Precio + botón carrito */}
        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl font-bold text-white">
              ${producto.precio.toLocaleString("es-AR")}
            </span>
          </p>
          <motion.button
            whileHover={{ scale: producto.stock ? 1.1 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => producto.stock && agregarItem(producto)}
            disabled={!producto.stock}
            className={`flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-md transition-colors
              ${producto.stock
                ? "bg-red-700 text-white hover:bg-gray-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          >
            {producto.stock ? "Agregar" : "Sin stock"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardIngresos;
