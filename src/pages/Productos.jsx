// src/pages/Productos.jsx

import React from 'react';
import ProductCard from '../components/ProductCard';
import productos from '../data/productos.json'; 

// Función para agrupar productos por categoría
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
    // Lógica de agrupamiento para segmentar la vista
    const groupedProducts = groupProductsByCategory(productos);
    const categories = Object.keys(groupedProducts);
    
    return (
        <main className="container mx-auto p-4 py-8">
            <h1 className="text-4xl font-extrabold mb-10 text-texto-claro border-b-4 border-acento inline-block mx-auto pb-1">
                Catálogo de Productos
            </h1>

            {/* Mapea cada categoría como una sección */}
            {categories.map((category) => (
                <section 
                    key={category} 
                    id={category} // ID para los enlaces del scroll de categorías
                    className="mb-16 pt-8" 
                >
                    <h2 className="text-3xl font-bold mb-8 text-texto-claro border-b-2 border-acento inline-block">
                        {category}
                    </h2>

                    {/* Grilla de productos de esta categoría */}
                    <div className="
                        grid grid-cols-1 gap-8 
                        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    ">
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
    );
};

export default Productos;