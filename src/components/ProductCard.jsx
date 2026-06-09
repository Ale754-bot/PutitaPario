// ProductCard.jsx

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCarrito } from "../context/CarritoContext";

const ProductCard = ({ producto, index }) => {
  const {
    nombre,
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
    reingreso,
    precioOferta,
    descuento,
  } = producto;

  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  const { agregarItem } = useCarrito();

  const tieneTalles = talles && talles.length > 0;
  const tieneVariantes = variantes && variantes.length > 0;

  const tieneColores =
    mostrarColor && variantes?.some((v) => v.colorHex || v.color);

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
  }, [talles, variantes, tieneTalles, tieneVariantes]);

  const puedeAgregar =
    stock &&
    ((!tieneTalles && !tieneVariantes) ||
      (tieneTalles && talleSeleccionado) ||
      (tieneVariantes && varianteSeleccionada));

  const categoriasPrecioVisible = [
    "Arneses",
    "Velas",
    "Plugs Anales",
    "Juguetes",
  ];

  const mostrarPrecioSiempre =
    categoriasPrecioVisible.includes(categoria);

  const precioBase = mostrarPrecioSiempre
    ? precio ?? varianteSeleccionada?.precio ?? precioOriginal ?? 0
    : varianteSeleccionada?.precio ??
      precio ??
      precioOriginal ??
      0;

  const imagenFinal =
    varianteSeleccionada?.imagen ||
    imagen ||
    imagenUrl ||
    "/images/placeholder.png";

  const textoBoton = !stock
    ? "Sin stock"
    : tieneTalles && !talleSeleccionado
    ? "Elegí un talle"
    : tieneVariantes &&
      requiereColor &&
      !varianteSeleccionada
    ? "Elegí un color"
    : tieneVariantes &&
      requiereTalle &&
      !varianteSeleccionada
    ? "Elegí un talle"
    : tieneVariantes &&
      requiereTamaño &&
      !varianteSeleccionada
    ? "Elegí un tamaño"
    : "Agregar al carrito";

  const ahora = new Date();

  const inicioPromo = new Date("2026-03-27T00:00:00");
  const finPromo = new Date("2026-03-31T23:59:59");

  const promoActiva =
    ahora >= inicioPromo && ahora <= finPromo;

  const precioFinal = promoActiva
    ? Math.round(precioBase * 0.9)
    : varianteSeleccionada?.precioOferta ??
      precioOferta ??
      precioBase;

  const handleAgregar = () => {
    if (!puedeAgregar) return;

    const item = {
      ...producto,
      talle:
  talleSeleccionado ||
  varianteSeleccionada?.talle ||
  null,

      variante:
        varianteSeleccionada?.talle ||
        varianteSeleccionada?.tamaño ||
        varianteSeleccionada?.color ||
        null,

      color: varianteSeleccionada?.color || null,

      precio: precioFinal,

      imagen:
        varianteSeleccionada?.imagen || imagenFinal,
    };

    agregarItem(item, 1);
  };

  const etiquetaMarca =
    marca && linea
      ? `${marca} · ${linea}`
      : marca || "";

  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 12,
    },

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
        group relative w-full overflow-hidden
        border border-white/10
        bg-gradient-to-b from-[#111111] to-[#050505]
        text-white
        shadow-[0_0_22px_rgba(220,38,38,0.08)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-red-700/70
        hover:shadow-[0_0_35px_rgba(185,28,28,0.35)]
      "
    >
      {/* IMAGEN */}
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

        {/* MARCA */}
        {etiquetaMarca && (
          <span
            className="
              absolute left-2 top-2 z-10
              max-w-[70%] truncate
              rounded-full bg-black/80 px-2 py-1
              text-[9px] font-semibold uppercase tracking-wide text-white
              shadow-md backdrop-blur
            "
          >
            {etiquetaMarca}
          </span>
        )}

        {/* REINGRESO */}
        {reingreso && (
          <span
            className="
              absolute right-2 top-2 z-10
              rounded-full bg-red-700 px-2 py-1
              text-[9px] font-bold uppercase tracking-wide text-white
              shadow-[0_0_12px_rgba(185,28,28,0.7)]
            "
          >
            Reingreso
          </span>
        )}

        {/* PROMO GLOBAL */}
        {promoActiva && stock && (
          <span
            className="
              absolute bottom-3 left-3 z-10
              rounded-full bg-red-600 px-2.5 py-1
              text-[10px] font-bold text-white
              shadow-[0_0_14px_rgba(220,38,38,0.8)]
            "
          >
            10% OFF
          </span>
        )}

        {/* SIN STOCK */}
        {!stock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
            <span
              className="
                rounded-full bg-black px-4 py-2
                text-xs font-bold uppercase tracking-wide text-white
              "
            >
              Agotado
            </span>
          </div>
        )}

        {/* BOTON */}
        <button
          onClick={handleAgregar}
          disabled={!puedeAgregar}
          aria-label={textoBoton}
          title={textoBoton}
          className={`
            absolute bottom-3 right-3 z-30
            flex h-9 w-9 items-center justify-center
            rounded-full
            text-[20px] font-light leading-none
            transition-all duration-300
            active:scale-95

            ${
              puedeAgregar
                ? `
                  bg-red-700 text-white
                  shadow-[0_0_14px_rgba(220,38,38,0.9)]
                  hover:scale-110 hover:bg-red-600
                  hover:shadow-[0_0_22px_rgba(220,38,38,1)]
                `
                : `
                  cursor-not-allowed
                  bg-gray-800 text-gray-400
                  shadow-[0_0_8px_rgba(0,0,0,0.6)]
                `
            }
          `}
        >
          <span className="translate-y-[-1px]">+</span>
        </button>
      </div>

      {/* CONTENIDO */}
      <div className="flex min-h-[96px] flex-col px-3 pb-3 pt-2">
        <div className="space-y-1">
          <h2
            className="
              min-h-[34px]
              line-clamp-2
              text-center text-[12px] font-medium leading-snug text-white/95
              sm:text-[13px]
            "
          >
            {nombre}
          </h2>

          {/* PRECIOS */}
          <div className="flex flex-col items-center justify-center gap-0.5">
            {precioBase > precioFinal && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-[10px] font-semibold text-white/35 line-through">
                  ${precioBase.toLocaleString("es-AR")}
                </span>

                {descuento && (
                  <span
                    className="
                      rounded-full bg-red-700 px-2 py-[1px]
                      text-[8px] font-black uppercase tracking-wide text-white
                      shadow-[0_0_10px_rgba(220,38,38,0.55)]
                    "
                  >
                    {descuento}
                  </span>
                )}
              </div>
            )}

            <span className="text-[16px] font-black tracking-tight text-red-600">
              ${precioFinal.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* COLORES */}
        {tieneColores && (
          <div className="mt-2 flex min-h-[22px] items-center justify-center gap-1.5">
            {variantes.slice(0, 6).map((variante, i) => (
              <button
                key={`${variante.color || "color"}-${i}`}
                onClick={() =>
                  setVarianteSeleccionada(variante)
                }
                title={variante.color}
                className={`
                  h-4 w-4 rounded-full border
                  transition-all duration-200

                  ${
                    varianteSeleccionada === variante
                      ? "scale-110 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)]"
                      : "border-white/30 hover:scale-110 hover:border-white"
                  }
                `}
                style={{
                  backgroundColor:
                    variante.colorHex ||
                    variante.color ||
                    "#ffffff",
                }}
              />
            ))}
          </div>
        )}

        {/* TALLES */}
        {tieneTalles && (
          <div className="mt-2 flex min-h-[22px] flex-wrap items-center justify-center gap-1">
            {talles.slice(0, 6).map((talle) => (
              <button
                key={talle}
                onClick={() =>
                  setTalleSeleccionado(talle)
                }
                className={`
                  rounded-full border px-2 py-[2px]
                  text-[9px] font-bold uppercase
                  transition-all duration-200

                  ${
                    talleSeleccionado === talle
                      ? "border-red-600 bg-red-700 text-white shadow-[0_0_10px_rgba(185,28,28,0.6)]"
                      : "border-white/15 bg-white/5 text-white/60 hover:border-red-700 hover:text-white"
                  }
                `}
              >
                {talle}
              </button>
            ))}
          </div>
        )}

        {/* VARIANTES */}
        {tieneVariantes && !tieneColores && (
          <div className="mt-2 flex min-h-[22px] flex-wrap items-center justify-center gap-1">
            {variantes.slice(0, 6).map((variante, i) => {
              const label =
                variante.talle || variante.tamaño;

              return (
                <button
                  key={`${label}-${i}`}
                  onClick={() =>
                    setVarianteSeleccionada(variante)
                  }
                  className={`
                    rounded-full border px-2 py-[2px]
                    text-[9px] font-bold uppercase
                    transition-all duration-200

                    ${
                      varianteSeleccionada === variante
                        ? "border-red-600 bg-red-700 text-white shadow-[0_0_10px_rgba(185,28,28,0.6)]"
                        : "border-white/15 bg-white/5 text-white/60 hover:border-red-700 hover:text-white"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {!puedeAgregar && stock && (
          <p className="mt-1 text-center text-[9px] font-medium text-red-400">
            {textoBoton}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;