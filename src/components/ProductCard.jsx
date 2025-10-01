// src/components/Producto/ProductCard.jsx

import React from 'react'; // ¡Asegúrate de tener esta importación!
import { useCarrito } from '../context/CarritoContext';

const ProductCard = ({ producto }) => {
  // Conectamos con la función para añadir productos del Contexto
  const { agregarItem } = useCarrito();

  const handleAddToCart = () => {
    // Agrega el producto al carrito con cantidad 1
    agregarItem(producto, 1);
    // Ya no usamos alert, lo vemos en el sidebar!
  };

  // Clases de estilos para el botón cuando no hay stock
  const buttonClasses = producto.stock
    ? "bg-acento hover:bg-red-800" // Rojo cuando hay stock
    : "bg-gray-700 cursor-not-allowed"; // Gris cuando no hay stock

  return (
    // 1. Contenedor Responsive y con Animación al Hover
    <div className="
        bg-black text-white rounded-lg overflow-hidden shadow-lg 
        transition duration-300 ease-in-out 
        hover:shadow-acento/50 hover:scale-[1.02]
        border border-gray-800 hover:border-acento
    ">
        
      {/* 2. Imagen del Producto con Efecto Zoom en Hover */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={producto.imagenUrl} 
          alt={producto.nombre} 
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
        {/* Etiqueta de Agotado */}
        {!producto.stock && (
            <div className="absolute top-0 right-0 bg-gray-900/80 text-white font-bold px-3 py-1 rounded-bl-lg">
                AGOTADO
            </div>
        )}
      </div>

      {/* 3. Información */}
      <div className="p-4 flex flex-col justify-between h-40">
        <h3 className="text-xl font-bold h-12 overflow-hidden hover:text-acento transition-colors cursor-pointer">
            {producto.nombre}
        </h3>
        
        {/* Precio en color de acento (Rojo) */}
        <p className="text-2xl font-extrabold text-acento my-2">
            ${producto.precio.toFixed(2)}
        </p>
        
        {/* Botón de Agregar al Carrito */}
        <button
          onClick={handleAddToCart}
          disabled={!producto.stock}
          className={`
            w-full text-white font-bold py-3 mt-3 rounded-md transition-colors 
            ${buttonClasses}
          `}
        >
          {producto.stock ? "Agregar al Carrito" : "Sin Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;