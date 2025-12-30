import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCarrito } from '../context/CarritoContext';

const ProductCard = ({ producto, index }) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    imagenUrl,
    stock,
    talles,
    variantes,
    marca,
    linea,
    mostrarColor,
    categoria,
    precioOriginal,
    precioOferta
  } = producto;

  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [expandido, setExpandido] = useState(false);
  const { agregarItem } = useCarrito();

  const tieneTalles = talles && talles.length > 0;
  const tieneVariantes = variantes && variantes.length > 0;
  const tieneColores = mostrarColor && variantes?.some(v => v.color);

  const tipoVariante = tieneVariantes
    ? variantes[0]?.talle
      ? "talle"
      : variantes[0]?.tamaño
      ? "tamaño"
      : null
    : null;

  const requiereColor = tieneColores;
  const requiereTalle = tipoVariante === "talle";
  const requiereTamaño = tipoVariante === "tamaño";

  useEffect(() => {
    if (tieneTalles && talles.length === 1) {
      setTalleSeleccionado(talles[0]);
    }
    if (tieneVariantes && variantes.length === 1) {
      setVarianteSeleccionada(variantes[0]);
    }
  }, [talles, variantes]);

  const puedeAgregar =
    stock &&
    (
      (!tieneTalles && !tieneVariantes) ||
      (tieneTalles && talleSeleccionado) ||
      (tieneVariantes && varianteSeleccionada)
    );

  // 🔧 Categorías que deben mostrar precio base siempre
  const categoriasPrecioVisible = ["Arneses", "Velas", "Plugs Anales", "Juguetes"];
  const mostrarPrecioSiempre = categoriasPrecioVisible.includes(categoria);

  // 🔧 Precio base
  const precioBase = mostrarPrecioSiempre
    ? (precio ?? varianteSeleccionada?.precio ?? precioOriginal ?? 0)
    : (varianteSeleccionada?.precio ?? precio ?? precioOriginal ?? 0);

  // 🔧 Oferta automática
  let precioFinal = precioBase;
  let porcentajeOferta = null;

  if (precioOferta && precioOferta < precioBase) {
    precioFinal = precioOferta;
    porcentajeOferta = Math.round(((precioBase - precioOferta) / precioBase) * 100);
  }

  const imagenFinal = varianteSeleccionada?.imagen || imagen || imagenUrl || "/images/placeholder.png";

  const textoBoton = !stock
    ? "Sin stock"
    : tieneTalles && !talleSeleccionado
    ? "Elegí un talle"
    : tieneVariantes && requiereColor && !varianteSeleccionada
    ? "Elegí un color"
    : tieneVariantes && requiereTalle && !varianteSeleccionada
    ? "Elegí un talle"
    : tieneVariantes && requiereTamaño && !varianteSeleccionada
    ? "Elegí un tamaño"
    : "Agregar al carrito";

  const handleAgregar = () => {
    if (!puedeAgregar) return;

    const item = {
      ...producto,
      talle: talleSeleccionado || null,
      variante: varianteSeleccionada?.talle || varianteSeleccionada?.tamaño || null,
      color: varianteSeleccionada?.color || null,
      precio: precioFinal,
      imagen: varianteSeleccionada?.imagen || imagenFinal
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
        {porcentajeOferta && (
  <div className="absolute bottom-2 right-2 bg-gradient-to-r from-red-500 to-black 
                  text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
    {porcentajeOferta}% OFF
  </div>
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
          {porcentajeOferta ? (
            <>
              <p className="text-gray-400 line-through text-xs">
                ${precioBase.toLocaleString("es-AR")}
              </p>
              <p className="text-base text-red-700 font-bold mb-2">
                ${precioFinal.toLocaleString("es-AR")}
              </p>
            </>
          ) : (
            <p className="text-base text-red-700 font-bold mb-2">
              ${precioFinal.toLocaleString("es-AR")}
            </p>
          )}

          {/* Círculos de color */}
          {tieneColores && (
            <div className="flex justify-center gap-2 mb-2">
              {variantes.map((v, idx) => {
                const isSelected = varianteSeleccionada === v;
                return (
                  <button
                    key={idx}
                    onClick={() => setVarianteSeleccionada(v)}
                    className={`
                      w-4 h-4 rounded-full border
                      ${isSelected ? 'border-acento scale-110' : 'border-white/20'}
                      transition-transform duration-300
                    `}
                    style={{ backgroundColor: v.colorHex || v.color?.toLowerCase() || "#999" }}
                    title={v.color}
                  />
                );
              })}
            </div>
          )}

          {/* Botones de variante (si no es color) */}
          {tieneVariantes && !tieneColores && (
            <div className="text-center">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {tipoVariante === "talle" ? "Talle:" : "Tamaño:"}
              </label>
              <div className="flex justify-center gap-2 flex-wrap">
                {variantes.map((v, idx) => {
                  const valor = tipoVariante === "talle" ? v.talle : v.tamaño;
                  const isSelected = varianteSeleccionada === v;
                  return (
                    <button
                      key={idx}
                      onClick={() => setVarianteSeleccionada(v)}
                      className={`
                        px-2 py-1 rounded-full border text-xs
                        ${isSelected ? 'bg-acento text-white' : 'bg-black text-white border-gray-600'}
                        hover:bg-red-800 transition-all
                      `}
                    >
                      {valor}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Botones de talle plano */}
          {tieneTalles && (
            <div className="text-center mt-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Talle:
              </label>
              <div className="flex justify-center gap-2 flex-wrap">
                {talles.map((talle) => (
                  <button
                    key={talle}
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

export default ProductCard;
