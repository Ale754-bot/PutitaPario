import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productos from '../data/productos.json';
import PageTransition from '../components/PageTransition'; // ✅ Importado

// Agrupar productos por categoría
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

  const groupedProducts = groupProductsByCategory(productos);
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
        <h1 className="text-2xl text-center font-bold mb-10 text-white mx-auto pb-1">
          Catálogo de Productos
        </h1>

        {categories.map((category) => (
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
        ))}
      </main>
    </PageTransition>
  );
};

export default Productos;
