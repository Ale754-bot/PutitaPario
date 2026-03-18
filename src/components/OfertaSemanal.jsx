import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "./ProductCard"; 
import ProductCardLenceria from "./ProductCardLenceria"; 
import productosOferta from "../data/ofertaSemanal.json";
import MagicRings from "./MagicRing"; 
import ShinyText from "./ShinyText"; 
import { useCarrito } from "../context/CarritoContext"; // 🔧 importá tu hook

const OfertaSemanal = () => {
  const { agregarItem } = useCarrito(); // obtenemos la función del carrito

  return (
    <section className="relative py-20 text-white overflow-hidden">
      
      {/* Fondo dinámico */}
      <div className="absolute inset-0 -z-10">
        <MagicRings 
          color="#df0000" 
          colorTwo="#ff427b" 
          speed={1.2} 
          ringCount={6} 
          opacity={0.9} 
          followMouse={true} 
          clickBurst={true}
        />
      </div>

      {/* Título con ShinyText */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12"
      >
        <ShinyText 
          text="¡OFERTA SEMANAL!" 
          speed={3} 
          color="#cecece" 
          shineColor="#2e2e2e" 
          spread={120} 
          yoyo={true} 
          pauseOnHover={true} 
          direction="left" 
          className="bg-clip-text text-transparent"
        />
      </motion.h2>

      {/* Mobile: slider */}
      <div className="md:hidden px-6">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1.1}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 2, centeredSlides: false },
          }}
        >
          {productosOferta.map((producto, index) => (
            <SwiperSlide key={producto.id} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="scale-90 transform origin-center drop-shadow-xl transition-all duration-300"
              >
                {producto.categoria === "Lencería" ? (
                  <ProductCardLenceria 
                    producto={producto} 
                    index={index} 
                    onAddToCart={() => agregarItem({ 
                      ...producto, 
                      precio: producto.precioOferta ?? producto.precio 
                    })}
                  />
                ) : (
                  <ProductCard 
                    producto={producto} 
                    index={index} 
                    onAddToCart={() => agregarItem({ 
                      ...producto, 
                      precio: producto.precioOferta ?? producto.precio 
                    })}
                  />
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: grilla */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        className="hidden md:grid md:grid-cols-4 gap-8 px-12"
      >
        {productosOferta.map((producto, index) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="mx-auto rounded-xl overflow-hidden"
          >
            {producto.categoria === "Lencería" ? (
              <ProductCardLenceria 
                producto={producto} 
                index={index} 
                onAddToCart={() => agregarItem({ 
                  ...producto, 
                  precio: producto.precioOferta ?? producto.precio 
                })}
              />
            ) : (
              <ProductCard 
                producto={producto} 
                index={index} 
                onAddToCart={() => agregarItem({ 
                  ...producto, 
                  precio: producto.precioOferta ?? producto.precio 
                })}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OfertaSemanal;
