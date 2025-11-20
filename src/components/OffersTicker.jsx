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
    const timer = setTimeout(() => setShowIntro(false), 3000); // Intro dura 2.5s
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % ofertas.length);
      }, 4000); // cada mensaje dura 4s
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
    <div className="relative bg-red-800 backdrop-blur-sm text-white text-sm tracking-wide py-2 overflow-hidden">
      {showIntro ? (
        <div className="text-center font-light animate-fadeIntro">
          ✨ Descubrí nuestras ofertas y novedades con un click
        </div>
      ) : (
        <div
          key={index}
          onClick={() => handleClick(ofertas[index].target)}
          className="text-center font-light tracking-wide animate-fadeCenter cursor-pointer hover:text-red-600 transition-colors"
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
          animation: fadeIntro 1s ease-out forwards;
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
