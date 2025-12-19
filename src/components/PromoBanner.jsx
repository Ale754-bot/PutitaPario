import React from "react";

export default function PromoBanner() {
  return (
    <section className="promo-banner relative w-full">
      {/* Imagen personalizada */}
      <img
        src="/bannernavidad.jpg"
        alt="Banner Promo Navidad"
        className="w-full h-auto object-cover"
      />

      {/* Botón en mobile: debajo del banner */}
      <div className="flex justify-center mt-3 sm:hidden">
        <a
          href="#promo-section"
          className="px-4 py-2 bg-red-800 hover:bg-red-800 text-white rounded-md font-medium text-sm shadow-md transition"
        >
          Ir a promos
        </a>
      </div>

      {/* Botón en desktop: superpuesto */}
     <div className="hidden sm:flex absolute bottom-4 left-1/2 transform -translate-x-1/2">
  <a
    href="#promo-section"
    className="px-6 py-2 bg-red-800 hover:bg-red-800 text-white rounded-md font-semibold text-sm shadow-lg transition transform hover:scale-105"
  >
    Ir a promos
  </a>
</div>

    </section>
  );
}
