import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import gelesAceitesCremas from '../data/geles-aceites-cremas.json';
import perfumes from '../data/perfumes.json';
import juegosSexuales from '../data/juegos-sexuales.json';
import vigorizantes from '../data/vigorizantes.json';
import juguetes from '../data/juguetes.json';
import plugsAnales from '../data/plugs-anales.json';
import velas from '../data/velas.json';
import lenceria from '../data/lenceria.json';
import disfraces from '../data/disfraces.json';
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
  if (!text || typeof text !== 'string') return '';
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};


const Productos = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaParam = params.get("categoria");
  const subcategoriaParam = params.get("subcategoria");

  const allProducts = [
    ...gelesAceitesCremas,
    ...perfumes,
    ...juegosSexuales,
    ...vigorizantes,
    ...juguetes,
    ...plugsAnales,
    ...velas,
    ...lenceria,
    ...disfraces
  ];
  const groupedProducts = groupProductsByCategory(allProducts);
  const categories = Object.keys(groupedProducts);

  useEffect(() => {
    const decodedCategoria = decodeURIComponent(categoriaParam || "").replace(/-/g, ' ');
    const decodedSub = decodeURIComponent(subcategoriaParam || "").replace(/-/g, ' ');

    const matchingCategory = categories.find(
      (cat) => cat.toLowerCase() === decodedCategoria.toLowerCase()
    );

    let targetId = null;

    if (matchingCategory && decodedSub) {
      targetId = `${matchingCategory}__${decodedSub}`;
    } else if (matchingCategory) {
      targetId = matchingCategory;
    }

    const target = document.getElementById(normalizeId(targetId));
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [categoriaParam, subcategoriaParam, categories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <PageTransition>
      <main className="mx-auto max-w-screen-xl px-4 py-8">

        {/* Menú desplegable de navegación por categoría */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-xs">
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;
                const target = document.getElementById(value);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                const params = new URLSearchParams(location.search);
                const [categoria, subcategoria] = value.split('__');
                params.set('categoria', categoria);
                if (subcategoria) {
                  params.set('subcategoria', subcategoria);
                } else {
                  params.delete('subcategoria');
                }
                window.history.replaceState(null, '', `/productos?${params.toString()}`);
              }}
              className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-black text-white border border-white/20 text-xs sm:text-sm"
              style={{ textAlignLast: 'center' }}
            >
              <option value="">Ir a categoría o subcategoría...</option>
              {Object.entries(groupedProducts).map(([categoria, productos]) => {
                const subcategorias = Object.keys(groupBySubcategoria(productos));
                return (
                  <optgroup key={categoria} label={categoria}>
                    <option value={normalizeId(categoria)}>{categoria}</option>
                    {subcategorias.map((sub) => (
                      <option
                        key={sub}
                        value={`${normalizeId(categoria)}__${normalizeId(`${categoria}__${sub}`)}`}
                      >
                        └ {sub}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white text-xs">
              ▼
            </div>
          </div>
        </div>

        {categories.map((category) => {
          const productosPorSub = groupBySubcategoria(groupedProducts[category]);
          const tieneSubcategorias = Object.keys(productosPorSub).length > 1;

          return (
            <section key={category} id={normalizeId(category)} className="mb-16 pt-8">
              <h2 className="text-2xl font-bold mb-8 text-red-800 text-center uppercase">
                {category}
              </h2>

              {tieneSubcategorias && (
                <div className="sticky top-0 z-10 bg-black/80 py-2 flex justify-center gap-1 flex-wrap border-b border-gray-700">
                  {Object.keys(productosPorSub).map((sub) => (
                    <a
                      key={sub}
                      href={`#${normalizeId(`${category}__${sub}`)}`}
                      className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white bg-transparent border border-white/20 rounded-full hover:bg-acento hover:text-black transition tracking-tight"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}

              {Object.entries(productosPorSub).map(([sub, productos]) => (
                <div key={sub} id={normalizeId(`${category}__${sub}`)} className="pt-8 mb-12">
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
              ))}
            </section>
          );
        })}
      </main>
    </PageTransition>
  );
};

export default Productos;
