import React from "react";
import ProductCard from "./ProductCard"; 
import tops from "../data/tops.json";    

const Tops = () => {
  return (
    <section className="py-8">
      {/* Banner */}
      <div className="relative w-full h-40 sm:h-56 md:h-64 mb-8">
        <img
  src="/TOPS.jpg"
  alt="Banner Tops"
  className="max-w-[80%] h-full object-contain mx-auto rounded-lg shadow-lg"
/>


      </div>

      {/* Productos */}
      {/* En mobile → scroll horizontal, en desktop → grid */}
      <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
        {tops.map((top) => (
          <div key={top.id} className="flex-shrink-0 w-56 sm:w-auto">
            <ProductCard producto={top} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tops;
