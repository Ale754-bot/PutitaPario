// src/pages/Home.jsx

import React from 'react';
import Hero from '../components/Hero';
import CategoryScroll from '../components/CategoryScroll';
import Destacados from '../components/Destacados';
import { Link } from 'react-router-dom';
import InstagramBanner from '../components/InstagramBanner';

const Home = () => {
  return (
    <>
      <Hero />

<main className="mx-auto max-w-screen-xl px-4 py-8">
        <CategoryScroll />

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
              src="/local.jpg" // reemplazá con tu imagen real
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
    </>
  );
};

export default Home;
