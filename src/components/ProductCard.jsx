import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

const ProductCard = ({ producto }) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    imagenUrl,
    stock,
    talles,
    variantes
  } = producto;

  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const { agregarItem } = useCarrito();

  const tieneTalles = talles && talles.length > 0;
  const tieneVariantes = variantes && variantes.length > 0;

  const puedeAgregar =
    stock &&
    (
      (!tieneTalles && !tieneVariantes) ||
      (tieneTalles && talleSeleccionado) ||
      (tieneVariantes && varianteSeleccionada)
    );

  const precioFinal = varianteSeleccionada?.precio ?? precio ?? 0;
  const imagenFinal = imagen || imagenUrl || "/images/placeholder.png";

  const textoBoton = !stock
    ? "Sin stock"
    : tieneTalles && !talleSeleccionado
    ? "Seleccioná un talle"
    : tieneVariantes && !varianteSeleccionada
    ? "Elegí un tamaño"
    : "Agregar al carrito";

  const clasesBoton = `
    w-full py-3 mt-2 rounded font-bold transition-colors
    ${puedeAgregar
      ? "bg-red-600 hover:bg-red-800 text-white"
      : !stock
      ? "bg-gray-800 text-gray-400 cursor-not-allowed"
      : "bg-gray-600 text-white cursor-not-allowed"}
  `;

  const handleAgregar = () => {
    if (!puedeAgregar) return;

    const item = {
      ...producto,
      talle: talleSeleccionado || null,
      variante: varianteSeleccionada?.tamaño || null,
      precio: precioFinal
    };

    agregarItem(item, 1);
  };

  return (
    <div className="
      w-full min-h-[340px] bg-black text-white rounded-xl overflow-hidden shadow-lg 
      transition duration-300 ease-in-out 
      hover:shadow-acento/50 hover:scale-[1.02]
      border border-gray-800 hover:border-acento
      flex flex-col justify-between
    ">
      {/* Imagen */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imagenFinal} 
          alt={nombre} 
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
        {!stock && (
          <div className="absolute top-0 right-0 bg-gray-900/80 text-white font-bold px-3 py-1 rounded-bl-lg">
            AGOTADO
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4 flex flex-col gap-2">
        <div className="text-center">
  <h2 className="text-lg font-semibold text-white">{nombre}</h2>
  <p className="text-sm text-gray-300 mt-1">{descripcion}</p>
  <p className="text-lg text-red-700 font-bold mt-2">
    ${precioFinal}
  </p>
</div>


        {/* Selector visual de variantes */}
{tieneVariantes && (
  <div className="text-center mt-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Elegí un tamaño:
    </label>
    <div className="flex justify-center gap-2 flex-wrap">
      {variantes.map((v, idx) => (
        <button
          key={idx}
          onClick={() => setVarianteSeleccionada(v)}
          className={`
            px-3 py-1 rounded-full border text-sm
            ${varianteSeleccionada?.tamaño === v.tamaño ? 'bg-acento text-white' : 'bg-black text-white border-gray-600'}
            hover:bg-red-800 transition-all
          `}
        >
          {v.tamaño}
        </button>
      ))}
    </div>
  </div>
)}

{/* Selector visual de talles */}
{tieneTalles && (
  <div className="text-center mt-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Seleccioná tu talle:
    </label>
    <div className="flex justify-center gap-2 flex-wrap">
      {talles.map((talle) => (
        <button
          key={talle}
          onClick={() => setTalleSeleccionado(talle)}
          className={`
            px-3 py-1 rounded-full border text-sm
            ${talleSeleccionado === talle ? 'bg-acento text-white' : 'bg-black text-white border-gray-600'}
            hover:bg-red-800 transition-all
          `}
        >
          {talle}
        </button>
      ))}
    </div>
  </div>
)}

        

        <button
          onClick={handleAgregar}
          disabled={!puedeAgregar}
          className={clasesBoton}
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
