import React from 'react';

const InstagramBanner = () => {
  return (
    <a
  href="https://www.instagram.com/putitapario/"
  target="_blank"
  rel="noopener noreferrer"
  className="relative block w-full h-[300px] md:h-[400px] overflow-hidden group"
>
  {/* Imagen de fondo */}
  <img
    src="/a.jpg" // reemplazá con tu imagen personalizada
    alt="Instagram Secreto"
    className="w-full h-full object-cover brightness-[0.6] transition-all duration-500 group-hover:brightness-[0.8]"
  />

  {/* Texto flotante encima */}
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-white text-xl md:text-2xl font-semibold tracking-wide bg-black/40 px-6 py-3 rounded-md hover:bg-black/60 transition-all duration-300">
      Seguinos en <span className="text-acento">@putitapario</span>
    </p>
  </div>
</a>

  );
};

export default InstagramBanner;
