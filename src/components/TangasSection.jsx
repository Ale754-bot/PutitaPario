// src/components/TangasSection.js
import React from "react";
import ProductCardTangasConFrases from "./ProductCardTangasConFrases";
import ProductCardTangasConNombres from "./ProductCardTangasConNombres";
import ProductCardTangasPersonalizada from "./ProductCardTangasPersonalizada";

const TangasSection = ({ id, frases, nombres, personalizada }) => {
  return (
    <section
      id={id} // 👈 ahora sí se aplica el id
      className="py-16 bg-gradient-to-b from-black via-pink-950 to-black mt-20 rounded-xl"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white">Tangas Personalizada</h2>
        <p className="text-gray-300 mt-4 text-lg">
          Frases, nombres o totalmente personalizada. Elegí cómo querés expresarte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
        {/* Card 1: Frases */}
        <ProductCardTangasConFrases productos={frases} />

        {/* Card 2: Nombres */}
        <ProductCardTangasConNombres productos={nombres} />

        {/* Card 3: Personalizada */}
        <ProductCardTangasPersonalizada producto={personalizada} />
      </div>
    </section>
  );
};

export default TangasSection;
