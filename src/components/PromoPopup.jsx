import React from "react";

export default function EpicPromoBanner() {
  return (
    <div
      className="
        relative text-white shadow-2xl 
        w-full mx-auto my-8 p-6 sm:p-8 rounded-lg overflow-hidden
      "
      style={{
        backgroundImage: "url('/popup.jpg')", // 👉 tu imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay misterioso */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-900/60 to-transparent"></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mb-4 drop-shadow-lg">
          PARA QUE TU PLACER NO PARE...
        </h2>
        <p className="text-base sm:text-lg leading-relaxed mb-6 drop-shadow">
          Con tu compra mayor a <span className="font-semibold">$50.000</span>{" "}
          te llevás un <span className="text-yellow-300 font-bold">regalo exclusivo</span>.
        </p>

        {/* Logo de la empresa */}
        <img
          src="/PP1.png" // 👉 tu logo
          alt="Logo de la empresa"
          className="w-20 sm:w-32 mt-2 drop-shadow-lg"
        />
      </div>
    </div>
  );
}
