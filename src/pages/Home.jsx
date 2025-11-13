// src/pages/Home.jsx

import React from 'react';
import Hero from '../components/Hero';
import CategoryScroll from '../components/CategoryScroll';
import Destacados from '../components/Destacados';
import { Link } from 'react-router-dom';
import InstagramBanner from '../components/InstagramBanner';
import PageTransition from '../components/PageTransition'; // ✅ Importación agregada
import { motion } from 'framer-motion';
import { useCarrito } from '../context/CarritoContext'; // ✅ Importar el hook del carrito

const Home = () => {
  const { agregarItem } = useCarrito(); // ✅ función para agregar al carrito

  // 🔥 Producto épico de apertura
  const perfumeApertura = {
    id: "apertura-100ml", // 🔑 importante para identificar en el carrito
    nombre: "ELIXIR FOR HIM 100ML",
    descripcion: "",
    imagen: "/images/perfumes/p1.jpg",
    precio: 13800
  };

  // 🔥 Cápsula Erótica (ahora con 4 conjuntos)
const conjuntosCapsula = [
  { id: 1, nombre: "Conjunto Magui Rojo", imagen: "/magui1.jpg", precio: 56000 },
  { id: 2, nombre: "Conjunto Magui Negro", imagen: "/magui2.jpg", precio: 56000 },
  { id: 3, nombre: "Conjunto Magui Blanco", imagen: "/magui3.jpg", precio: 56000 },
  { id: 4, nombre: "Conjunto Magui Rosa", imagen: "/magui4.jpg", precio: 56000 }
];


  return (
    <PageTransition> {/* ✅ Transición envolvente */}
      <Hero />

      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <CategoryScroll />
        

        {/* 🎉 Oferta Épica de Apertura */}
        <section className="relative py-12 overflow-hidden mt-16 mb-16">
          {/* Imagen de fondo centrada */}
          <div className="absolute inset-0">
            <img
              src="/fondoperfume.jpg"
              alt="Fondo Oferta Perfume"
              className="w-full h-full object-cover object-center opacity-20"
            />
            {/* Overlay degradado */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 text-center max-w-screen-md mx-auto px-6">
            {/* 🎉 Título épico */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              ¡Oferta de Apertura!
            </motion.h2>

            {/* 🌌 Subtítulo narrativo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg md:text-xl text-gray-200 mb-8"
            >
              Celebramos la apertura de nuestra nueva tienda con una OFERTA increíble.
            </motion.p>

            {/* 🧴 Card del producto */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="rounded-xl p-6 shadow-lg inline-block"
            >
              <img
                src={perfumeApertura.imagen}
                alt={perfumeApertura.nombre}
                className="w-48 h-48 object-cover mx-auto rounded-lg mb-8"
              />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {perfumeApertura.nombre}
              </h3>
              <p className="text-gray-300 mb-4">{perfumeApertura.descripcion}</p>
              <span className="text-3xl font-bold text-red-600 block mb-10">
                ${perfumeApertura.precio}
              </span>

              {/* Botón debajo del precio */}
              <button
                onClick={() => agregarItem(perfumeApertura, 1)} // ✅ usa la función del contexto
                className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition"
              >
                Agregar al Carrito
              </button>
            </motion.div>
          </div>
        </section>

        {/* 🔥 Cápsula Erótica */}
        <section className="relative py-16 bg-gradient-to-b from-black via-red-950 to-black mt-20 rounded-xl">
  <div className="text-center mb-12">
    <h2 className="text-5xl font-bold text-white">Lanzamiento Conjunto Magui</h2>
    <p className="text-gray-300 mt-4 text-lg">
      Cuatro conjuntos únicos, diseñados para una experiencia íntima y exclusiva.
    </p>

    {/* 🔥 Descripción general */}
    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-base leading-relaxed">
      Conjunto de charol con cintas, ELABORACIÓN 100% auténtica que no vas a encontrar en otro sitio.
      Es autorregulable por completo, es decir, son piezas pensadas para todos los cuerpos.
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-8 max-w-screen-lg mx-auto">
    {conjuntosCapsula.map((c, idx) => (
      <motion.div
        key={c.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: idx * 0.1 }}
        className="min-w-[250px] md:min-w-0 rounded-xl overflow-hidden shadow-lg bg-black"
      >
        <img src={c.imagen} alt={c.nombre} className="w-full h-80 object-cover" />
        <div className="p-4 text-center">
          <span className="text-2xl font-bold text-red-600 block mb-2">${c.precio}</span>
          {/* 🔎 Texto pequeño debajo del precio */}
          <button
            onClick={() => agregarItem(c, 1)}
            className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition"
          >
            Agregar al Carrito
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</section>

        

        {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
        <section id="destacados" className="mb-16 pt-8">
          <h2 className="text-3xl font-bold mb-8 text-texto-claro border-b-2 border-acento inline-block mt-8">
            Productos Destacados
          </h2>

          {/* Galería independiente */}
          <Destacados />
        </section>

        {/* 🖼️ Sección con imagen de fondo y botón flotante */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-20 rounded-xl shadow-lg">
          {/* Imagen de fondo con opacidad y degradado */}
          <div className="absolute inset-0">
            <img
              src="/local.jpg"
              alt="Local Secreto"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Botón flotante */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <Link
              to="/productos"
              className="
                bg-acento text-white text-lg font-bold px-12 py-3 rounded-full 
                shadow-xl tracking-wider uppercase 
                transition duration-300 transform hover:bg-red-800 hover:scale-[1.05]
              "
            >
              Ver Catálogo Completo
            </Link>
          </div>
        </section>
      </main>

      <InstagramBanner />
    </PageTransition>
  );
};

export default Home;
