import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const slides = [
  { src: "/PROMO-ACEITES.jpg",
    titulo: "Oferta Relámpago",
    texto: "3 aceites sensuales · A un SÚPER precio · 125ml" },

  { src: "/SO EXCITED.png",
    titulo: "SO EXCITED",
    texto: "Sumergite en una experiencia intensa y sofisticada con HOT Inevitable So Excited, el aceite corporal diseñado para despertar los sentidos y transformar cada caricia en un momento lleno de fuego y conexión." },

  { src: "/PRIVEE.png",
    titulo: "PRIVÉE",
    texto: "Transformá cada caricia en un momento irresistible con HOT Inevitable Privée, el aceite corporal creado para despertar los sentidos, encender la piel y potenciar la conexión íntima." },

  { src: "/VERY SEXY.png",
    titulo: "VERY SEXY",
    texto:"Descubrí el placer del tacto elevado al máximo con BE Aphrodisiac Very Sexy, el aceite corporal que transforma cada caricia en una experiencia profunda, cálida y absolutamente irresistible." },
];

const productos = [
  { 
    id: 1,
    nombre: "SO EXCITED",
    descripcion: "Un aroma profundo y estimulante que enciende la piel.",
    precio: 6500,
    imagen: "/SO EXCITED.png",
    stock: true 
  },
  { 
    id: 2,
    nombre: "PRIVÉE",
    descripcion: "Una fragancia intensa y afrodisíaca que envuelve la piel.",
    precio: 6500,
    imagen: "/PRIVEE.png",
    stock: true 
  },
  { 
    id: 3,
    nombre: "VERY SEXY",
    descripcion: "Una fragancia sensual que despierta los sentidos.",
    precio: 6500,
    imagen: "/VERY SEXY.png",
    stock: true 
  }
];


const OfertaRelampago = () => {
  const [slide, setSlide] = useState(0);
  const { agregarItem } = useCarrito();

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { src, titulo, texto } = slides[slide];

  return (
    <div className="mx-auto w-full bg-black rounded-xl shadow-lg overflow-hidden p-4">
      {/* Layout responsivo */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6">
        
        {/* Slider */}
        <div className="relative min-h-[420px] lg:min-h-[500px]">
          <motion.img
            key={src}
            src={src}
            alt={titulo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Flash overlay */}
          <motion.div
            key={`flash-${slide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white z-10 pointer-events-none"
          />

          {/* Texto */}
          <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <motion.h2
              key={`titulo-${slide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-2xl font-bold drop-shadow-lg"
            >
              {titulo}
            </motion.h2>

            {texto && (
              <motion.p
                key={`texto-${slide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/80 text-sm mt-2 max-w-md"
              >
                {texto}
              </motion.p>
            )}
          </div>
        </div>

        {/* Cards de productos */}
        <div className="mt-4 lg:mt-0">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:snap-none">
            {productos.map((producto, index) => {
              const { nombre, descripcion, precio, precioOriginal, imagen, variantes, stock } = producto;
              const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
              const puedeAgregar = stock && (!variantes || varianteSeleccionada);

              const textoBoton = !stock
                ? "Sin stock"
                : variantes && !varianteSeleccionada
                ? "Elegí un sabor"
                : "Agregar al carrito";

              const handleAgregar = () => {
                if (!puedeAgregar) return;
                const item = { ...producto, variante: varianteSeleccionada, precio };
                agregarItem(item, 1);
              };

              return (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  className="
                    relative snap-center flex-shrink-0 w-64
                    lg:w-auto lg:flex-shrink lg:min-w-0
                    bg-black rounded-xl shadow-lg overflow-hidden flex flex-col border border-red-600
                    transform scale-90 sm:scale-100
                  "
                >
                

                  {/* Imagen */}
                  <img src={imagen} alt={nombre} className="w-full aspect-square object-cover object-center" />

                  {/* Contenido */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-red-500 mb-1">{nombre}</h3>
                    <p className="text-xs text-gray-300 flex-grow">{descripcion}</p>

                    {/* Precio */}
<div className="mt-2">
  <span className="text-lg font-bold text-white">
    ${precio.toLocaleString("es-AR")}
  </span>
</div>


                    {/* Variantes */}
                    {variantes && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {variantes.map((v, i) => {
                          const isSelected = varianteSeleccionada === v;
                          return (
                            <button
                              key={i}
                              onClick={() => setVarianteSeleccionada(v)}
                              className={`
                                px-2 py-1 text-xs rounded-full border
                                ${isSelected ? "bg-red-600 text-white" : "bg-black text-white border-gray-600"}
                                hover:bg-red-800 transition-all
                              `}
                            >
                              {v}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Botón carrito */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAgregar}
                      disabled={!puedeAgregar}
                      className={`
                        mt-3 py-2 rounded-lg font-semibold transition-colors text-sm
                        ${puedeAgregar
                          ? "bg-red-600 hover:bg-red-800 text-white"
                          : "bg-gray-600 text-white cursor-not-allowed"}
                      `}
                    >
                      {textoBoton}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfertaRelampago;
