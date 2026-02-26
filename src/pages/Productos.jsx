import React, { useState, useEffect } from 'react';
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
import ScrollToTopButton from "../components/ScrollToTopButton";
import CountdownBanner from "../components/CountdownWidget";


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

// 🔧 Agrupación por marca y línea
const groupByMarcaLinea = (products) => {
  return products.reduce((acc, product) => {
    const marca = product.marca?.trim() || "Sin marca";
    if (!acc[marca]) acc[marca] = {};

    const linea = product.linea?.trim() || "Sin línea";
    if (!acc[marca][linea]) acc[marca][linea] = [];

    acc[marca][linea].push(product);
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
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <PageTransition>
      <CountdownBanner />
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
                    <a
                      key={sub}
                      href={`#${normalizeId(sub)}`}
                      className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-red-500 border border-red-500 rounded-full 
                                 hover:bg-red-600 hover:text-black transition-colors 
                                 shadow-[0_0_8px_rgba(255,0,0,0.6)] hover:shadow-[0_0_15px_rgba(255,0,0,1)]"
                    >
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

                    {/* 🔧 Lógica especial para Geles lubricantes */}
{sub === "Geles lubricantes" ? (
  <>
    {/* Filtros de marcas */}
    <div className="sticky top-0 z-10 bg-black/80 py-2 flex justify-center gap-1 flex-wrap border-b border-gray-700 mb-6">
      {Object.keys(groupByMarcaLinea(productos)).map((marca) => (
        <a
          key={marca}
          href={`#${normalizeId(marca)}`}
          className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white border border-white rounded-full 
                     hover:bg-red-600 hover:text-black transition-colors"
        >
          {marca}
        </a>
      ))}
    </div>

    {/* Renderizado por marcas y líneas */}
    {Object.entries(groupByMarcaLinea(productos)).map(([marca, lineas]) => (
      <div key={marca} id={normalizeId(marca)} className="mb-12">
        <h3 className="text-2xl font-bold text-red-600 text-center mb-6">{marca}</h3>
        {Object.entries(lineas).map(([linea, productosLinea]) => (
          <div key={linea} className="mb-8">
            {linea !== "Sin línea" && (
              <h4 className="text-lg font-semibold text-white mb-4 text-center">{linea}</h4>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productosLinea.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
) : (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {productos.map((producto, index) => (
      <ProductCard key={producto.id} producto={producto} index={index} />
    ))}
  </div>
)}

                  </div>
                ))
              )}
            </section>
          );
        })}
      </main>
      <ScrollToTopButton />
    </PageTransition>
  );
};

export default Productos;
