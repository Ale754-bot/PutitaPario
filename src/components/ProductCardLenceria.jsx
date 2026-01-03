import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductCardLenceria = ({ producto, index }) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    imagenUrl,
    stock,
    variantes,
    marca,
    linea,
    mostrarColor
  } = producto;

  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [expandido, setExpandido] = useState(false);

  const tieneVariantes = variantes && variantes.length > 0;
  const tieneColores = mostrarColor && variantes?.some(v => v.color);
  const coloresDisponibles = [...new Set(variantes.map(v => v.color))];

  const variantePorColor = colorSeleccionado
    ? variantes.find(v => v.color === colorSeleccionado)
    : null;

  useEffect(() => {
    if (tieneVariantes && variantes.length === 1) {
      setColorSeleccionado(variantes[0].color);
    }
  }, [variantes]);

  const precioFinal = producto.precioBase 
    ?? variantePorColor?.precio 
    ?? precio 
    ?? 0;

  const imagenFinal =
    variantePorColor?.imagen ||
    imagen ||
    imagenUrl ||
    "/images/placeholder.png";

  const handleWhatsApp = () => {
    if (!colorSeleccionado) return;
    const numeroDuena = "5493412634440"; // 🔧 tu número de WhatsApp
    const mensaje = `Hola 👋, quiero consultar por talles disponibles del producto: ${nombre} (${colorSeleccionado}). Precio: $${precioFinal}`;
    const url = `https://wa.me/${numeroDuena}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const etiquetaMarca = marca && linea ? `${marca} · ${linea}` : marca || "";

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: index * 0.05,
      },
    },
  };

  // Texto dinámico del botón
  const textoBoton = !stock
    ? "Sin stock"
    : !colorSeleccionado
    ? "Elegí un color"
    : "Consultar por WhatsApp";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className="w-full bg-black text-white rounded-xl overflow-hidden shadow-lg 
                 transition duration-300 ease-in-out 
                 hover:shadow-red/500 hover:scale-[1.02]
                 border border-gray-800 hover:border-acento
                 flex flex-col"
    >
      {/* Imagen */}
      <div className="w-full aspect-square overflow-hidden relative">
        <img 
          src={imagenFinal} 
          alt={nombre} 
          className="w-full h-full object-cover transition duration-500 hover:scale-120"
        />
        {etiquetaMarca && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md z-10">
            {etiquetaMarca}
          </span>
        )}
        {producto.nuevo && (
  <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md z-10">
    Nuevo
  </span>
)}

        {!stock && (
          <div className="absolute top-0 right-0 bg-gray-900/80 text-white font-bold px-3 py-1 rounded-bl-lg">
            AGOTADO
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Descripción */}
        <div className="flex flex-col gap-1 text-center flex-grow">
          <h2 className="text-sm font-semibold text-white leading-snug break-words">
            {nombre}
          </h2>
          <div
            className={`text-xs text-gray-300 overflow-hidden transition-all duration-300 ${
              expandido ? 'max-h-32' : 'max-h-0'
            }`}
          >
            <p className="leading-tight">{descripcion}</p>
          </div>
          <button
            onClick={() => setExpandido(!expandido)}
            className="text-[11px] text-red-500 mt-1 underline focus:outline-none"
          >
            {expandido ? 'Ver menos' : 'Ver descripción'}
          </button>
        </div>

        {/* Interacción */}
        <div className="mt-3 flex flex-col items-center justify-start">
          <p className="text-base text-red-700 font-bold mb-2">
            ${precioFinal}
          </p>

          {/* Círculos de color */}
          {tieneColores && (
            <div className="flex justify-center gap-2 mb-2">
              {coloresDisponibles.map((color, idx) => {
                const isSelected = colorSeleccionado === color;
                return (
                  <button
                    key={idx}
                    onClick={() => setColorSeleccionado(color)}
                    className={`
                      w-4 h-4 rounded-full border
                      ${isSelected ? 'border-acento scale-110' : 'border-white/20'}
                      transition-transform duration-300
                    `}
                    style={{ backgroundColor: variantes.find(v => v.color === color)?.colorHex || color.toLowerCase() }}
                    title={color}
                  />
                );
              })}
            </div>
          )}

          {/* Mensaje informativo */}
          {colorSeleccionado && (
            <p className="text-xs text-center text-gray-400 mt-1">
              Consultar por talles disponibles
            </p>
          )}
        </div>

        {/* Botón único */}
        <div className="mt-auto pt-3 flex justify-center">
          <button
            onClick={handleWhatsApp}
            disabled={!stock || !colorSeleccionado}
            className={`
              px-6 py-2 rounded font-semibold transition-colors text-sm
              ${stock && colorSeleccionado
                ? "bg-green-600 hover:bg-green-800 text-white"
                : "bg-gray-600 text-white cursor-not-allowed"}
            `}
          >
            {textoBoton}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardLenceria;
