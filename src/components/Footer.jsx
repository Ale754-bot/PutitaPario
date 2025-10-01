// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-acento/50 mt-16 p-6">
      <div className="container mx-auto text-center text-texto-claro">
        
        <p className="text-xl font-bold text-acento mb-2">
            SECRETO
        </p>

        <p className="text-sm text-gray-400">
            Tienda Online de Artículos de Placer y Bienestar.
        </p>
        <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
};

export default Footer;