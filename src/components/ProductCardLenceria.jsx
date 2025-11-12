import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCarrito } from '../context/CarritoContext';


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
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [expandido, setExpandido] = useState(false);
  const { agregarItem } = useCarrito();

  const tieneVariantes = variantes && variantes.length > 0;
  const tieneColores = mostrarColor && variantes?.some(v => v.color);
  const coloresDisponibles = [...new Set(variantes.map(v => v.color))];
  const tallesPorColor = colorSeleccionado
    ? variantes.filter(v => v.color === colorSeleccionado).map(v => v.talle)
    : [];

  const varianteSeleccionada = variantes.find(
    v => v.color === colorSeleccionado && v.talle === talleSeleccionado
  );

  const variantePorColor = colorSeleccionado
    ? variantes.find(v => v.color === colorSeleccionado)
    : null;

  useEffect(() => {
    if (tieneVariantes && variantes.length === 1) {
      setColorSeleccionado(variantes[0].color);
      setTalleSeleccionado(variantes[0].talle);
    }
  }, [variantes]);

  const puedeAgregar =
    stock &&
    (
      (!tieneVariantes) ||
      (colorSeleccionado && talleSeleccionado && varianteSeleccionada)
    );

  const precioFinal = varianteSeleccionada?.precio ?? precio ?? 0;
  const imagenFinal =
    varianteSeleccionada?.imagen ||
    variantePorColor?.imagen ||
    imagen ||
    imagenUrl ||
    "/images/placeholder.png";

  const textoBoton = !stock
    ? "Sin stock"
    : !colorSeleccionado
    ? "Elegí un color"
    : !talleSeleccionado
    ? "Elegí un talle"
    : "Agregar al carrito";

  const handleAgregar = () => {
  if (!puedeAgregar) return;

  const item = {
    ...producto,
    color: colorSeleccionado,
    talle: talleSeleccionado,
    precio: precioFinal,
    imagen: imagenFinal,
    variantes // ← esto es clave para que el carrito pueda buscar la imagen correcta
  };

  agregarItem(item, 1);
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
    hidden: { opacity: 0, y: 0 },   // 🔧 antes era 30, ahora más corto y natural
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,               // 🔧 más breve y fluido
        ease: 'easeOut',
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className="
        w-full bg-black text-white rounded-xl overflow-hidden shadow-lg 
        transition duration-300 ease-in-out 
        hover:shadow-red/500 hover:scale-[1.02]
        border border-gray-800 hover:border-acento
        flex flex-col
      "
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
                    onClick={() => {
                      setColorSeleccionado(color);
                      setTalleSeleccionado(""); // reset talle
                    }}
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

          {/* Talles por color */}
          {colorSeleccionado && tallesPorColor.length > 0 && (
            <div className="text-center mt-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Talle:
              </label>
              <div className="flex justify-center gap-2 flex-wrap">
                {tallesPorColor.map((talle, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTalleSeleccionado(talle)}
                    className={`
                      px-2 py-1 rounded-full border text-xs
                      ${talleSeleccionado === talle ? 'bg-acento text-white' : 'bg-black text-white border-gray-600'}
                      hover:bg-red-800 transition-all
                    `}
                  >
                    {talle}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botón */}
        <div className="mt-auto pt-3 flex justify-center">
          <button
            onClick={handleAgregar}
            disabled={!puedeAgregar}
            className={`
              px-6 py-2 rounded font-semibold transition-colors text-sm
              ${puedeAgregar
                ? "bg-red-600 hover:bg-red-800 text-white"
                : !stock
                ? "bg-gray-800 text-gray-400 cursor-not-allowed"
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
