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
import TangasSection from '../components/TangasSection';
import PromoPopup from "../components/PromoPopup";
import CarruselAnuncios from "../components/CarruselAnuncios";
import OfertaCremas from "../components/OfertaCremas";

import LipstickVibeOffer from "../components/LipstickVibeOffer";





const Home = () => {
  const { agregarItem } = useCarrito(); // ✅ función para agregar al carrito

  // 🔥 Cápsula Erótica (ahora con 4 conjuntos)
  const conjuntosCapsula = [ 
    { id: 1, 
      nombre: "Conjunto Magui Rojo", 
      imagen: "/magui1.jpg", 
      precioOriginal: 56000, 
      precioOferta: 30000 }, 
    
    { id: 2, 
      nombre: "Conjunto Magui Negro", 
      imagen: "/magui2.jpg", 
      precioOriginal: 56000, 
      precioOferta: 30000 }, 
      
    { id: 3, 
      nombre: "Conjunto Magui Blanco", 
      imagen: "/magui3.jpg", 
      precioOriginal: 56000, 
      precioOferta: 30000 }, 
      
    { id: 4, 
      nombre: "Conjunto Magui Rosa", 
      imagen: "/magui4.jpg", 
      precioOriginal: 56000, 
      precioOferta: 30000 } 
    ];

// 🔥 Tangas con frases (ejemplo 6)
  const tangasFrases = [
    { id: "frase-1", 
      nombre: "Tanga 'Toda Adentro'", 
      descripcion: "Con frase personalizada",
      imagen: "/tanga1.jpg", 
      precio: 12800, 
      stock: true 
    },

    { id: "frase-2", 
      nombre: "Tanga 'Casate Conmigo'", 
      descripcion: "Con frase personalizada",
      imagen: "/tanga2.jpg", 
      precio: 12800, 
      stock: true 
    },
    { id: "frase-3", 
      nombre: "Tanga 'Felíz Aniversario'", 
      descripcion: "Con frase personalizada",
      imagen: "/tanga3.jpg", 
      precio: 12800, 
      stock: true 
    },
    { id: "frase-4", 
      nombre: "Tanga 'Tu Putita'", 
      descripcion: "Con frase personalizada",
      imagen: "/tanga4.jpg", 
      precio: 12800, 
      stock: true 
    },
    { id: "frase-5", 
      nombre: "Tanga 'Divorciate'", 
      descripcion: "Con frase personalizada",
      imagen: "/tanga5.jpg", 
      precio: 12800, 
      stock: true 
    },
    { id: "frase-6", 
      nombre: "Tanga 'Dame Leche'", 
      descripcion: "Con frase personalizada",
      imagen: "/tanga6.jpg", 
      precio: 12800, 
      stock: true 
    },
  ];

  // 🔥 Tangas con nombres (ejemplo 6)
  const tangasNombres = [
    { id: "nombre-1", nombre: "Tanga 'Diego'",descripcion: "Con nombre personalizado",
      imagen: "/tangadiego.jpg", precio: 12800, stock: true },
    { id: "nombre-2", nombre: "Tanga 'Agustin'", descripcion: "Con nombre personalizado",
      imagen: "/tangagustin.jpg", precio: 12800, stock: true },
    { id: "nombre-3", nombre: "Tanga 'Ignacio'", descripcion: "Con nombre personalizado",
      imagen: "/tangaignacio.jpg", precio: 12800, stock: true },
    { id: "nombre-4", nombre: "Tanga 'Lucas'", descripcion: "Con nombre personalizado",
      imagen: "/tangalucas.jpg", precio: 12800, stock: true },
    { id: "nombre-5", nombre: "Tanga 'Milton'", descripcion: "Con nombre personalizado",
      imagen: "/tangamilton.jpg", precio: 12800, stock: true },
    { id: "nombre-6", nombre: "Tanga 'Rodrigo'", descripcion: "Con nombre personalizado",
      imagen: "/tangarodrigo.jpg", precio: 12800, stock: true },
      { id: "nombre-7", nombre: "Tanga 'Santiago'", descripcion: "Con nombre personalizado",
      imagen: "/tangasantiago.jpg", precio: 12800, stock: true },
  ];

  // 🔥 Tanga personalizada
  const tangaPersonalizada = {
    id: "tanga-personalizada",
    nombre: "Tanga Personalizada",
    descripcion: "Elegí frase, nombre y color. Producción en 72 hs máximo.",
    imagen: "/tanga3.jpg",
    precio: 16000,
    stock: true
  };

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
<section className="mb-20"> <CarruselAnuncios /> </section>
{/* Introducción editorial para la sección de aceites */}
{/* Sección Oferta Relámpago */}
<section className="bg-black text-center py-10">
  {/* Título principal de la sección */}
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
        
        {/* 🎀 Tangas Section */}
        <TangasSection
        id="tangas"
          frases={tangasFrases}
          nombres={tangasNombres}
          personalizada={tangaPersonalizada}
        />

{/* 🔥 Cápsula Erótica */}
<section
  id="capsula-magui"
  className="relative py-16 bg-gradient-to-b from-black via-red-950 to-black mt-20 rounded-xl"
>
  <div className="text-center mb-12">
    <h2 className="text-5xl font-bold text-white">Lanzamiento Conjunto Magui</h2>
    <p className="text-gray-300 mt-4 text-lg">
      Cuatro conjuntos únicos, diseñados para una experiencia íntima y exclusiva.
    </p>

    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-base leading-relaxed">
      Conjunto de charol con cintas, ELABORACIÓN 100% auténtica que no vas a
      encontrar en otro sitio. Es autorregulable por completo, es decir, son
      piezas pensadas para todos los cuerpos.
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-8 max-w-screen-lg mx-auto">
    {conjuntosCapsula.map((c, idx) => {
      const descuento = Math.round(
        ((c.precioOriginal - c.precioOferta) / c.precioOriginal) * 100
      );

      return (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="min-w-[250px] md:min-w-0 rounded-xl overflow-hidden shadow-lg bg-black relative"
        >
          {/* 🔥 Tag de descuento */}
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{descuento}%
          </span>

          <img
            src={c.imagen}
            alt={c.nombre}
            className="w-full h-80 object-cover"
          />

          <div className="p-4 text-center">
            {/* Precio original tachado */}
            <span className="block text-gray-400 line-through text-sm mb-1">
              ${c.precioOriginal.toLocaleString()}
            </span>

            {/* Precio oferta destacado */}
            <span className="text-2xl font-bold text-red-600 block mb-2">
              ${c.precioOferta.toLocaleString()}
            </span>

            {/* Botón agregar al carrito */}
            <button
              onClick={() =>
                agregarItem(
                  {
                    id: c.id,
                    nombre: c.nombre,
                    imagen: c.imagen,
                    precio: c.precioOferta, // 👈 ahora sí se guarda el precio correcto
                  },
                  1
                )
              }
              className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition"
            >
              Agregar al Carrito
            </button>
          </div>
        </motion.div>
      );
    })}
  </div>
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
