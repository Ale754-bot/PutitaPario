// src/pages/Home.jsx

import React from 'react';
import Hero from '../components/Hero';
import CategoryScroll from '../components/CategoryScroll';
import ProductCard from '../components/ProductCard';
import productos from '../data/productos.json';
import { Link } from 'react-router-dom'; 

// Muestra solo los 4 primeros productos como "Destacados"
const productosDestacados = productos.slice(0, 4); 

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

              {/* Grilla de solo los 4 productos destacados */}
              <div className="
                  grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 
                  mb-8
              ">
                  {productosDestacados.map((producto, index) => (
                      <ProductCard key={producto.id} producto={producto} index={index} />
                  ))}
              </div>
              
              {/* BOTÓN "VER CATÁLOGO COMPLETO" */}
              <div className="text-center mt-10">
                  <Link 
                      to="/productos" // 👈 Enlaza a la página completa de Productos
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