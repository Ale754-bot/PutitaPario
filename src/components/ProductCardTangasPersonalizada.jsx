// src/components/ProductCardTangasPersonalizada.js
import React from "react";

const ProductCardTangasPersonalizada = ({ producto }) => {
  const whatsappLink = `https://wa.me/5493412634440?text=Hola! Quiero personalizar mi tanga con frase, nombre y color.`;

  return (
    <div
      className="
        bg-black rounded-xl shadow-lg overflow-hidden flex flex-col 
        border border-pink-600 transition-transform transform hover:scale-102
      "
    >
      {/* Imagen con badge */}
      <div className="relative">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-3 left-3 bg-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          Personalizá la tuya
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-pink-500 mb-2">
          {producto.nombre}
        </h3>
        <p className="text-xs text-gray-300 flex-grow">{producto.descripcion}</p>
        <span className="text-lg font-bold text-white mt-2">
          ${producto.precio.toLocaleString("es-AR")}
        </span>

        {/* Botón WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-4 inline-flex items-center justify-center 
            px-4 py-2 rounded-lg bg-green-600 text-white font-semibold 
            hover:bg-green-700 transition
          "
        >
          Personalizar por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCardTangasPersonalizada;
