import React from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext"; // ajustá la ruta según tu proyecto

const COLORS = [
  {
    name: "Dorado",
    image: "/images/juguetes/labialdorado.webp",
    gradient: "from-yellow-400 via-yellow-600 to-yellow-800",
    description: "Lujo y sofisticación."
  },
  {
    name: "Fucsia",
    image: "/images/juguetes/labialfuccia.webp",
    gradient: "from-pink-400 via-pink-600 to-pink-800",
    description: "Audacia y energía."
  },
  {
    name: "Rojo",
    image: "/images/juguetes/labialrojo.webp",
    gradient: "from-red-400 via-red-600 to-red-800",
    description: "Pasión e intensidad."
  }
];

const LipstickVibeOffer = () => {
  const { agregarItem } = useCarrito(); // hook del carrito

  return (
    <section className="relative text-white text-center">
      {/* Imagen de fondo absoluta */}
      <img
        src="/labiales.png"
        alt="Labiales"
        className="absolute inset-0 w-full h-full object-cover sm:object-cover object-[10%_center]"
      />

      {/* Overlay con gradiente oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black"></div>

      {/* Contenido principal */}
      <div className="relative z-10 py-30 px-8 sm:px-50 pb-25">
        {/* Título editorial */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold tracking-wide mb-4"
        >
          Tres tonos, tres formas de vibrar
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-neutral-200 max-w-md mx-auto mb-20"
        >
          Dorado, Fucsia y Rojo. Elegí tu estilo, sentí la vibración. Esta semana, oferta exclusiva a $18.000.
        </motion.p>

        {/* Contenedor padre */}
        <div className="flex overflow-x-auto gap-6 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-0 snap-x snap-mandatory sm:items-stretch">
          {COLORS.map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-shrink-0 snap-center flex flex-col justify-between items-center w-fit max-w-xs mx-auto bg-black/40 p-8 rounded-md"
            >
              {/* Contenido superior */}
              <div className="flex flex-col items-center">
                <motion.img
                  src={color.image}
                  alt={`Lápiz vibrador ${color.name}`}
                  className="w-28 sm:w-36 mb-4"
                  animate={{ x: [0, -2, 2, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
                />

                <h3
                  className={`text-lg font-semibold bg-gradient-to-r ${color.gradient} bg-clip-text text-transparent`}
                >
                  {color.name}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 mt-2 mb-2 text-center">
                  {color.description}
                </p>

                {/* Precio */}
                <p className="text-xs sm:text-sm text-neutral-400 line-through">
                  Antes: $28.000
                </p>
                <p className="text-sm sm:text-base text-pink-300 font-semibold">
                  Ahora: $20.000
                </p>
              </div>

              {/* Botón alineado al fondo */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-pink-600 text-white py-1 px-3 rounded-md text-xs font-medium mt-4"
                onClick={() =>
                  agregarItem({
                    id: color.name, // base para generar id único
                    nombre: `Labial ${color.name}`,
                    color: color.name,
                    precio: 18000,
                    imagen: color.image,
                  })
                }
              >
                Agregar al carrito
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Overlays para fade en mobile */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black to-transparent sm:hidden"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black to-transparent sm:hidden"></div>
      </div>
    </section>
  );
};

export default LipstickVibeOffer;
