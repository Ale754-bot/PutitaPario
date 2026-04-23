import React from "react";
import { useCarrito } from "../context/CarritoContext";

const OfertaSemanal = () => {
  const { agregarItem } = useCarrito();

  const ofertaDestacada = {
    id: 9999,
    nombre: " 2 Mieles Vital Honey + Gel Sextual",
    descripcion: "Oferta especial de dos mieles Vital Honey + Gel Sextual",
    imagen: "/OFERTADESTACADA.png", // tu banner personalizado
    categoria: "Ofertas",
    stock: true,
    marca: "Vital Honey",
    linea: "",
    precio: "30000"
  };

  return (
    <section className="py-12">
      <div className="w-full cursor-pointer flex justify-center">
        <img
          src={ofertaDestacada.imagen}
          alt={ofertaDestacada.nombre}
          className="max-w-full h-auto rounded-lg shadow-lg"
          onClick={() => agregarItem(ofertaDestacada)} // 👈 el banner entero funciona como botón
        />
      </div>
    </section>
  );
};

export default OfertaSemanal;
