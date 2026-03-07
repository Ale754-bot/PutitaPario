import React from "react";
import ProductCardIngresos from "./ProductCardIngresos";
import productosCapsula from "../data/capsula.json";

// Import Swiper y estilos
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CapsulaDesbloqueada = () => {
  // Dividimos los productos en dos filas
  const fila1 = productosCapsula.slice(0, 3);
  const fila2 = productosCapsula.slice(3, 6);

  return (
    <section className="py-8 bg-black text-white">
      {/* Banner personalizado */}
      <div className="relative mb-10">
        <img
          src="/BANNERCAPSULA.jpg"
          alt="Banner Cápsula Lencería"
          className="w-full h-64 object-contain shadow-lg"
          loading="lazy"
        />
      </div>

      {/* Mobile: dos filas con scroll independiente */}
      <div className="lg:hidden space-y-8 px-4">
        {/* Fila 1 */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.2} // 👈 mantiene tu diseño original
          breakpoints={{
            640: { slidesPerView: 2 },
          }}
          style={{ paddingRight: "20px" }} // 👈 espacio ficticio al final
        >
          {fila1.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductCardIngresos producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fila 2 */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
          }}
          style={{ paddingRight: "20px" }} // 👈 mismo ajuste
        >
          {fila2.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductCardIngresos producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: grid normal */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-8">
        {productosCapsula.map((producto) => (
          <ProductCardIngresos key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
};

export default CapsulaDesbloqueada;
