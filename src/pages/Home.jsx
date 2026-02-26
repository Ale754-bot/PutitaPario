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
import PromoPopup from "../components/PromoPopup";
import CarruselAnuncios from "../components/CarruselAnuncios";
import OfertaCremas from "../components/OfertaCremas";
import NuevosIngresosJuguetes from "../components/NuevosIngresosJuguetes";
import LipstickVibeOffer from "../components/LipstickVibeOffer";





const Home = () => {
  const { agregarItem } = useCarrito(); // ✅ función para agregar al carrito



  return (
    <PageTransition> {/* ✅ Transición envolvente */}
      <Hero />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <CategoryScroll />
        {/* Popup promocional */}
      <PromoPopup />
      <section className="py-10 bg-black text-center px-4">
  <motion.h2
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-white text-lg sm:text-xl font-semibold tracking-wide"
  >
    ¿Ya elegiste tu categoría? <br /> Ahora mirá nuestras ofertas y novedades.
  </motion.h2>
</section>
<section className="mb-20">
  <CarruselAnuncios />
  </section>
{/* Introducción editorial para la sección de aceites */}
{/* Sección Oferta Relámpago */}
<section className="bg-black text-center py-10">
  {/* Título principal de la sección */}

  <NuevosIngresosJuguetes />

  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide mb-6">
    Ofertas Relámpago
  </h2>
  <section className="mb-10">
<OfertaCremas />
  </section>
</section>

 <section id="labiales-vibradores" className="py-10 bg-black text-center px-4">
  <LipstickVibeOffer />
</section>

         {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
        <section id="destacados" className="mb-16 pt-8">
          <h2 className="text-3xl font-bold mb-8 text-texto-claro border-b-2 border-acento inline-block mt-8">
            Productos Destacados
          </h2>

          {/* Galería independiente */}
          <Destacados />
        </section>
      

        
     {/* 🖼️ Sección con GIF de fondo y botón flotante */}
<section className="relative w-full overflow-hidden mt-20 rounded-xl shadow-lg">
  {/* GIF de fondo con opacidad y degradado */}
  <div className="absolute inset-0">
    <img
      src="/LOCALBANNER.gif"
      alt="Local Secreto"
      className="w-full h-auto object-contain opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  </div>

  {/* Botón flotante */}
  <div className="relative z-10 flex items-center justify-center">
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
