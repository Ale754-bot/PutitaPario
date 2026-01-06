import React, { useState, useEffect } from "react";

export default function EpicPromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo difuminado */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"></div>

          {/* Contenedor responsive */}
          <div
            className="
              relative text-white shadow-2xl 
              w-[90%] max-w-lg h-[300px] sm:h-[460px] 
              mx-4 sm:mx-6 p-6 sm:p-8 animate-zoomIn overflow-hidden
            "
            style={{
              backgroundImage: "url('/popup.jpg')", // 👉 poné tu imagen aquí
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay misterioso */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-900/60 to-transparent"></div>

            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl z-10"
            >
              ✕
            </button>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mb-4 drop-shadow-lg">
                PARA QUE TU PLACER NO PARE...
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-6 drop-shadow">
                Con tu compra mayor a <span className="font-semibold">$20.000</span>{" "}
                te llevás un <span className="text-yellow-300 font-bold">gel SEXTUAL</span> de regalo.
              </p>

              {/* Logo de la empresa */}
              <img
                src="/PP1.png" // 👉 reemplazá con la ruta real de tu logo
                alt="Logo de la empresa"
                className="w-15 sm:w-32 mt-2 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
