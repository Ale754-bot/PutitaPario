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
import HomeSlider from "../components/HomeSlider";
import CountdownWidget from "../components/CountdownWidget";






const Home = () => {
  const { agregarItem } = useCarrito(); // ✅ función para agregar al carrito



  return (
    <PageTransition> {/* ✅ Transición envolvente */}
      <Hero />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <CategoryScroll />
        <div className="mt-10"> <CountdownWidget /> </div>
        
      <HomeSlider />

        
      {/* 🖼️ Sección con GIF de fondo y botón flotante */}
<section className="relative w-full h-40 sm:h-56 md:h-72 lg:h-96 overflow-hidden mt-20 shadow-lg">
  {/* GIF de fondo con opacidad y degradado */}
  <div className="absolute inset-0">
    <img
      src="/LOCALBANNER.gif"
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
