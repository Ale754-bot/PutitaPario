import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaWhatsapp } from "react-icons/fa";

const ProductCardLenceria = ({ producto, index }) => {
  const {
    nombre,
    precioBase,
    imagen,
    imagenUrl,
    stock,
    variantes,
    marca,
    linea,
    mostrarColor,
  } = producto;

  const [colorSeleccionado, setColorSeleccionado] = useState(null);

  const tieneVariantes = variantes && variantes.length > 0;
  const tieneColores =
    mostrarColor && variantes?.some((v) => v.colorHex || v.color);

  const coloresDisponibles = variantes
    ? [...new Set(variantes.map((v) => v.color))]
    : [];

  const variantePorColor = colorSeleccionado
    ? variantes?.find((v) => v.color === colorSeleccionado)
    : null;

  useEffect(() => {
    if (tieneVariantes && variantes?.length === 1) {
      setColorSeleccionado(variantes[0].color);
    }
  }, [variantes, tieneVariantes]);

  const precioVariante = variantePorColor?.precio ?? precioBase ?? 0;

  const ahora = new Date();
  const inicioPromo = new Date("2026-03-27T00:00:00");
  const finPromo = new Date("2026-03-31T23:59:59");
  const promoActiva = ahora >= inicioPromo && ahora <= finPromo;

  const precioFinal = promoActiva
    ? Math.round(precioVariante * 0.9)
    : variantePorColor?.precioOferta ?? precioVariante;

  const imagenFinal =
    variantePorColor?.imagen || imagen || imagenUrl || "/images/placeholder.png";

  const puedeConsultar = stock && (!tieneColores || colorSeleccionado);

  const textoBoton = !stock
    ? "Sin stock"
    : tieneColores && !colorSeleccionado
    ? "Elegí un color"
    : "Consultar por WhatsApp";

  const handleWhatsApp = () => {
    if (!puedeConsultar) return;

    const numeroDuena = "5493412634440";

    const mensaje = `Hola 👋, quiero consultar por talles disponibles del producto: ${nombre}${
      colorSeleccionado ? ` (${colorSeleccionado})` : ""
    }. Precio: $${precioFinal.toLocaleString("es-AR")}`;

    const url = `https://wa.me/${numeroDuena}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const etiquetaMarca = marca && linea ? `${marca} · ${linea}` : marca || "";

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: index * 0.04,
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
        group relative w-full overflow-hidden rounded-[22px]
        bg-gradient-to-b from-[#111111] to-[#050505]
        text-white
        border border-white/10
        shadow-[0_0_22px_rgba(220,38,38,0.08)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-red-700/70
        hover:shadow-[0_0_35px_rgba(185,28,28,0.35)]
      "
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-[#080808]">
        <motion.img
          key={imagenFinal}
          src={imagenFinal}
          alt={nombre}
          initial={{ opacity: 0.75, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="
            h-full w-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

        {etiquetaMarca && (
          <span className="absolute left-2 top-2 z-10 max-w-[70%] truncate
                           rounded-full bg-black/80 px-2 py-1
                           text-[9px] font-semibold uppercase tracking-wide text-white
                           shadow-md backdrop-blur">
            {etiquetaMarca}
          </span>
        )}

        {!stock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-black px-4 py-2 text-xs font-bold uppercase text-white">
              Agotado
            </span>
          </div>
        )}

        {promoActiva && stock && (
          <span className="absolute bottom-3 left-3 z-10
                           rounded-full bg-red-600 px-2.5 py-1
                           text-[10px] font-bold text-white
                           shadow-[0_0_14px_rgba(220,38,38,0.8)]">
            10% OFF
          </span>
        )}

        {/* Botón flotante WhatsApp */}
        <button
          onClick={handleWhatsApp}
          disabled={!puedeConsultar}
          aria-label={textoBoton}
          title={textoBoton}
          className={`
            absolute bottom-3 right-3 z-30
            flex h-9 w-9 items-center justify-center
            rounded-full
            transition-all duration-300
            active:scale-95
            ${
              puedeConsultar
                ? `
                  bg-green-500 text-white
                  shadow-[0_0_14px_rgba(34,197,94,0.9)]
                  hover:scale-110 hover:bg-green-400
                  hover:shadow-[0_0_22px_rgba(34,197,94,1)]
                `
                : `
                  cursor-not-allowed
                  bg-gray-800 text-gray-400
                  shadow-[0_0_8px_rgba(0,0,0,0.6)]
                `
            }
          `}
        >
          <FaWhatsapp className="text-[16px]" />
        </button>
      </div>

      {/* Contenido */}
      <div className="flex min-h-[96px] flex-col px-3 pb-3 pt-2">
        <div className="space-y-1">
          <h2 className="min-h-[34px] text-center text-[12px] sm:text-[13px]
                         font-medium leading-snug text-white/95 line-clamp-2">
            {nombre}
          </h2>

          <div className="flex items-center justify-center gap-2">
            {promoActiva && (
              <span className="text-[10px] text-white/35 line-through">
                ${precioVariante.toLocaleString("es-AR")}
              </span>
            )}

            <span className="text-[16px] font-black tracking-tight text-red-600">
              ${precioFinal.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Colores */}
        {tieneColores && (
          <div className="mt-2 flex min-h-[22px] items-center justify-center gap-1.5">
            {coloresDisponibles.slice(0, 7).map((color, idx) => {
              const varianteColor = variantes?.find((v) => v.color === color);
              const isSelected = colorSeleccionado === color;

              return (
                <button
                  key={`${color}-${idx}`}
                  onClick={() => setColorSeleccionado(color)}
                  title={color}
                  className={`
                    h-4 w-4 rounded-full border transition-all duration-200
                    ${
                      isSelected
                        ? "scale-110 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)]"
                        : "border-white/30 hover:scale-110 hover:border-white"
                    }
                  `}
                  style={{
                    backgroundColor:
                      varianteColor?.colorHex || varianteColor?.color || "#fff",
                  }}
                />
              );
            })}
          </div>
        )}

        {stock && tieneColores && !colorSeleccionado && (
          <p className="mt-1 text-center text-[9px] text-red-400">
            Elegí un color
          </p>
        )}

        {stock && colorSeleccionado && (
          <p className="mt-1 text-center text-[9px] text-white/40">
            Consultar talles disponibles
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCardLenceria;