import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import gelesAceitesCremas from '../data/geles-aceites-cremas.json';
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

const Productos = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaParam = params.get("categoria");

  const groupedProducts = groupProductsByCategory(gelesAceitesCremas);
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

  return (
    <PageTransition>
      <main className="mx-auto max-w-screen-xl px-4 py-8">
<h1 className="text-2xl text-center font-bold mb-6 text-white mx-auto">
          Catálogo de Productos
        </h1>

        {categories.map((category) => {
          if (category === "Geles, Aceites & Cremas") {
            const productosGeles = groupedProducts[category].filter(p => p.subcategoria === "Geles lubricantes");
            const productosComestibles = groupedProducts[category].filter(p => p.subcategoria === "Aceites comestibles");
            const productosMasajes = groupedProducts[category].filter(p => p.subcategoria === "Aceites y cremas para masajes");

            return (
              <section key={category} id={category} className="mb-14 pt-4">
                <h2 className="text-2xl font-bold mb-8 text-red-800 text-center">
                  {category}
                </h2>

               {/* Filtros editoriales refinados */}
              <div className="sticky top-0 z-10 bg-black/80 py-3 flex justify-center gap-6 flex-wrap border-b border-gray-700">
                <a href="#geles-lubricantes" className="text-xs sm:text-sm text-white font-medium hover:text-acento tracking-wide transition">
                  Geles lubricantes
                </a>
                <a href="#aceites-comestibles" className="text-xs sm:text-sm text-white font-medium hover:text-acento tracking-wide transition">
                  Aceites comestibles
                </a>
                <a href="#aceites-masajes" className="text-xs sm:text-sm text-white font-medium hover:text-acento tracking-wide transition">
                  Aceites y cremas para masajes
                </a>
              </div>


                {/* Subcategoría: Geles lubricantes */}
                <div id="geles-lubricantes" className="mb-10 pt-4">
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">
                    Geles lubricantes</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productosGeles.map((producto, index) => (
                      <ProductCard key={producto.id} producto={producto} index={index} />
                    ))}
                  </div>
                </div>

                {/* Subcategoría: Aceites comestibles */}
                <div id="aceites-comestibles" className="mb-12 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">
                    Aceites comestibles</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productosComestibles.map((producto, index) => (
                      <ProductCard key={producto.id} producto={producto} index={index} />
                    ))}
                  </div>
                </div>

                {/* Subcategoría: Aceites y cremas para masajes */}
                <div id="aceites-masajes" className="pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">
                    Aceites y cremas para masajes</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productosMasajes.map((producto, index) => (
                      <ProductCard key={producto.id} producto={producto} index={index} />
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // Render normal para otras categorías
          return (
            <section key={category} id={category} className="mb-16 pt-8">
              <h2 className="text-2xl font-bold mb-8 text-red-800 text-center">
                {category}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedProducts[category].map((producto, index) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    index={index}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </PageTransition>
  );
};

export default Productos;
