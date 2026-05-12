// src/components/HotSaleSection.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext";

const getNextFriday2359 = () => {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7;

  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(23, 59, 59, 999);

  if (target <= now) {
    target.setDate(target.getDate() + 7);
  }

  return target;
};

const HOT_SALE_END = getNextFriday2359();

const productosHotSale = [
  {
    id: "combo-sextual-gel-aceite",
    nombre: "Combo Sextual",
    subtitulo: "1 Gel + 1 Aceite",
    descripcion: "A elección",
    imagen: "/Gel-Aceite.png",
    categoria: "Combo",
    stock: true,
    precioOferta: 10000,
    promoTipo: "combo",
    badge: "COMBO",
    nota: "Variedades a elección por WhatsApp",
  },

  {
    id: 727,
    nombre: "Baby Doll simple con colaless",
    imagen: "/images/lenceria/BABYDOLL/BABYDOLLNEGRO.jpg",
    categoria: "Lencería",
    stock: true,
    mostrarColor: true,
    precioBase: 28000,
    precioOferta: 15000,
    badge: "HOT SALE",
    tipo: "lenceria",
    variantes: [
      { color: "Negro", colorHex: "#000000", precio: 28000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL/BABYDOLLNEGRO.jpg" },
      { color: "Rojo", colorHex: "#ff0000", precio: 28000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL/BABYDOLLROJO.jpg" },
      { color: "Verde azulado", colorHex: "#006b6b", precio: 28000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL/BABYDOLLVERDE.jpg" },
      { color: "Azul oscuro", colorHex: "#00008b", precio: 28000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL/BABYDOLLAZUL.jpg" },
      { color: "Rojo oscuro", colorHex: "#8b0000", precio: 28000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL/BABYDOLLROJOOSCURO.jpg" },
      { color: "Rosa", colorHex: "#ffc0cb", precio: 28000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL/BABYDOLLROSA.jpg" },
    ],
  },

  {
    id: 728,
    nombre: "Baby Doll Encaje Bordado y Colaless",
    imagen: "/images/lenceria/BABYDOLL ENCAJE/BABYDOLLENCAJEROJO.jpg",
    categoria: "Lencería",
    stock: true,
    mostrarColor: true,
    precioBase: 25000,
    precioOferta: 15000,
    badge: "HOT SALE",
    tipo: "lenceria",
    variantes: [
      { color: "Rojo", colorHex: "#ff0000", precio: 25000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL ENCAJE/BABYDOLLENCAJEROJO.jpg" },
      { color: "Azul", colorHex: "#00008b", precio: 25000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL ENCAJE/BABYDOLLENCAJEAZUL.jpg" },
      { color: "Negro", colorHex: "#000000", precio: 25000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL ENCAJE/BABYDOLLENCAJENEGRO.jpg" },
      { color: "Bordó", colorHex: "#8b0000", precio: 25000, precioOferta: 15000, imagen: "/images/lenceria/BABYDOLL ENCAJE/BABYDOLLENCAJEBORDO.jpg" },
    ],
  },

  {
    id: 716,
    nombre: "Conjunto Madison",
    imagen: "/images/lenceria/madison/madisonazul.webp",
    categoria: "Lencería",
    stock: true,
    mostrarColor: true,
    precioBase: 40000,
    precioOferta: 20000,
    badge: "HOT SALE",
    tipo: "lenceria",
    variantes: [
      { color: "Azul", colorHex: "#0000FF", precio: 40000, precioOferta: 20000, imagen: "/images/lenceria/madison/madisonazul.webp" },
      { color: "Blanco", colorHex: "#FFFFFF", precio: 40000, precioOferta: 20000, imagen: "/images/lenceria/madison/madisonblanco.webp" },
      { color: "Negro", colorHex: "#000000", precio: 40000, precioOferta: 20000, imagen: "/images/lenceria/madison/madisonnegro.webp" },
      { color: "Rojo", colorHex: "#b30000", precio: 40000, precioOferta: 20000, imagen: "/images/lenceria/madison/madisonrojo.webp" },
      { color: "Rosa", colorHex: "#FFC0CB", precio: 40000, precioOferta: 20000, imagen: "/images/lenceria/madison/madisonrosa.webp" },
    ],
  },

  {
    id: 720,
    nombre: "Corset Marmolado",
    imagen: "/images/lenceria/corset/marmolado/corsetmarmolado.webp",
    categoria: "Lencería",
    stock: true,
    mostrarColor: true,
    precioBase: 15000,
    precioOferta: 10000,
    badge: "HOT SALE",
    tipo: "lenceria",
    variantes: [
      { color: "Rojo Marmolado", colorHex: "#a8323e", precio: 15000, precioOferta: 10000, imagen: "/images/lenceria/corset/marmolado/marmolado.webp" },
      { color: "Chocolate Marmolado", colorHex: "#5a3e2b", precio: 15000, precioOferta: 10000, imagen: "/images/lenceria/corset/marmolado/marmolado2.webp" },
      { color: "Verde Nocturno Marmolado", colorHex: "#1e3a34", precio: 15000, precioOferta: 10000, imagen: "/images/lenceria/corset/marmolado/marmolado3.webp" },
    ],
  },

  {
    id: 721,
    nombre: "Corset Brilloso",
    imagen: "/images/lenceria/corset/brilloso/corsetbrilloso.webp",
    categoria: "Lencería",
    stock: true,
    mostrarColor: true,
    precioBase: 15000,
    precioOferta: 10000,
    badge: "HOT SALE",
    tipo: "lenceria",
    variantes: [
      { color: "Negro con bordado dorado", colorHex: "#1a1a1a", precio: 15000, precioOferta: 10000, imagen: "/images/lenceria/corset/brilloso/corsetnegro.webp" },
      { color: "Celeste con bordado dorado", colorHex: "#a3c9e2", precio: 15000, precioOferta: 10000, imagen: "/images/lenceria/corset/brilloso/corsetceleste.webp" },
      { color: "Blanco con bordado dorado", colorHex: "#f5f5f5", precio: 15000, precioOferta: 10000, imagen: "/images/lenceria/corset/brilloso/corsetblanco.webp" },
    ],
  },

  { id: 5000, nombre: "CONJUNTO VICTORIA", precio: 52000, precioOferta: 25000, imagen: "/VICTORIA.jpg", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 5001, nombre: "CONJUNTO LEONOR", precio: 48000, precioOferta: 25000, imagen: "/LEONOR.jpg", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 5002, nombre: "CONJUNTO TATIANA", precio: 48000, precioOferta: 25000, imagen: "/TATIANA.jpg", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 5003, nombre: "CONJUNTO MALÉFICA", precio: 60000, precioOferta: 25000, imagen: "/MALEFICA.jpg", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 5004, nombre: "CONJUNTO ÚRSULA", precio: 50000, precioOferta: 25000, imagen: "/URSULA.jpg", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 5005, nombre: "CONJUNTO ISABEL", precio: 60000, precioOferta: 25000, imagen: "/ISABEL.jpg", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },

  { id: 6000, nombre: "Corset charol simple Negro", precio: 40000, precioOferta: 25000, imagen: "/CORSETSIMPLE.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 6001, nombre: "Corset charol corazón Negro", precio: 40000, precioOferta: 25000, imagen: "/CORSETCORAZONNEGRO.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 6002, nombre: "Top corazón tira doble Negro", precio: 40000, precioOferta: 25000, imagen: "/TOPCORAZONDOBLE.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 6003, nombre: "Top charol Rojo", precio: 40000, precioOferta: 25000, imagen: "/TOPCHAROLROJO.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 6004, nombre: "Top charol Negro", precio: 40000, precioOferta: 25000, imagen: "/TOPCHAROLNEGRO.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 6005, nombre: "Top corazón perlas Rosa", precio: 40000, precioOferta: 25000, imagen: "/TOPPERLAROSA.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
  { id: 6006, nombre: "Top corazón perlas Rojo", precio: 40000, precioOferta: 25000, imagen: "/TOPPERLAROJO.png", categoria: "Lencería", stock: true, badge: "HOT SALE", tipo: "lenceria-simple" },
];

const getTimeLeft = () => {
  const diff = HOT_SALE_END - new Date();

  if (diff <= 0) {
    return { dias: "00", horas: "00", minutos: "00", segundos: "00" };
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  return {
    dias: String(dias).padStart(2, "0"),
    horas: String(horas).padStart(2, "0"),
    minutos: String(minutos).padStart(2, "0"),
    segundos: String(segundos).padStart(2, "0"),
  };
};

const CountdownBox = ({ value, label }) => (
  <div className="min-w-[58px] rounded-2xl border border-red-700/30 bg-white/[0.04] px-3 py-2 text-center shadow-[0_0_18px_rgba(185,28,28,0.18)]">
    <p className="text-lg font-black text-white">{value}</p>
    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">
      {label}
    </p>
  </div>
);

const HotSaleCard = ({ producto, index }) => {
  const { agregarItem } = useCarrito();

  const tieneColores =
    producto.mostrarColor && producto.variantes?.some((v) => v.colorHex || v.color);

  const coloresDisponibles = producto.variantes
    ? [...new Set(producto.variantes.map((v) => v.color))]
    : [];

  const [colorSeleccionado, setColorSeleccionado] = useState(
    tieneColores ? coloresDisponibles[0] : null
  );

  const varianteSeleccionada = colorSeleccionado
    ? producto.variantes?.find((v) => v.color === colorSeleccionado)
    : null;

  const imagenFinal =
    varianteSeleccionada?.imagen || producto.imagen || "/images/placeholder.png";

  const precioOriginal =
    varianteSeleccionada?.precio ||
    producto.precioBase ||
    producto.precio ||
    producto.precioPromo ||
    0;

  const precioFinal =
    varianteSeleccionada?.precioOferta ||
    producto.precioOferta ||
    producto.precioPromo ||
    producto.precio ||
    0;

  const esLenceria =
    producto.tipo === "lenceria" || producto.tipo === "lenceria-simple";

  const handleAgregar = () => {
    if (!producto.stock) return;

    agregarItem(
      {
        ...producto,
        precio: precioFinal,
        imagen: imagenFinal,
        color: varianteSeleccionada?.color || null,
        variante: varianteSeleccionada?.color || producto.promoTipo || null,
        talle: esLenceria ? "Consultar por talles disponibles" : null,
      },
      1
    );
  };

  const handleWhatsApp = () => {
    const numeroDuena = "5493412634440";
    const mensaje = `Hola 👋, quiero consultar talles disponibles del producto: ${producto.nombre}${
      colorSeleccionado ? ` (${colorSeleccionado})` : ""
    }. Precio Hot Sale: $${precioFinal.toLocaleString("es-AR")}`;

    window.open(
      `https://wa.me/${numeroDuena}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.035 }}
      className="
        group relative w-[200px] shrink-0
        border border-red-700/25
        bg-gradient-to-b from-[#111] to-[#050505]
        text-white shadow-[0_0_18px_rgba(185,28,28,0.12)]
        transition-all duration-300 hover:border-red-600/60
        sm:w-[250px]
      "
    >
      {/* Resto del código de la card se mantiene igual */}
      <div className="relative aspect-[1/1.03] overflow-hidden bg-[#080808]">
        <img
          src={imagenFinal}
          alt={producto.nombre}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-2 top-2 z-10 rounded-full bg-red-700 px-2 py-1 text-[7.5px] font-black uppercase tracking-wide text-white shadow-[0_0_10px_rgba(220,38,38,0.55)]">
          {producto.badge || "HOT SALE"}
        </span>
      </div>

      <div className="flex min-h-[100px] flex-col px-2.5 pb-2.5 pt-2">
        <h3 className="min-h-[28px] text-center text-[10px] font-black uppercase leading-tight text-white/90 line-clamp-2">
          {producto.nombre}
        </h3>

        {producto.subtitulo && (
          <p className="mt-1 text-center text-[8.5px] font-bold uppercase tracking-wide text-red-500">
            {producto.subtitulo}
          </p>
        )}

        <div className="mt-1.5 flex flex-col items-center">
          {precioOriginal > precioFinal && (
            <span className="text-[9px] font-semibold text-white/35 line-through">
              ${precioOriginal.toLocaleString("es-AR")}
            </span>
          )}

          <span className="text-[15px] font-black text-red-600">
            ${precioFinal.toLocaleString("es-AR")}
          </span>
        </div>

        {tieneColores && (
          <div className="mt-1.5 flex min-h-[16px] items-center justify-center gap-1">
            {coloresDisponibles.slice(0, 6).map((color) => {
              const varianteColor = producto.variantes?.find((v) => v.color === color);
              const isSelected = colorSeleccionado === color;

              return (
                <button
                  key={color}
                  onClick={() => setColorSeleccionado(color)}
                  title={color}
                  className={`
                    h-3.5 w-3.5 rounded-full border transition-all duration-200
                    ${isSelected ? "scale-110 border-red-500 shadow-[0_0_8px_rgba(220,38,38,0.85)]" : "border-white/30 hover:scale-110"}
                  `}
                  style={{ backgroundColor: varianteColor?.colorHex || "#fff" }}
                />
              );
            })}
          </div>
        )}

        {producto.nota && (
          <p className="mt-1 text-center text-[8px] leading-tight text-white/35">
            {producto.nota}
          </p>
        )}

        <div className="mt-auto flex items-center justify-center gap-2 pt-2">
          {esLenceria && (
            <button
              onClick={handleWhatsApp}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.65)] transition hover:scale-110 hover:bg-green-400 active:scale-95"
              title="Consultar talle"
            >
              <FaWhatsapp className="text-[13px]" />
            </button>
          )}

          <button
            onClick={handleAgregar}
            disabled={!producto.stock}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-red-700 text-[18px] font-light leading-none text-white shadow-[0_0_12px_rgba(220,38,38,0.75)] transition hover:scale-110 hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-400"
            title="Agregar al carrito"
          >
            <span className="-translate-y-[1px]">+</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const HotSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-14">
      <div className="overflow-hidden rounded-[34px] border border-red-700/25 bg-black shadow-[0_0_35px_rgba(185,28,28,0.16)]">
        <img
          src="/BANNERHOTSALE.png"
          alt="Hot Sale"
          className="w-full object-cover"
        />

        <div className="px-4 py-6">
          <div className="mb-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-red-600">
              Termina en
            </p>

            <div className="mt-3 flex justify-center gap-2">
              <CountdownBox value={timeLeft.dias} label="Días" />
              <CountdownBox value={timeLeft.horas} label="Hs" />
              <CountdownBox value={timeLeft.minutos} label="Min" />
              <CountdownBox value={timeLeft.segundos} label="Seg" />
            </div>
          </div>

          {/* === CONTENEDOR CORREGIDO === */}
          <div className="-mx-4 px-4 pb-2 lg:mx-0 lg:px-0 
                          overflow-x-auto overflow-y-hidden 
                          touch-action-pan-y touch-action-pan-x
                          overscroll-behavior-x-contain
                          -webkit-overflow-scrolling-touch">
            
            <div className="grid grid-flow-col grid-rows-2 auto-cols-[200px] gap-3 sm:auto-cols-[220px] lg:grid-flow-row lg:grid-rows-none lg:auto-cols-auto lg:grid-cols-5 lg:gap-5">
              {productosHotSale.map((producto, index) => (
                <HotSaleCard key={producto.id} producto={producto} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotSaleSection;