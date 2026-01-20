import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // 👈 quitamos Navigation
import "swiper/css";
import "swiper/css/pagination";

const banners = [
  {
    titulo: "",
    imagen: "/CARRUPERFUME.jpg",
    link: "/productos?categoria=perfumes#hombre",
  },
  {
    titulo: "",
    imagen: "/CARRUMAGUI.jpg",
    link: "#capsula-magui",
  },
  {
    titulo: "",
    imagen: "/CARRULABIAL.jpg",
    link: "#labiales-vibradores",
  },
  {
    titulo: "",
    imagen: "/CARRULEN.jpg",
    link: "/productos?categoria=Lencería",
  },
];

const CarruselAnuncios = () => {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden shadow-lg">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <a href={banner.link} className="relative block cursor-pointer">
              <img
  src={banner.imagen}
  alt={banner.titulo}
  className="w-full h-56 sm:h-80 object-contain sm:object-cover"
/>

              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{banner.titulo}</h3>
                <p className="text-sm sm:text-base">{banner.descripcion}</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselAnuncios;
