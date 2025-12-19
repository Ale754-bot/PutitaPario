// CategoryCard.jsx
import React from "react";

const CategoryCard = ({ name, logo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[200px] h-[300px] relative border border-solid border-white/40 rounded-2xl overflow-hidden snap-start shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      {/* Logo completo nítido */}
      <div className="absolute inset-0">
        <img
          src={logo}
          alt="Logo empresa"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* Capa difusa en la mitad inferior */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <img
          src={logo}
          alt="Logo difuso"
          className="w-full h-full object-contain filter blur-md opacity-70"
        />
      </div>

      {/* Contenido dinámico */}
      <div className="w-full h-full p-2 flex justify-between absolute inset-0">
        <div className="w-3/5 p-2 rounded-xl text-white font-sans leading-snug">
          <p className="text-base font-semibold whitespace-pre-line break-words">
            {name}
          </p>
        </div>

        {/* Flecha como indicador visual */}
        <div className="h-full pt-2 flex flex-col items-end text-white/50">
          <div className="w-8 h-8 mt-auto flex items-center justify-center rounded-full bg-gray-50/20 transition-all duration-300 hover:bg-gray-50/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              className="w-4 h-4 text-white/80"
              fill="currentColor"
            >
              <path d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6 4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
