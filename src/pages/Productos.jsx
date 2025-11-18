import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardLenceria from '../components/ProductCardLenceria';
import gelesAceitesCremas from '../data/geles-aceites-cremas.json';
import perfumes from '../data/perfumes.json';
import juegosSexuales from '../data/juegos-sexuales.json';
import vigorizantes from '../data/vigorizantes.json';
import juguetes from '../data/juguetes.json';
import plugsAnales from '../data/plugs-anales.json';
import velas from '../data/velas.json';
import lenceria from '../data/lenceria.json';
import disfraces from '../data/disfraces.json';
import arneses from '../data/arneses.json';
import bdsm from '../data/bdsm.json';
import cuidadoIntimo from '../data/cuidadointimo.json';
import dildos from '../data/dildos.json';
import tangas from '../data/tangas.json';

import PageTransition from '../components/PageTransition';

const groupProductsByCategory = (products) => {
  return products.reduce((acc, product) => {
    const category = product.categoria;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
};

const groupBySubcategoria = (products) => {
  return products.reduce((acc, product) => {
    const sub = product.subcategoria?.trim() || "Sin subcategoría";
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(product);
    return acc;
  }, {});
};

const normalizeId = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

const Productos = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaParam = params.get("categoria");

  const allProducts = [
    ...gelesAceitesCremas,
    ...perfumes,
    ...juegosSexuales,
    ...vigorizantes,
    ...cuidadoIntimo,
    ...juguetes,
    ...plugsAnales,
    ...dildos,
    ...velas,
    ...lenceria,
    ...tangas,
    ...arneses,
    ...bdsm,
    ...disfraces
  ];

  const groupedProducts = groupProductsByCategory(allProducts);
  const categories = Object.keys(groupedProducts);

  useEffect(() => {
    if (categoriaParam) {
      const decodedCategoria = decodeURIComponent(categoriaParam).replace(/-/g, ' ');
      const matchingKey = categories.find(
        (cat) => cat.toLowerCase() === decodedCategoria.toLowerCase()
      );

      if (matchingKey) {
        const target = document.getElementById(matchingKey);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }
    }
  }, [categoriaParam, categories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <PageTransition>
      <main className="mx-auto max-w-screen-xl px-4 py-8">

        {/* Menú desplegable de navegación por categoría */}
        <div className="mb-8 flex justify-center">
          <select
            onChange={(e) => {
              const target = document.getElementById(e.target.value);
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="px-4 py-2 rounded-md bg-black text-white border border-white/20 text-xs xs:text-base"
          >
            <option value="">Explorá por categoría..</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {categories.map((category) => {
          const productosPorSub = groupBySubcategoria(groupedProducts[category]);
          const tieneSubcategorias = Object.keys(productosPorSub).length > 1;

          return (
            <section key={category} id={category} className="mb-16 pt-8">
              <h2 className="text-2xl font-bold mb-8 text-red-800 text-center uppercase">
                {category}
              </h2>

              {/* Botones de navegación por subcategoría */}
              {tieneSubcategorias && category !== "Lencería" && (
  <div className="sticky top-0 z-10 bg-black/80 py-2 flex justify-center gap-1 flex-wrap border-b border-gray-700">
    {Object.keys(productosPorSub).map((sub) => (
      <a key={sub} href={`#${normalizeId(sub)}`} className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white bg-transparent border border-white/20 rounded-full hover:bg-acento hover:text-black transition tracking-tight">
        {sub}
      </a>
    ))}
  </div>
)}


              {/* Secciones por subcategoría */}
              {category === "Lencería" ? (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {groupedProducts[category].map((producto, index) => (
      <ProductCardLenceria key={producto.id} producto={producto} index={index} />
    ))}
  </div>
) : (
  Object.entries(productosPorSub).map(([sub, productos]) => (
    <div key={sub} id={normalizeId(sub)} className="pt-8 mb-12">
      {tieneSubcategorias && (
        <h3 className="text-xl font-semibold text-white mb-6 text-center">
          {sub}
        </h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto, index) => (
          <ProductCard key={producto.id} producto={producto} index={index} />
        ))}
      </div>
    </div>
  ))
)}

            </section>
          );
        })}
      </main>
    </PageTransition>
  );
};

export default Productos;
