import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCardLenceria from "../components/ProductCardLenceria";

import gelesAceitesCremas from "../data/geles-aceites-cremas.json";
import perfumes from "../data/perfumes.json";
import juegosSexuales from "../data/juegos-sexuales.json";
import vigorizantes from "../data/vigorizantes.json";
import juguetes from "../data/juguetes.json";
import plugsAnales from "../data/plugs-anales.json";
import velas from "../data/velas.json";
import lenceria from "../data/lenceria.json";
import disfraces from "../data/disfraces.json";
import arneses from "../data/arneses.json";
import bdsm from "../data/bdsm.json";
import cuidadoIntimo from "../data/cuidadointimo.json";
import dildos from "../data/dildos.json";
import tangas from "../data/tangas.json";
import tops from "../data/tops.json";

import ScrollToTopButton from "../components/ScrollToTopButton";
import PageTransition from "../components/PageTransition";

const groupProductsByCategory = (products) => {
  return products.reduce((acc, product) => {
    const category = product.categoria;
    if (!acc[category]) acc[category] = [];
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
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
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
    ...tops,
    ...lenceria,
    ...tangas,
    ...arneses,
    ...bdsm,
    ...disfraces,
  ];

  const groupedProducts = groupProductsByCategory(allProducts);
  const categories = Object.keys(groupedProducts);

  useEffect(() => {
    if (categoriaParam) {
      const decodedCategoria = decodeURIComponent(categoriaParam).replace(/-/g, " ");
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
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        {/* Menú desplegable de navegación por categoría */}
        <div className="mb-10 flex justify-center">
          <select
            onChange={(e) => {
              const target = document.getElementById(e.target.value);
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="
              rounded-full border border-red-700/40
              bg-black px-5 py-3
              text-xs font-bold uppercase tracking-wide text-white
              shadow-[0_0_18px_rgba(185,28,28,0.22)]
              outline-none transition
              hover:border-red-600
              focus:border-red-600
              sm:text-sm
            "
          >
            <option value="">Explorá por categoría...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {categories.map((category) => {
          const productosPorSub = groupBySubcategoria(groupedProducts[category]);
          const tieneSubcategorias = Object.keys(productosPorSub).length > 1;

          return (
            <section key={category} id={category} className="mb-16 scroll-mt-24 pt-8">
              <div className="mb-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-700">
                  Categoría
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
                  {category}
                </h2>
                <div className="mx-auto mt-3 h-[2px] w-28 bg-gradient-to-r from-transparent via-red-700 to-transparent" />
              </div>

              {/* Botones de navegación por subcategoría */}
              {tieneSubcategorias && (
                <div
                  className="
                    sticky top-0 z-20 mb-8
                    rounded-2xl border border-red-700/25
                    bg-black/85 px-3 py-3
                    backdrop-blur-md
                    shadow-[0_0_28px_rgba(185,28,28,0.18)]
                  "
                >
                  <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
                    {Object.keys(productosPorSub).map((sub) => (
                      <a
                        key={sub}
                        href={`#${normalizeId(sub)}`}
                        className="
                          group relative shrink-0 overflow-hidden rounded-full
                          border border-white/10 bg-white/[0.04]
                          px-4 py-2
                          text-[10px] font-black uppercase tracking-[0.14em] text-white/75
                          transition-all duration-300
                          hover:border-red-600/70
                          hover:bg-red-700/20
                          hover:text-white
                          hover:shadow-[0_0_18px_rgba(220,38,38,0.45)]
                        "
                      >
                        <span className="relative z-10">{sub}</span>
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-600/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Secciones por subcategoría */}
              {category === "Lencería" ? (
  Object.entries(productosPorSub).map(([sub, productos]) => (
    <div
      key={sub}
      id={normalizeId(sub)}
      className="scroll-mt-32 pt-8 mb-12"
    >
      {tieneSubcategorias && (
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-700/70" />
          <h3 className="text-center text-lg font-black uppercase tracking-[0.22em] text-white">
            {sub}
          </h3>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-700/70" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {productos.map((producto, index) => (
          <ProductCardLenceria
            key={producto.id}
            producto={producto}
            index={index}
          />
        ))}
      </div>
    </div>
  ))
) : (
                Object.entries(productosPorSub).map(([sub, productos]) => (
                  <div key={sub} id={normalizeId(sub)} className="scroll-mt-32 pt-8 mb-12">
                    {tieneSubcategorias && (
                      <div className="mb-6 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-700/70" />
                        <h3 className="text-center text-lg font-black uppercase tracking-[0.22em] text-white">
                          {sub}
                        </h3>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-700/70" />
                      </div>
                    )}

                    {/* Lógica especial para Geles lubricantes */}
                    {sub === "Geles lubricantes" ? (
                      <>
                        {/* Filtros de marcas */}
                        <div
                          className="
                            sticky top-0 z-20 mb-8
                            rounded-2xl border border-white/10
                            bg-black/85 px-3 py-3
                            backdrop-blur-md
                            shadow-[0_0_24px_rgba(255,255,255,0.06)]
                          "
                        >
                          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
                            {Object.keys(groupByMarcaLinea(productos)).map((marca) => (
                              <a
                                key={marca}
                                href={`#${normalizeId(marca)}`}
                                className="
                                  shrink-0 rounded-full
                                  border border-white/15 bg-white/[0.04]
                                  px-4 py-2
                                  text-[10px] font-black uppercase tracking-[0.14em] text-white/75
                                  transition-all duration-300
                                  hover:border-red-600/70
                                  hover:bg-red-700/20
                                  hover:text-white
                                "
                              >
                                {marca}
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Renderizado por marcas y líneas */}
                        {Object.entries(groupByMarcaLinea(productos)).map(([marca, lineas]) => (
                          <div key={marca} id={normalizeId(marca)} className="mb-12 scroll-mt-32">
                            <div className="mb-6 text-center">
                              <h3 className="text-2xl font-black uppercase tracking-wide text-red-600">
                                {marca}
                              </h3>
                              <div className="mx-auto mt-2 h-[2px] w-20 bg-gradient-to-r from-transparent via-red-700 to-transparent" />
                            </div>

                            {Object.entries(lineas).map(([linea, productosLinea]) => (
                              <div key={linea} className="mb-8">
                                {linea !== "Sin línea" && (
                                  <h4 className="mb-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white/75">
                                    {linea}
                                  </h4>
                                )}

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                                  {productosLinea.map((producto, index) => (
                                    <ProductCard
                                      key={producto.id}
                                      producto={producto}
                                      index={index}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                        {productos.map((producto, index) => (
                          <ProductCard
                            key={producto.id}
                            producto={producto}
                            index={index}
                          />
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