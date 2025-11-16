import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const ProductCardOfertas = ({ producto, index }) => {
  const {
    id,
    nombre,
    descripcion,
    precio,
    precioOriginal,
    imagen,
    variantes,
    stock
  } = producto;

  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const { agregarItem } = useCarrito();

  const descuento = Math.round(((precioOriginal - precio) / precioOriginal) * 100);
  const puedeAgregar = stock && (!variantes || varianteSeleccionada);

  const textoBoton = !stock
    ? "Sin stock"
    : variantes && !varianteSeleccionada
    ? "Elegí un sabor"
    : "Agregar al carrito";

  const handleAgregar = () => {
    if (!puedeAgregar) return;
    const item = {
      ...producto,
      variante: varianteSeleccionada,
      precio
    };
    agregarItem(item, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -50 }} // opcional si usás AnimatePresence
  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
      className="relative snap-center min-w-[85%] md:min-w-[30%] bg-black rounded-xl shadow-lg overflow-hidden flex flex-col border border-red-600"
    >
      {/* Etiqueta de descuento */}
      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
        -{descuento}%
      </span>

      {/* Imagen */}
      <img
  src={imagen}
  alt={nombre}
  className="w-full aspect-square object-cover object-center md:aspect-2/2]"
/>


      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-red-500 mb-1">{nombre}</h3>
        <p className="text-xs text-gray-300 flex-grow">{descripcion}</p>

        {/* Precios */}
        <div className="mt-2">
          <span className="text-gray-400 line-through mr-2 text-sm">
            ${precioOriginal.toLocaleString("es-AR")}
          </span>
          <span className="text-lg font-bold text-white">
            ${precio.toLocaleString("es-AR")}
          </span>
        </div>

        {/* Variantes como sabores */}
        {variantes && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {variantes.map((v, i) => {
              const isSelected = varianteSeleccionada === v;
              return (
                <button
                  key={i}
                  onClick={() => setVarianteSeleccionada(v)}
                  className={`
                    px-2 py-1 text-xs rounded-full border
                    ${isSelected ? "bg-red-600 text-white" : "bg-black text-white border-gray-600"}
                    hover:bg-red-800 transition-all
                  `}
                >
                  {v}
                </button>
              );
            })}
          </div>
        )}

        {/* Botón carrito */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAgregar}
          disabled={!puedeAgregar}
          className={`
            mt-3 py-2 rounded-lg font-semibold transition-colors text-sm
            ${puedeAgregar
              ? "bg-red-600 hover:bg-red-800 text-white"
              : "bg-gray-600 text-white cursor-not-allowed"}
          `}
        >
          {textoBoton}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCardOfertas;
