import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import { useCarrito } from "../context/CarritoContext";

const SexBoxCarousel = () => {
  const { agregarItem } = useCarrito(); // Hook del carrito

  const sexboxMujer = [
    {
      id: 1,
      nombre: "SexBox Mujer #1",
      precio: 40000,
      imagen: "/BOX-M1.jpg",
      contenido: [
        "Body rojo",
        "Magic dual 2 en 1 (Aceite masajes + lubricante sabor)"
      ]
    },
    {
      id: 2,
      nombre: "SexBox Mujer #2",
      precio: 60000,
      imagen: "/BOX-M2.jpg",
      contenido: [
        "Dados eróticos",
        "Esposas",
        "Plug cola de zorro rosa",
        "Vincha rosa"
      ]
    },
    {
      id: 3,
      nombre: "SexBox Mujer #3",
      precio: 65000,
      imagen: "/BOX-M3.jpg",
      contenido: [
        "Tanga con frase a elección",
        "Crema para masajes afrodisíaca",
        "Vela unión de pareja",
        "Gel lubricante sabor chicle",
        "Perfume afrodisíaco"
      ]
    },
    {
      id: 4,
      nombre: "SexBox Mujer #4",
      precio: 90000,
      imagen: "/BOX-M4.jpg",
      contenido: [
        "Pastillas vigorizantes mujer",
        "Mini póker erótico",
        "Serum potenciador de orgasmo",
        "Vela unión de pareja",
        "Juguete a control remoto inalámbrico"
      ]
    },
    {
      id: 5,
      nombre: "SexBox Mujer #5",
      precio: 100000,
      imagen: "/BOX-M5.jpg",
      contenido: [
        "Conjunto pool party rojo",
        "Lápiz labial vibrador",
        "Body Solsh afrodisíaco con glitter",
        "Vela afrodisíaca",
        "Saborizante sexo oral a elección",
        "Dados eróticos",
        "Orejas Play Boy rojas"
      ]
    }
  ];

  const sexboxHombre = [
    {
      id: 6,
      nombre: "SexBox Hombre #1",
      precio: 48000,
      imagen: "/BOX-H1.jpg",
      contenido: ["Antifaz", "Mordaza", "Látigo"]
    },
    {
      id: 7,
      nombre: "SexBox Hombre #2",
      precio: 50000,
      imagen: "/BOX-H2.jpg",
      contenido: [
        "Antifaz",
        "Vigorizante x2",
        "Gel neutro hombre",
        "Perfume afrodisíaco masculino"
      ]
    },
    {
      id: 8,
      nombre: "SexBox Hombre #3",
      precio: 78000,
      imagen: "/BOX-H3.jpg",
      contenido: [
        "Espuma higiene íntima masculina",
        "Gel lubricante retardante",
        "1 cápsula vigorizante",
        "Dados eróticos",
        "Perfume afrodisíaco",
        "Vela unión de pareja",
        "Anillo peneano"
      ]
    },
    {
      id: 9,
      nombre: "SexBox Hombre #4",
      precio: 90000,
      imagen: "/BOX-H4.jpg",
      contenido: [
        "Espuma higiene íntima masculina",
        "Gel lubricante retardante",
        "Dados eróticos",
        "Perfume afrodisíaco masculino",
        "Spray prolongador de tiempo",
        "Vigorizante en gotas",
        "Vela unión de pareja"
      ]
    },
    {
      id: 10,
      nombre: "SexBox Hombre #5",
      precio: 105000,
      imagen: "/BOX-H5.jpg",
      contenido: [
        "Anillo peneano con vibrador",
        "Vigorizante en gotas",
        "Gel lubricante retardante",
        "Espuma higiene íntima",
        "Esposas"
      ]
    }
  ];



  const Card = ({ product, isActive }) => {
    const [showDetails, setShowDetails] = useState(false);
    const isMobile = window.innerWidth < 1024;

    return (
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={
          isMobile
            ? isActive
              ? { scale: 1, opacity: 1 }   // activa en tamaño normal
              : { scale: 0.85, opacity: 0.3 } // inactivas más chicas
            : isActive
              ? { scale: 1, opacity: 1 }   // activa en tamaño normal
              : { scale: 0.9, opacity: 0.5 } // inactivas más chicas en desktop
        }
        transition={{ duration: 0.3 }}
        className="relative bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col"
      >
        {/* Imagen cuadrada */}
        <div className="bg-white flex items-center justify-center aspect-square relative z-10">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="object-contain w-4/5 h-4/5"
          />
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-2 relative z-10 text-center">
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">{product.nombre}</h3>
            <p className="text-pink-400 font-bold text-sm">
              ${product.precio.toLocaleString("es-AR")}
            </p>
          </div>

          {/* Botón ver detalles */}
          {product.contenido.length > 0 && (
            <>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-pink-400 text-xs mt-1 hover:text-pink-300"
              >
                {showDetails ? "Ocultar detalles" : "Ver detalles"}
              </button>

              {showDetails && (
                <ul className="text-xs text-gray-300 space-y-1 mt-1">
                  {product.contenido.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Botón agregar al carrito */}
          <button
            className="bg-pink-500 hover:bg-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50 transition-all text-white font-bold py-1 px-3 rounded text-xs mx-auto mt-2"
            onClick={() => agregarItem(product, 1)}
          >
            Agregar al carrito
          </button>
        </div>
      </motion.div>
    );
  };

  const renderCarousel = (products, title) => (
    <section className="my-6 md:my-10">
      <h2 className="text-center text-2xl font-bold mb-4 md:mb-6">{title}</h2>

      {/* Mobile: scroll horizontal */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          centeredSlides={true}
          className="px-4"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="w-64">
              {({ isActive }) => <Card product={product} isActive={isActive} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-5 gap-6 px-4">
        {products.map((product) => (
          <Card key={product.id} product={product} isActive={true} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="my-10 min-h-[800px] relative">
      {/* Introducción */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500">
          Regalá placer en San Valentín
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white">
          10 experiencias exclusivas, 5 para ella y 5 para él
        </p>
      </div>

      {/* Carrusel Mujer */}
      {renderCarousel(sexboxMujer, "SexBox Mujer – San Valentín")}

      {/* Carrusel Hombre */}
      {renderCarousel(sexboxHombre, "SexBox Hombre – San Valentín")}
    </div>
  );
};

export default SexBoxCarousel;
