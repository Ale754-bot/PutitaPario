import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const anuncios = [
  {
    titulo: "🔥 Oferta Dorado",
    descripcion: "Esta semana el labial dorado a precio exclusivo.",
    imagen: "/images/banner-dorado.jpg",
  },
  {
    titulo: "🌸 Novedad Fucsia",
    descripcion: "Nuevo tono fucsia, audaz y energético.",
    imagen: "/images/banner-fucsia.jpg",
  },
  {
    titulo: "🔴 Colección Rojo",
    descripcion: "Pasión e intensidad en nuestra línea roja.",
    imagen: "/images/banner-rojo.jpg",
  },
  {
    titulo: "📦 Envíos",
    descripcion: "Retiro en Galería Córdoba o envío a domicilio.",
    imagen: "/images/banner-envio.jpg",
  },
];

const CarruselAnuncios = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="rounded-lg overflow-hidden"
      >
        {anuncios.map((anuncio, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={anuncio.imagen}
                alt={anuncio.titulo}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-xl font-bold mb-2">{anuncio.titulo}</h3>
                <p className="text-sm">{anuncio.descripcion}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselAnuncios;
