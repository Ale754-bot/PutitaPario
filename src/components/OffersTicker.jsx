import React, { useState, useEffect } from "react";

const OffersTicker = () => {
  const ofertas = [
    { texto: "Oferta de Apertura ➝ Perfume For Him", target: "#apertura" },
    { texto: "Ofertas Especiales ➝ Hotmética", target: "#ofertas-home" },
    { texto: "Elegí como expresarte ➝ Tangas Personalizadas", target: "#tangas" },
    { texto: "Novedad ➝ Cápsula Erótica Magui", target: "#capsula-magui" },
    { texto: "Lo más pedido ➝ Productos Destacados", target: "#destacados" },
  ];

  const [showIntro, setShowIntro] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % ofertas.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showIntro, ofertas.length]);

  const handleClick = (target) => {
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-red-800/40 backdrop-blur-sm text-white text-sm tracking-wide py-2 overflow-hidden">
      {/* Video de humo en toda la franja */}
      <video
  src="/fondo.mp4"
  autoPlay
  loop
  muted
  playsInline
  onTimeUpdate={(e) => {
    const vid = e.target;
    if (vid.currentTime > vid.duration - 0.5) {
      vid.style.opacity = 0.7; // baja antes de terminar
    } else {
      vid.style.opacity = 0.7; // vuelve al nivel normal
    }
  }}
  className="absolute inset-0 w-full h-full object-cover mix-blend-screen transform scale-x-[-1] transition-opacity duration-800"
/>


      {showIntro ? (
        <div className="relative text-center font-bold animate-fadeIntro z-10">
          Nuestras OFERTAS y NOVEDADES a un toque
        </div>
      ) : (
        <div
          key={index}
          onClick={() => handleClick(ofertas[index].target)}
          className="relative text-center font-light tracking-wide animate-fadeCenter cursor-pointer hover:text-red-600 transition-colors z-10"
        >
          {ofertas[index].texto}
        </div>
      )}

      <style>{`
        @keyframes fadeIntro {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIntro {
          animation: fadeIntro 2s ease-out forwards;
        }

        @keyframes fadeCenter {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fadeCenter {
          animation: fadeCenter 4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OffersTicker;
