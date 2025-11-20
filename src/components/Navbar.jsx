import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const Navbar = ({ openCart }) => {
  const ACCENT_COLOR_CLASS = 'bg-red-600';
  const HOVER_TEXT_COLOR_CLASS = 'hover:text-red-600';
  const RING_COLOR_CLASS = 'focus:ring-red-600/70';

  const { items } = useCarrito();
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleProductosClick = () => {
    if (location.pathname === '/productos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/productos');
    }
    setOpenMenu(false);
  };

  const handleContactoClick = () => {
    navigate('/contacto');
    setOpenMenu(false);
  };

  const handleMayoristasClick = () => {
  navigate('/mayorista'); // 👈 debe coincidir con la ruta en App.js
  setOpenMenu(false);
};


  return (
    <nav className="navbar-reflection fixed top-0 left-0 right-0 bg-black shadow-lg z-30 border-b border-red-600/50 overflow-visible sm:overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex justify-between items-center">

        {/* 🔴 Versión Desktop (igual que tu original) */}
        <div className="hidden sm:flex justify-between items-center w-full">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img src="/PP1.png" alt="SECRETO Logo" className="h-10 w-auto" />
          </a>

          {/* Enlaces + Carrito */}
          <div className="flex items-center space-x-6">
            {/* Enlaces */}
            <div className="flex items-center space-x-6">
  <button
    onClick={handleProductosClick}
    className={`text-white ${HOVER_TEXT_COLOR_CLASS} transition-colors font-normal text-sm md:text-base tracking-wide`}
  >
    Productos
  </button>

  <a
    href="/contacto"
    className={`text-white ${HOVER_TEXT_COLOR_CLASS} transition-colors font-normal text-sm md:text-base tracking-wide`}
  >
    Contacto
  </a>

  <button
    onClick={handleMayoristasClick}
    className={`text-white ${HOVER_TEXT_COLOR_CLASS} transition-colors font-normal text-sm md:text-base tracking-wide`}
  >
    Mayorista
  </button>
</div>


            {/* Botón del Carrito */}
            <button
              onClick={openCart}
              className={`
                relative p-2 rounded-full ${ACCENT_COLOR_CLASS} text-white 
                hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 ${RING_COLOR_CLASS}
              `}
              aria-label="Ver Carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.023.824l3.397 19.34a2.25 2.25 0 0 0 2.15 1.625h16.516a.75.75 0 0 0 .75-.75V11.25A.75.75 0 0 0 23.25 10H8.025a2.25 2.25 0 0 1-2.25-2.25V3h1.386Z"
                />
              </svg>

              {totalItems > 0 && (
                <span className="
                  absolute top-0 right-0 inline-flex items-center justify-center 
                  w-5 h-5 text-xs font-bold text-white 
                  transform translate-x-1/4 -translate-y-1/4 bg-red-800 rounded-full border border-gray-900
                ">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 🔴 Versión Mobile */}
        <div className="flex sm:hidden justify-between items-center w-full relative">
          {/* Hamburguesa izquierda */}
          <button onClick={() => setOpenMenu((v) => !v)} className="text-white" aria-label="Abrir menú">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo centrado */}
          <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/PP1.png" alt="SECRETO Logo" className="h-10 w-auto" />
          </a>

          {/* Carrito derecha */}
          <button
            onClick={openCart}
            className={`
              relative p-2 rounded-full ${ACCENT_COLOR_CLASS} text-white 
              hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 ${RING_COLOR_CLASS}
            `}
            aria-label="Ver Carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.023.824l3.397 19.34a2.25 2.25 0 0 0 2.15 1.625h16.516a.75.75 0 0 0 .75-.75V11.25A.75.75 0 0 0 23.25 10H8.025a2.25 2.25 0 0 1-2.25-2.25V3h1.386Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-red-800 rounded-full border border-gray-900">
                {totalItems}
              </span>
            )}
          </button>

          {/* Menú desplegable (con overlay clicable y z-index alto) */}
          {/* Menú desplegable debajo del icono */}
{/* Menú desplegable debajo del icono con fade+slide */}
{openMenu && (
  <div className="absolute top-12 left-0 w-44 bg-black/70 backdrop-blur-md flex flex-col items-start py-3 px-4 rounded-md shadow-lg z-30 animate-fadeSlide divide-y divide-gray-700/40">
    <button
      onClick={handleProductosClick}
      className="text-white hover:text-red-600 text-sm font-light tracking-wide w-full text-left py-1"
    >
      Productos
    </button>
    <button
      onClick={handleContactoClick}
      className="text-white hover:text-red-600 text-sm font-light tracking-wide w-full text-left py-1"
    >
      Contacto
    </button>
    <button
      onClick={handleMayoristasClick}
      className="text-white hover:text-red-600 text-sm font-light tracking-wide w-full text-left py-1"
    >
      Mayoristas
    </button>
  </div>
)}


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
