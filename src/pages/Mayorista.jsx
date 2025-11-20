import React from "react";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

const combos = [
  {
    id: 1,
    titulo: "Combo - 28 Geles Sextual",
    descripcion: "Pack de 28 geles Sextual en sabores Frutilla, Chicle, Anal, Neutro, Frío, Calor y Dulce de leche. Ideal para surtido mayorista. Cada unidad queda a $2.785.",
    precio: 78000,
    imagen: "/images/combos/combosextual.jpg",
  },
  {
    id: 2,
    titulo: "Combo - 14 Geles + 14 Aceites Sextual",
    descripcion: "Incluye 14 geles Sextual surtidos y 14 aceites Sextual surtidos. Cada unidad queda a $2.785.",
    precio: 78000,
    imagen: "/images/combos/combosurtidogelaceite.jpg",
  },
  {
    id: 3,
    titulo: "Combo - Aceites Sextual",
    descripcion: "Pack de aceites Sextual versión Natural, Uva, Cereza, Chocomenta, Vainilla y Piña Colada. Cada unidad queda a $2.785.",
    precio: 78000,
    imagen: "/images/combos/combosextualaceite.jpg",
  },
  {
    id: 4,
    titulo: "Combo - 8 Dildos",
    descripcion: "Selección de 8 dildos de alta demanda. Cada unidad queda a $13.800.",
    precio: 108000,
    imagen: "/images/combos/combodildo.jpg",
  },
  {
    id: 5,
    titulo: "Combo - 10 Body Splash Sexitive",
    descripcion: "10 Body Splash Sexitive surtidos con fragancias irresistibles en Afrodisíacos y con Glitter. Cada unidad queda a $6.500.",
    precio: 65000,
    imagen: "/images/combos/combobodysplash.jpg",
  },
  {
    id: 6,
    titulo: "Caja - 12 Ultra Hombre",
    descripcion: "Caja con 12 unidades individuales de vigorizante Ultra Hombre. Cada unidad queda a $2.700.",
    precio: 32000,
    imagen: "/images/combos/comboultrahombre.jpg",
  },
  {
    id: 7,
    titulo: "Caja - 4 Unidades Ultra Mujer (x4 cápsulas)",
    descripcion: "Cada caja contiene 4 unidades, y cada unidad trae 4 cápsulas de vigorizante Ultra Mujer. Precio por unidad: $7.000.",
    precio: 28000,
    imagen: "/images/combos/comboultramujer.jpg",
  },
  {
    id: 8,
    titulo: "Combo - Disfraces Candy Lips",
    descripcion: "Pack de disfraces Candy Lips. Cada unidad queda a $11.700.",
    precio: 70000,
    imagen: "/images/combos/combodisfraces.jpg",
  },
];

const Mayorista = () => {
  const { agregarItem } = useCarrito();

  return (
    <div id="mayorista" className="min-h-screen bg-black text-white p-8">
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
        Descubrí nuestros combos exclusivos pensados para vos.
      </motion.p>

      {/* Beneficios clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-lg mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-black p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold text-red-700 mb-2">Monto mínimo</h3>
          <p className="text-white">Compra mayorista desde $200.000.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-black p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold text-red-700 mb-2">Rápida salida laboral</h3>
          <p className="text-white">Productos con alta demanda y rotación constante.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-black p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold text-red-700 mb-2">Amplio margen</h3>
          <p className="text-white">Ganancias atractivas para tu negocio.</p>
        </motion.div>
      </div>

      {/* Grid de combos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
  {combos.map((combo, idx) => (
    <motion.div
      key={combo.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.2, duration: 0.6 }}
      className="bg-black rounded-xl shadow-lg overflow-hidden flex flex-col max-w-sm mx-auto"
    >
      <img
        src={combo.imagen}
        alt={combo.titulo}
        className="w-full aspect-square object-cover"
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
          onClick={() =>
            agregarItem(
              {
                id: combo.id,
                nombre: combo.titulo,
                precio: combo.precio,
                imagen: combo.imagen,
              },
              1
            )
          }
          className="mt-4 bg-red-600 hover:bg-red-800 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Agregar al carrito
        </motion.button>
      </div>
    </motion.div>
  ))}
</div>

    </div>
  );
};

export default Mayorista;
