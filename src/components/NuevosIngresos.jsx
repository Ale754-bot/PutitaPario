import React, { useState } from "react";
import productosNuevos from "../data/nuevosIngresos.json";
import { useCarrito } from "../context/CarritoContext";

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

// Componente interno con botón de compra activo
const TarjetaNuevoIngreso = ({ producto }) => {
  const { agregarItem } = useCarrito();
  const { id, nombre, precio, variantes, imagen } = producto;

  const tieneVariantes = variantes && variantes.length > 0;
  
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(
    tieneVariantes ? variantes[0] : null
  );
  const [agregado, setAgregado] = useState(false);

  const imagenFinal = varianteSeleccionada?.imagen || imagen || "/images/placeholder.png";

  const handleAgregar = () => {
    // Generamos un ID único combinando el ID base con el color seleccionado
    const carritoId = varianteSeleccionada?.color 
      ? `${id}-${varianteSeleccionada.color}` 
      : `${id}`;

    const productoAñadir = {
      id,
      carritoId,
      nombre,
      precio,
      imagen: imagenFinal,
      color: varianteSeleccionada?.color || null,
      talle: varianteSeleccionada?.talle || producto.talle || null,
    };

    agregarItem(productoAñadir, 1);
    
    // Feedback visual al presionar
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

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
      {/* Imagen del producto - Cuadrada */}
      <div className="w-full aspect-square bg-[#080808] flex items-center justify-center overflow-hidden relative border border-white/5 rounded-lg">
        <img
          key={imagenFinal}
          src={imagenFinal}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-red-600/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur shadow-[0_0_10px_rgba(220,38,38,0.5)]">
          Nuevo
        </span>
      </div>

      {/* Nombre y precio */}
      <h3 className="mt-4 font-semibold text-center text-sm md:text-base line-clamp-2 text-white/95">
        {nombre}
      </h3>
      
      <p className="mt-1 text-red-500 font-black text-lg">
        ${precio?.toLocaleString("es-AR")}
      </p>

      {/* Selector de colores */}
      {tieneVariantes ? (
        <div className="mt-3 flex items-center justify-center gap-1.5 min-h-[24px] flex-wrap">
          {variantes.map((variante, i) => {
            const esActivo = varianteSeleccionada === variante;

            return (
              <button
                key={`${variante.color || "color"}-${i}`}
                onClick={() => setVarianteSeleccionada(variante)}
                title={variante.color}
                aria-label={`Seleccionar color ${variante.color}`}
                className={`
                  w-4 h-4 rounded-full border transition-all duration-200 cursor-pointer
                  ${
                    esActivo
                      ? "scale-125 border-white shadow-[0_0_8px_rgba(220,38,38,0.9)] ring-2 ring-red-600"
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
      ) : (
        <div className="min-h-[24px] mt-3" /> // Espaciador si no tiene variantes
      )}

      {/* Botón de compra activo */}
      <button
        onClick={handleAgregar}
        className={`
          mt-4 w-full py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider
          transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
          ${
            agregado
              ? "bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-red-600 hover:bg-red-700 text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95"
          }
        `}
      >
        {agregado ? (
          <>
            <span>Añadido</span>
            <span>✓</span>
          </>
        ) : (
          "Agregar al carrito"
        )}
      </button>
    </div>
  );
};

export default NuevosIngresos;