// src/components/CrazyBullOferta.jsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const productosCrazyBull = [
  {
    id: 432,
    nombre: "Masturbador Ultra Realístico - Con vibración",
    descripcion: "",
    imagen: "/masturbadorultrareal.jpg",
    categoria: "Juguetes",
    stock: true,
    marca: "",
    linea: "",
    precio: 156000,
    precioOferta: 78000,
    descuento: "50% OFF",
  },
  {
    id: 436,
    nombre: "Masturbador realístico - de Rodillas",
    descripcion: "",
    imagen: "/masturbadorreal2.jpg",
    categoria: "Juguetes",
    stock: true,
    marca: "",
    linea: "",
    precio: 168000,
    precioOferta: 84000,
    descuento: "50% OFF",
  },
];

const CrazyBullOferta = () => {
  return (
    <section className="my-14">
      <div
        className="
          overflow-hidden 
          bg-black
          shadow-[0_0_35px_rgba(185,28,28,0.16)]
        "
      >
        <Link
          to="/productos?categoria=Juguetes"
          className="group block overflow-hidden"
        >
          <img
            src="/crazybull-50off-banner.png"
            alt="Crazy Bull 50% OFF"
            className="
              w-full object-cover
              transition duration-700
              group-hover:scale-[1.015]
              group-hover:brightness-110
            "
          />
        </Link>

        <div className="px-4 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:gap-6">
            {productosCrazyBull.map((producto, index) => (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <ProductCard producto={producto} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrazyBullOferta;