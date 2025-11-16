import React from "react";
import { motion } from "framer-motion";

const combos = [
  {
    id: 1,
    titulo: "Combo 1",
    descripcion: "",
    precio: 200000,
    imagen: "/images/combos/lenceria10.jpg",
  },
  {
    id: 2,
    titulo: "Combo 2",
    descripcion: "",
    precio: 200000,
    imagen: "/images/combos/juguetes-usb5.jpg",
  },
  {
    id: 3,
    titulo: "Combo 3",
    descripcion: "",
    precio: 200000,
    imagen: "/images/combos/premium3.jpg",
  },
];

const Mayorista = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Título épico */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-center mb-10 text-red-600"
      >
        Sección Mayorista
      </motion.h1>

      {/* Info introductoria */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
      >
        Descubrí nuestros combos exclusivos pensados para clientes mayoristas.
      </motion.p>

      {/* Grid de combos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {combos.map((combo, idx) => (
          <motion.div
            key={combo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={combo.imagen}
              alt={combo.titulo}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-red-500 mb-2">
                {combo.titulo}
              </h2>
              <p className="text-sm text-gray-300 flex-grow">{combo.descripcion}</p>
              <p className="text-lg font-bold text-white mt-4">
                ${combo.precio.toLocaleString("es-AR")}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-red-600 hover:bg-red-800 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Consultar por WhatsApp
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mayorista;
