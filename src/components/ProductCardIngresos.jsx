import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const ProductCardIngresos = ({ producto }) => {
  const { agregarItem } = useCarrito();
  const [showDesc] = useState(false);

  // ✅ Lógica universal de ofertas
  const tieneOferta =
    producto.precioOferta &&
    producto.precioOferta < producto.precio;

  const precioFinal = tieneOferta
    ? producto.precioOferta
    : producto.precio;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.45, type: "spring" }}
      className="
        relative m-4 w-full max-w-xs overflow-hidden rounded-xl
        border border-red-900/40 bg-black
        shadow-[0_0_18px_rgba(185,28,28,0.14)]
      "
    >
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          className="
            h-full w-full object-cover
            transition-transform duration-500
            hover:scale-105
          "
          src={producto.imagen}
          alt={producto.nombre}
        />

        {/* Badge stock */}
        {!producto.stock && (
          <span className="absolute top-3 left-3 rounded-md bg-gray-700 px-2 py-1 text-[11px] font-bold text-white">
            Sin stock
          </span>
        )}

        {/* Badge oferta */}
        {tieneOferta && (
          <span
            className="
              absolute bottom-2 right-2
              rounded-md bg-red-600
              px-2 py-1 text-[11px]
              font-black text-white
              shadow-md
            "
          >
            HOT
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="px-5 pb-5 pt-4">
        <h5 className="text-s font-semibold tracking-tight text-white">
          {producto.nombre}
        </h5>

        {/* Descripción */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            showDesc
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.4 }}
          className="overflow-hidden text-sm text-gray-400 mt-2"
        >
          <p>{producto.descripcion}</p>
        </motion.div>

        {/* Precio */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            {tieneOferta ? (
              <>
                <span className="text-sm line-through text-gray-500">
                  ${producto.precio.toLocaleString("es-AR")}
                </span>

                <span className="text-xl font-black text-red-500">
                  ${precioFinal.toLocaleString("es-AR")}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-white">
                ${producto.precio.toLocaleString("es-AR")}
              </span>
            )}
          </div>

          {/* Botón */}
          <motion.button
            whileHover={{ scale: producto.stock ? 1.08 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              producto.stock &&
              agregarItem({
                ...producto,
                precio: precioFinal,
              })
            }
            disabled={!producto.stock}
            className={`
              flex items-center rounded-md px-4 py-2
              text-sm font-medium shadow-md transition-colors
              ${
                producto.stock
                  ? "bg-red-700 text-white hover:bg-red-600"
                  : "cursor-not-allowed bg-gray-500 text-gray-300"
              }
            `}
          >
            {producto.stock ? "Agregar" : "Sin stock"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardIngresos;