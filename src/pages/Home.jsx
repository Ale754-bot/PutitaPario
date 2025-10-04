// src/pages/Home.jsx

import React from 'react';
import Hero from '../components/Hero';
import CategoryScroll from '../components/CategoryScroll';
import Destacados from '../components/Destacados'; // 👈 nuevo componente
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero />

      <main className="container mx-auto p-4 py-8">
        <CategoryScroll />

        {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
        <section id="destacados" className="mb-16 pt-8">
          <h2 className="text-3xl font-bold mb-8 text-texto-claro border-b-2 border-acento inline-block mt-8">
            Productos Destacados
          </h2>

          {/* Galería independiente */}
          <Destacados />

          {/* BOTÓN "VER CATÁLOGO COMPLETO" */}
          <div className="text-center mt-10">
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
    </>
  );
};

export default Home;
