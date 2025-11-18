// src/components/ProductCardTangasConNombres.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const ProductCardTangasConNombres = ({ productos }) => {
  const [indexActivo, setIndexActivo] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { agregarItem } = useCarrito();

  const productoActivo = productos[indexActivo];

  const handleSeleccionar = () => {
    setSelectedIndex(indexActivo);
  };

  const handleAgregar = () => {
    agregarItem(productoActivo, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
      className={`bg-black rounded-xl shadow-lg overflow-hidden flex flex-col ${
        selectedIndex === indexActivo ? "border-2 border-pink-600" : "border border-pink-600"
      }`}
    >
      {/* Imagen activa */}
      <img
        src={productoActivo.imagen}
        alt={productoActivo.nombre}
        className="w-full h-64 object-cover"
      />

      {/* Navegación con dots */}
      <div className="flex justify-center gap-2 mt-2">
        {productos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndexActivo(i)}
            className={`w-3 h-3 rounded-full ${
              i === indexActivo ? "bg-pink-600" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-pink-500 mb-1">{productoActivo.nombre}</h3>
        <p className="text-xs text-gray-300 flex-grow">{productoActivo.descripcion}</p>
        <span className="text-lg font-bold text-white mt-2">
          ${productoActivo.precio.toLocaleString("es-AR")}
        </span>

        {/* Botón seleccionar como etiqueta pequeña centrada */}
        <div className="flex justify-center mt-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSeleccionar}
            className={`
              inline-flex items-center justify-center 
              px-2 py-1 text-xs font-medium rounded-full border border-pink-600 
              ${selectedIndex === indexActivo 
                ? "bg-pink-600 text-white" 
                : "bg-black text-pink-500 hover:bg-pink-600 hover:text-white"}
              transition
            `}
          >
            {selectedIndex === indexActivo ? "Seleccionado" : "Seleccionar"}
          </motion.button>
        </div>

        {/* Botón carrito */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleAgregar}
          className="mt-2 py-2 px-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-800 transition"
        >
          Agregar al carrito
        </motion.button>

        {/* Feedback visual */}
        {selectedIndex === indexActivo && (
          <p className="mt-2 text-xs text-pink-400">Has seleccionado esta tanga</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCardTangasConNombres;
