import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import CarritoSidebar from "./CarritoSidebar";


const FloatingCartIcon = () => {
  const { items } = useCarrito();
  const [isOpen, setIsOpen] = useState(false);
  
  // Calculamos la cantidad total de productos (sumando las cantidades de cada ítem)
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      {/* Icono Flotante Fijo (en la esquina inferior derecha) */}
      <button
        onClick={() => setIsOpen(true)} // Siempre abrimos al hacer clic
        className="
            fixed bottom-8 right-8 bg-acento text-white p-4 rounded-full shadow-2xl z-50 
            transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-acento/50
        "
        aria-label={`Abrir Carrito, ${totalItems} productos`}
      >
        {/* Usamos un SVG simple para el ícono de carrito */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.824l3.397 19.34a2.25 2.25 0 0 0 2.15 1.625h16.516a.75.75 0 0 0 .75-.75V11.25A.75.75 0 0 0 23.25 10H8.025a2.25 2.25 0 0 1-2.25-2.25V3h1.386Z" />
        </svg>

        {/* Contador (solo si hay ítems) */}
        {totalItems > 0 && (
          <span className="
            absolute top-0 right-0 inline-flex items-center justify-center 
            px-2 py-1 text-xs font-bold leading-none text-white 
            transform translate-x-1/2 -translate-y-1/2 bg-red-800 rounded-full border-2 border-bg-principal
          ">
            {totalItems}
          </span>
        )}
      </button>
      
      {/* El Sidebar (se abre al cambiar isOpen a true) */}
      <CarritoSidebar isOpen={isOpen} closeCart={() => setIsOpen(false)} />
    </>
  );
};

export default FloatingCartIcon;