import React from "react";
import { motion } from "framer-motion";
import Countdown from "../components/Countdown"

// Datos de la cápsula (6 conjuntos)
const productosCapsula = [
  { id: 1, nombre: "Conjunto 1", imagen: "/ISABEL.jpg" },
  { id: 2, nombre: "Conjunto 2", imagen: "/LEONOR.jpg" },
  { id: 3, nombre: "Conjunto 3", imagen: "/MALEFICA.jpg" },
  { id: 4, nombre: "Conjunto 4", imagen: "/TATIANA.jpg" },
  { id: 5, nombre: "Conjunto 5", imagen: "/URSULA.jpg" },
  { id: 6, nombre: "Conjunto 6", imagen: "/VICTORIA.jpg" }
];

const LenceriaCapsula = () => {
  const fechaDisponible = new Date("2026-03-07"); // sábado
  const hoy = new Date();
  const bloqueado = hoy < fechaDisponible;

  return (
    <section className="py-12 bg-black text-white">
      {/* Banner */}
      <div className="relative mb-10">
        <img
          src="/prueba.jpg"
          alt="Banner Cápsula Lencería"
          className="w-full h-50 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
        {/* Título animado */}
        <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-extrabold text-pink-100 drop-shadow-lg text-center"
        >
            Cápsula de Lencería Exclusiva
        </motion.h2>

        {/* Subtítulo con efecto fade + delay */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-4 text-lg md:text-2xl text-white font-script"
        >
            Disponible en
        </motion.p>
<Countdown />
        {/* Efecto decorativo: línea brillante */}
        <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-4 h-0.5 w-40 bg-gradient-to-r from-pink-400 via-red-500 to-purple-600"
        />
        </div>
      </div>

      {/* Mobile: scroll horizontal */}
      <div className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-6 px-4 lg:hidden">
        {productosCapsula.map((p) => (
          <div key={p.id} className="snap-center min-w-[250px] flex-shrink-0">
            <motion.div
              whileHover={{ scale: bloqueado ? 1 : 1.05 }}
              className="relative rounded-lg overflow-hidden shadow-lg bg-white text-black h-full flex flex-col"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                className={`w-full h-64 object-cover transition-all duration-500 ${
                  bloqueado ? "blur-md brightness-75" : ""
                }`}
              />
              {bloqueado && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11c.828 0 1.5.672 1.5 1.5v3a1.5 1.5 0 01-3 0v-3c0-.828.672-1.5 1.5-1.5zM17 11V9a5 5 0 00-10 0v2"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-white">Disponible el sábado</p>
                </div>
              )}
              {!bloqueado && (
                <div className="p-4">
                  <h3 className="text-lg font-bold">{p.nombre}</h3>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-8 justify-items-stretch items-stretch">
        {productosCapsula.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: bloqueado ? 1 : 1.05 }}
            className="relative rounded-lg overflow-hidden shadow-lg bg-white text-black h-full flex flex-col"
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className={`w-full h-64 object-cover transition-all duration-500 ${
                bloqueado ? "blur-md brightness-75" : ""
              }`}
            />
            {bloqueado && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c.828 0 1.5.672 1.5 1.5v3a1.5 1.5 0 01-3 0v-3c0-.828.672-1.5 1.5-1.5zM17 11V9a5 5 0 00-10 0v2"
                  />
                </svg>
                <p className="mt-2 text-sm text-white">Disponible el sábado</p>
              </div>
            )}
            {!bloqueado && (
              <div className="p-4">
                <h3 className="text-lg font-bold">{p.nombre}</h3>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LenceriaCapsula;
