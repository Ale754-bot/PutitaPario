// src/components/Navbar.jsx

import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { Link } from 'react-router-dom'; // ESTÁ BIEN IMPORTADO

const Navbar = ({ openCart }) => {
    const { items } = useCarrito();
    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black shadow-lg z-30 border-b border-acento/50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo - CORREGIDO: Usamos Link para ir a la ruta raíz (Home) */}
                <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <img 
                        src="/PP.png" // 👈 RUTA DE TU LOGO
                        alt="SECRETO Logo"
                        className="h-10 w-auto" // Ajusta el tamaño aquí
                    />
                </Link>

                
                <div className="hidden sm:flex space-x-6 ml-auto mr-4"> 
 
                     <Link to="/productos" className="text-white hover:text-acento transition-colors font-medium">
                        Productos
                    </Link>


                    <Link to="/contacto" className="text-white hover:text-acento transition-colors font-medium">
                        Contacto
                    </Link>
                 </div>

                {/* Botón del Carrito (Queda igual, es un botón, no un enlace) */}
                <button
                    onClick={openCart} 
                    className="
                        relative p-2 rounded-full bg-acento text-white 
                        hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-acento/70
                    "
                    aria-label="Ver Carrito"
                >
                    {/* ... (SVG y Contador) ... */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.824l3.397 19.34a2.25 2.25 0 0 0 2.15 1.625h16.516a.75.75 0 0 0 .75-.75V11.25A.75.75 0 0 0 23.25 10H8.025a2.25 2.25 0 0 1-2.25-2.25V3h1.386Z" />
                    </svg>

                    {totalItems > 0 && (
                        <span className="
                            absolute top-0 right-0 inline-flex items-center justify-center 
                            w-5 h-5 text-xs font-bold text-white 
                            transform translate-x-1/4 -translate-y-1/4 bg-red-800 rounded-full border border-black
                        ">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;