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
    etiqueta,
    reingreso,
    precioOferta // 🔧 ahora también lo recibimos
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

  const categoriasPrecioVisible = ["Arneses", "Velas", "Plugs Anales", "Juguetes"];
  const mostrarPrecioSiempre = categoriasPrecioVisible.includes(categoria);

  const precioBase = mostrarPrecioSiempre
    ? (precio ?? varianteSeleccionada?.precio ?? precioOriginal ?? 0)
    : (varianteSeleccionada?.precio ?? precio ?? precioOriginal ?? 0);

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

  // 🔧 Ajuste: ahora tomamos precioOferta si existe
  const handleAgregar = () => {
    if (!puedeAgregar) return;

    const precioFinal = varianteSeleccionada?.precioOferta 
      ?? precioOferta 
      ?? precioBase;

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
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
        {etiquetaMarca && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md z-10">
            {etiquetaMarca}
          </span>
        )}
        {reingreso && (
          <span className="absolute top-2 right-2 bg-red-700 text-white text-[10px] px-2 py-1 rounded-md font-semibold shadow-md">
            REINGRESO
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

        {/* Precio con oferta */}
        <div className="mt-3 flex flex-col items-center justify-start">
          {varianteSeleccionada?.precioOferta || precioOferta ? (
            <div className="flex flex-col items-center">
              <span className="text-sm line-through text-gray-400">
                ${ (varianteSeleccionada?.precio ?? precioBase).toLocaleString("es-AR") }
              </span>
              <span className="text-base text-red-700 font-bold">
                ${ (varianteSeleccionada?.precioOferta ?? precioOferta).toLocaleString("es-AR") }
              </span>
            </div>
          ) : (
            <p className="text-base text-red-700 font-bold mb-2">
              ${precioBase.toLocaleString("es-AR")}
            </p>
          )}
        </div>

        {/* Botón */}
        <div className="mt-auto pt-3 flex justify-center">
          <button
            onClick={handleAgregar}
            disabled={!puedeAgregar}
            className={`
              px-6 py-2 rounded font-semibold transition-colors text-xs
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
