import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCardOfertas from "./ProductCardOfertas";

const ofertas = [
  {
    id: 1,
    nombre: "Geles Sextual 200ml",
    descripcion: "Placer sin límites. Degustá, jugá, descubrí. Elegí la que más te guste.",
    precioOriginal: 12000,
    precio: 7500,
    imagen: "/promosextual.jpg",
    variantes: ["Neutro", "Frutilla", "Chicle", "Rosas Anal"],
    stock: true
  },
  {
    id: 2,
    nombre: "Love Potion Sexitive 30ml",
    descripcion: "Aceite comestible con leve efecto calor. Elegí la que más te guste.",
    precioOriginal: 12000,
    precio: 7500,
    imagen: "/promolovepotion.jpg",
    variantes: ["Frutilla","Chocolate","Banana","Menta","Frutos Rojos","Champagne","Dulce de Leche"],
    stock: true
  },
  {
    id: 3,
    nombre: "EOS Sexitive 25ml",
    descripcion: "Lubricantes de silicona que potencian el placer y prolongan la experiencia.",
    precioOriginal: 12000,
    precio: 6500,
    imagen: "/promoeos.jpg",
    variantes: ["Syzygium + Aloe","L'arginina + Maca + Jengibre"],
    stock: true
  },
  {
    id: 4,
    nombre: "Gel Crema Tonificante - The Wild Boys",
    descripcion: "Relaja sin perder sensibilidad. Con caléndula: regenera, suaviza e hidrata.",
    precioOriginal: 16000,
    precio: 9500,
    imagen: "/images/Geles/s-boys1.jpg",
    stock: true
  },
  {
    id: 5,
    nombre: "Gel Crema Anal - The Wild Boys",
    descripcion: "Tonifica y fortalece para erecciones más firmes, duraderas y orgasmos intensos.",
    precioOriginal: 16000,
    precio: 9500,
    imagen: "/images/Geles/s-boys2.jpg",
    stock: true
  },
  {
    id: 6,
    nombre: "Crema íntima - The Wild Boys",
    descripcion: "Eleva tus momentos de placer con la Crema Íntima para Hombres The Wild Boys.",
    precioOriginal: 16000,
    precio: 10000,
    imagen: "/images/Geles/s-boys3.jpg",
    stock: true
  },
  {
    id: 7,
    nombre: "Crema íntima anal - The Wild Boys",
    descripcion: "Dale un toque de suavidad y cuidado a tus momentos más íntimos con The Wild Boys.",
    precioOriginal: 16000,
    precio: 10000,
    imagen: "/images/Geles/s-boys4.jpg",
    stock: true
  }
];

const OfertasHome = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [paused, setPaused] = useState(false); // 👈 nuevo estado para pausar

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    let interval;
    if (itemsPerPage === 1 && !paused) {
      interval = setInterval(() => {
        setPage((prev) => (prev + 1) % ofertas.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [itemsPerPage, paused]);

  return (
    <section className="bg-black text-white py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-4xl font-bold text-center text-red-600 mb-4"
      >
        OFERTAS EN HOTMÉTICA
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center text-gray-400 mb-8 px-4"
      >
        Siete secretos, siete oportunidades irrepetibles
      </motion.p>

      {/* Mobile */}
      <div className="block md:hidden relative px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setPaused(true)}   // 👈 pausa al arrastrar
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) {
                setPage((prev) => (prev + 1) % ofertas.length);
              } else if (info.offset.x > 50) {
                setPage((prev) => (prev - 1 + ofertas.length) % ofertas.length);
              }
              setPaused(false); // 👈 reanuda al soltar
            }}
            onMouseEnter={() => setPaused(true)}  // 👈 pausa al quedarse encima
            onMouseLeave={() => setPaused(false)} // 👈 reanuda al salir
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProductCardOfertas producto={ofertas[page]} index={page} />
          </motion.div>
        </AnimatePresence>

        {/* Dots en mobile */}
        <div className="flex justify-center mt-4 gap-2">
          {ofertas.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPage(i);
                setPaused(true); // 👈 pausa si elige manualmente
              }}
              className={`w-3 h-3 rounded-full ${i === page ? "bg-red-600" : "bg-gray-500"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex overflow-x-scroll space-x-6 px-4 snap-x snap-mandatory scrollbar-hide">
        {ofertas.map((oferta, i) => (
          <ProductCardOfertas key={oferta.id} producto={oferta} index={i} />
        ))}
      </div>
    </section>
  );
};

export default OfertasHome;
