import React from "react";

const OffersTicker = () => {
  const handleClick = () => {
    const section = document.querySelector("#catalogo");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full bg-[#0d0101] border-y border-red-800/50 py-3 px-4 overflow-hidden cursor-pointer group select-none transition-all duration-300 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
    >
      {/* 1. Fondo Gradiente Animado estilo Neón */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-red-900/60 to-red-950/40 bg-[length:200%_auto] animate-gradientShift opacity-90" />

      {/* 2. Rayo de Luz / Shimmer continuo */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

      {/* 3. Glow central rojo profundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-8 bg-red-600/20 blur-xl rounded-full pointer-events-none group-hover:bg-red-500/30 transition-all duration-500" />

      {/* Contenido Principal */}
      <div className="relative z-10 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-black tracking-widest uppercase text-white">
        
        {/* Badge 'HOT' con pulso neón */}
        <span className="hidden sm:inline-flex items-center gap-1 bg-red-600/30 border border-red-500/60 text-red-400 text-[10px] px-2.5 py-0.5 rounded-full font-extrabold shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          DESCUENTO ACTIVO
        </span>

        {/* Texto con brillo y hover */}
        <div className="flex items-center gap-2 text-center">
          <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent group-hover:from-red-200 group-hover:to-white transition-all duration-300">
            15% OFF <span className="text-red-400 font-black underline decoration-red-500/80 underline-offset-4">EN COMPRAS +$50.000</span>
          </span>
          <span className="hidden md:inline text-red-300/80 font-normal text-xs">— Se aplica automático en tu carrito</span>
        </div>

        {/* Flecha interactiva */}
        <span className="hidden lg:inline-block text-red-400 group-hover:translate-x-1.5 transition-transform duration-300 font-bold">
          ➔
        </span>
      </div>

      {/* Estilos de Animaciones Integradas */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          animation: gradientShift 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default OffersTicker;