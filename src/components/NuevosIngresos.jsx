import React, { useState } from "react";
import productosNuevos from "../data/nuevosIngresos.json";

const NuevosIngresos = ({ bannerUrl = "../INGRESOS LENCERIA.jpg" }) => {
  if (!productosNuevos.length) return null;

  return (
    <section className="py-12 bg-black text-white">
      {/* Banner directo desde public */}
      <div className="relative mb-8 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full overflow-hidden bg-[#0a0a0a]">
          <img
            src="/INGRESOS LENCERIA.jpg"
            alt="Banner Próximos Ingresos"
            className="w-full h-auto max-h-[350px] md:max-h-[450px] object-cover object-center transition-all duration-500"
          />
        </div>
      </div>

      {/* Mobile: scroll horizontal */}
      <div className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-6 px-4 lg:hidden">
        {productosNuevos.map((producto) => (
          <TarjetaNuevoIngreso key={producto.id} producto={producto} />
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6 px-8 max-w-7xl mx-auto justify-items-center">
        {productosNuevos.map((producto) => (
          <TarjetaNuevoIngreso key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
};

// Componente interno para manejar el estado independiente de los colores por producto
const TarjetaNuevoIngreso = ({ producto }) => {
  const { nombre, precio, variantes, imagen } = producto;

  const tieneVariantes = variantes && variantes.length > 0;
  
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(
    tieneVariantes ? variantes[0] : null
  );

  const imagenFinal = varianteSeleccionada?.imagen || imagen || "/images/placeholder.png";

  return (
    <div
      className="
        snap-center min-w-[260px] w-full max-w-[280px]
        bg-gradient-to-b from-[#111111] to-[#050505]
        border border-white/10 rounded-xl
        text-white shadow-[0_0_15px_rgba(220,38,38,0.06)]
        flex flex-col items-center p-4
        transition-all duration-300 hover:border-red-700/50
      "
    >
      {/* Imagen del producto (dinámica según color) */}
      <div className="w-full h-48 bg-[#080808] flex items-center justify-center overflow-hidden relative border border-white/5">
        <img
          key={imagenFinal}
          src={imagenFinal}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white/90 backdrop-blur">
          Próximamente
        </span>
      </div>

      {/* Nombre y precio */}
      <h3 className="mt-4 font-semibold text-center text-sm md:text-base line-clamp-2 text-white/95">
        {nombre}
      </h3>
      
      <p className="mt-1 text-red-600 font-black text-lg">
        ${precio?.toLocaleString("es-AR")}
      </p>

      {/* Selector de colores mediante círculos */}
      {tieneVariantes && (
        <div className="mt-3 flex items-center justify-center gap-2 min-h-[26px] flex-wrap">
          {variantes.map((variante, i) => {
            const esActivo = varianteSeleccionada === variante;

            return (
              <button
                key={`${variante.color || "color"}-${i}`}
                onClick={() => setVarianteSeleccionada(variante)}
                title={variante.color}
                aria-label={`Seleccionar color ${variante.color}`}
                className={`
                  w-5 h-5 rounded-full border transition-all duration-200
                  ${
                    esActivo
                      ? "scale-125 border-white shadow-[0_0_10px_rgba(220,38,38,0.9)] ring-2 ring-red-600"
                      : "border-white/30 hover:scale-110 hover:border-white/80 opacity-75 hover:opacity-100"
                  }
                `}
                style={{
                  backgroundColor: variante.colorHex || variante.color || "#ffffff",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Texto de aviso (Sin botón de compra) */}
      <div className="mt-4 w-full text-center py-2 bg-white/5 border border-white/10 rounded-lg">
        <span className="text-[11px] font-medium tracking-wide text-white/50 uppercase">
          Próximamente a la venta
        </span>
      </div>
    </div>
  );
};

export default NuevosIngresos;