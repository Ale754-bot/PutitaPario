// src/components/ProductCard.jsx

import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

const ProductCard = ({ producto }) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    imagenUrl,
    stock,
    talles
  } = producto;

  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const { agregarItem } = useCarrito();

  const puedeAgregar = stock && (!talles || talles.length === 0 || talleSeleccionado);

  const handleAgregar = () => {
    if (puedeAgregar) {
      agregarItem({ ...producto, talle: talleSeleccionado }, 1);
    }
  };

  // Imagen final desde imagen o imagenUrl
  const imagenFinal = imagen || imagenUrl || "/images/placeholder.png";

  // Texto del botón
  const textoBoton = !stock
    ? "Sin stock"
    : talles && talles.length > 0 && !talleSeleccionado
    ? "Seleccioná un talle"
    : "Agregar al carrito";

  // Clases visuales del botón
  const clasesBoton = `
    w-full py-3 mt-2 rounded font-bold transition-colors
    ${puedeAgregar
      ? "bg-red-600 hover:bg-red-800 text-white"
      : !stock
      ? "bg-gray-800 text-gray-400 cursor-not-allowed"
      : "bg-gray-600 text-white cursor-not-allowed"}
  `;

  return (
    <div className="
      bg-black text-white rounded-lg overflow-hidden shadow-lg 
      transition duration-300 ease-in-out 
      hover:shadow-acento/50 hover:scale-[1.02]
      border border-gray-800 hover:border-acento
    ">
      {/* Imagen */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imagenFinal} 
          alt={nombre} 
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
        {!stock && (
          <div className="absolute top-0 right-0 bg-gray-900/80 text-white font-bold px-3 py-1 rounded-bl-lg">
            AGOTADO
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-xl font-bold h-12 overflow-hidden hover:text-acento transition-colors cursor-pointer">
          {nombre}
        </h3>

        <p className="text-sm text-gray-400 mb-2">{descripcion}</p>

        <p className="text-2xl font-extrabold text-acento mb-4">
          ${precio.toFixed(2)}
        </p>

        {/* Selector de talles */}
        {talles && talles.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Seleccioná tu talle:
            </label>
            <select
              value={talleSeleccionado}
              onChange={(e) => setTalleSeleccionado(e.target.value)}
              className="w-full border border-gray-700 bg-black text-white rounded px-3 py-2"
            >
              <option value="">Elegí un talle</option>
              {talles.map((talle) => (
                <option key={talle} value={talle}>
                  {talle}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={handleAgregar}
          disabled={!puedeAgregar}
          className={clasesBoton}
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
