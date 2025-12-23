import React, { useState } from "react";
import promoNavidadData from "../data/promonavidad.json";
import { useCarrito } from "../context/CarritoContext";

const conjuntosCapsula = [
  { id: 2, nombre: "Conjunto Magui Negro", imagen: "/magui2.jpg", precioOriginal: 56000 },
  { id: 3, nombre: "Conjunto Magui Blanco", imagen: "/magui3.jpg", precioOriginal: 56000 },
  { id: 4, nombre: "Conjunto Magui Rosa", imagen: "/magui4.jpg", precioOriginal: 56000 }
];

const aceitesPromo = [
  {
    id: 5000,
    nombre: "Love Potion Sexitive 30ml",
    descripcion: "Aceite comestible con leve efecto calor. Elegí la que más te guste.",
    precioOriginal: 12000,
    imagen: "/promolovepotion.jpg",
    variantes: ["Frutilla","Chocolate","Banana","Menta","Frutos Rojos","Champagne","Dulce de Leche"],
    stock: true
  }
];

const productosPromo = [
  ...promoNavidadData,
  ...conjuntosCapsula,
  ...aceitesPromo
];

export default function PromoEpicSection() {
  const { agregarItem } = useCarrito();

  return (
    <section
      id="promo-section"
      className="py-16 bg-gradient-to-br from-red-800 via-black to-green-700"
    >
      <h2 className="text-4xl font-bold text-center mb-10 
        text-transparent bg-clip-text text-white">
       Noche Buena - Navidad Caliente
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {productosPromo.map((producto) => {
          const precioOriginal = producto.precioOriginal || producto.precio || producto.precioBase || 0;
          const precioPromo = precioOriginal * 0.5;

          // Estado para variantes (color objetos o sabor strings)
          const [selectedVariant, setSelectedVariant] = useState(
            producto.variantes
              ? (typeof producto.variantes[0] === "object"
                  ? producto.variantes[0]
                  : producto.variantes[0]) // primer sabor por defecto
              : null
          );

          const imagenMostrar =
            typeof selectedVariant === "object"
              ? selectedVariant?.imagen || producto.imagen
              : producto.imagen;

          return (
            <div
              key={producto.id}
              className="relative bg-white/10 backdrop-blur-md rounded-lg shadow-md 
                         hover:shadow-yellow-400/50 transition transform hover:-translate-y-1 flex flex-col"
            >
              {/* Tag de descuento */}
              <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-black 
                               text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                50% OFF
              </span>

              {/* Imagen */}
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={imagenMostrar}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="p-4 text-center text-sm flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {producto.nombre}
                  {typeof selectedVariant === "object" && selectedVariant?.color
                    ? ` – ${selectedVariant.color}`
                    : ""}
                </h3>
                {precioOriginal > 0 && (
                  <>
                    <p className="text-gray-400 line-through text-xs">
                      ${precioOriginal.toLocaleString("es-AR")}
                    </p>
                    <p className="text-green-300 font-bold text-base mb-2">
                      ${precioPromo.toLocaleString("es-AR")}
                    </p>
                  </>
                )}

                {/* Variantes de colores (objetos) */}
                {producto.variantes && typeof producto.variantes[0] === "object" && (
                  <div className="flex gap-2 justify-center mb-3">
                    {producto.variantes.map((variant) => (
                      <button
                        key={variant.color}
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedVariant?.color === variant.color
                            ? "border-yellow-400"
                            : "border-white"
                        }`}
                        style={{ backgroundColor: variant.colorHex }}
                      />
                    ))}
                  </div>
                )}

                {/* Variantes de sabores (strings) */}
                {producto.variantes && typeof producto.variantes[0] === "string" && (
                  <select
                    className="mt-2 p-2 rounded-md bg-black/50 text-yellow-300 border border-red-400 text-xs"
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                  >
                    {producto.variantes.map((sabor) => (
                      <option key={sabor}>{sabor}</option>
                    ))}
                  </select>
                )}

                {/* Botón de compra conectado al carrito */}
                <button
                  onClick={() =>
                    agregarItem({
                      ...producto,
                      precio: precioPromo,
                      variante:
                        typeof selectedVariant === "object"
                          ? selectedVariant.color
                          : selectedVariant || null
                    })
                  }
                  className="mt-3 inline-block px-3 py-1 bg-red-800 
                             text-white rounded-md text-xs font-medium transition transform hover:scale-105"
                >
                  Hacer pedido
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
