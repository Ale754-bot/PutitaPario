import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
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

// Tarjeta individual con botón flotante de WhatsApp
const TarjetaNuevoIngreso = ({ producto }) => {
  const { id, nombre, precio, variantes, imagen } = producto;

  const tieneVariantes = variantes && variantes.length > 0;
  
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(
    tieneVariantes ? variantes[0] : null
  );

  const imagenFinal = varianteSeleccionada?.imagen || imagen || "/images/placeholder.png";
  const colorElegido = varianteSeleccionada?.color || null;

  // Lógica de WhatsApp igual al resto de la página
  const handleConsultarWhatsapp = () => {
    const numeroDuena = "5493412634440";
    
    const mensaje = `Hola 👋, quiero consultar por talles disponibles del producto: ${nombre}${
      colorElegido ? ` (${colorElegido})` : ""
    }. Precio: $${precio?.toLocaleString("es-AR")}`;

    const url = `https://wa.me/${numeroDuena}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="
        snap-center min-w-[260px] w-full max-w-[280px]
        bg-gradient-to-b from-[#111111] to-[#050505]
        border border-white/10 rounded-[22px]
        text-white shadow-[0_0_22px_rgba(220,38,38,0.08)]
        overflow-hidden flex flex-col
        transition-all duration-300 hover:border-red-700/70 hover:shadow-[0_0_35px_rgba(185,28,28,0.35)]
      "
    >
      {/* Imagen del producto con el botón flotante */}
      <div className="relative aspect-square overflow-hidden bg-[#080808]">
        <img
          key={imagenFinal}
          src={imagenFinal}
          alt={nombre}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

        <span className="absolute left-2 top-2 z-10 rounded-full bg-red-600/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur shadow-[0_0_10px_rgba(220,38,38,0.5)]">
          Nuevo
        </span>

        {/* Botón flotante WhatsApp */}
        <button
          onClick={handleConsultarWhatsapp}
          aria-label="Consultar por WhatsApp"
          title="Consultar por WhatsApp"
          className="
            absolute bottom-3 right-3 z-30
            flex h-9 w-9 items-center justify-center
            rounded-full bg-green-500 text-white
            shadow-[0_0_14px_rgba(34,197,94,0.9)]
            transition-all duration-300
            hover:scale-110 hover:bg-green-400 hover:shadow-[0_0_22px_rgba(34,197,94,1)]
            active:scale-95 cursor-pointer
          "
        >
          <FaWhatsapp className="text-[16px]" />
        </button>
      </div>

      {/* Contenido */}
      <div className="flex min-h-[96px] flex-col px-3 pb-3 pt-2">
        <div className="space-y-1">
          <h3 className="min-h-[34px] text-center text-[12px] sm:text-[13px] font-medium leading-snug text-white/95 line-clamp-2">
            {nombre}
          </h3>
          
          <div className="flex items-center justify-center">
            <span className="text-[16px] font-black tracking-tight text-red-600">
              ${precio?.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Selector de colores reducido */}
        {tieneVariantes ? (
          <div className="mt-2 flex min-h-[22px] items-center justify-center gap-1.5 flex-wrap">
            {variantes.map((variante, i) => {
              const esActivo = varianteSeleccionada === variante;

              return (
                <button
                  key={`${variante.color || "color"}-${i}`}
                  onClick={() => setVarianteSeleccionada(variante)}
                  title={variante.color}
                  aria-label={`Seleccionar color ${variante.color}`}
                  className={`
                    h-4 w-4 rounded-full border transition-all duration-200 cursor-pointer
                    ${
                      esActivo
                        ? "scale-110 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)]"
                        : "border-white/30 hover:scale-110 hover:border-white opacity-75 hover:opacity-100"
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
          <div className="min-h-[22px] mt-2" />
        )}

        {colorElegido && (
          <p className="mt-1 text-center text-[9px] text-white/40">
            Consultar talles disponibles
          </p>
        )}
      </div>
    </div>
  );
};

export default NuevosIngresos;