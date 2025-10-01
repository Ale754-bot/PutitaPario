// src/components/CategoryScroll.jsx

import React, { useRef, useEffect, useState } from 'react';

// Datos de prueba
const CATEGORIES = [
    { id: 1, name: "Juguetes", image: "/Aji.jpg" }, 
    { id: 2, name: "Geles y Aceites", image: "/Aji.jpg" },
    { id: 3, name: "Indumentaria", image: "/Aji.jpg" },
    { id: 4, name: "Cuidado Íntimo", image: "/Aji.jpg" },
    { id: 5, name: "Perfumes", image: "/Aji.jpg" },
    // Duplicados para el loop (¡Asegúrate que tienes estos archivos también!)
    { id: 6, name: "Juguetes", image: "/Aji.jpg" },
    { id: 7, name: "Geles y Aceites", image: "/Aji.jpg" },
];

const CategoryScroll = () => {
    // Referencia al elemento div para manipular el scroll
    const scrollRef = useRef(null);
    // Estado para controlar si la animación debe pausarse
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        let interval;
        
        // Función para desplazar el scroll
        const startScroll = () => {
            interval = setInterval(() => {
                // 1. Desplazar: Mueve 280px (el tamaño de la tarjeta + margin)
                scrollElement.scrollBy({ left: 280, behavior: 'smooth' });

                // 2. Reiniciar (Loop Infinito): Si llega al final, vuelve al inicio sin que se note
                // La condición es que el scroll llegue al final (scrollWidth - clientWidth)
                const isNearEnd = scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth - 10;
                
                if (isNearEnd) {
                    // Esperamos un momento para que se complete el scroll smooth
                    setTimeout(() => {
                        scrollElement.scrollLeft = 0;
                    }, 500); // Pequeña espera
                }
            }, 3000); // 3 segundos de espera entre movimientos
        };

        // Si el usuario no está interactuando, inicia la animación
        if (!isHovered) {
            startScroll();
        }

        // Limpieza: Detener el intervalo cuando el componente se desmonta o el estado cambia
        return () => clearInterval(interval);
    }, [isHovered]); // Se ejecuta cada vez que el estado de 'hover' cambia

    return (
        <section className="py-12 px-4">
            
            <h2 className="text-3xl font-bold mb-8 text-center text-white mx-auto pb-1 w-fit">
                Explora por Categoría
            </h2>
            
            {/* Contenedor del Carrusel */}
            <div 
                ref={scrollRef} // Asignamos la referencia al div
                onMouseEnter={() => setIsHovered(true)} // Pausar al pasar el ratón
                onMouseLeave={() => setIsHovered(false)} // Reanudar al salir
                // Añado 'overflow-x-scroll' para asegurar el movimiento en todos los navegadores
                className="
                    flex space-x-6 overflow-x-scroll py-4 snap-x snap-mandatory 
                    // Scrollbars más sutiles (depende de la configuración de Tailwind)
                    scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black
                "
            >
                {CATEGORIES.map((category, index) => (
                    <a 
                        key={index} // Usamos el índice porque duplicamos elementos
                        href={`#${category.name.toLowerCase().replace(/\s/g, '-')}`} 
                        className="
                            relative flex-shrink-0 w-64 h-72 rounded-lg overflow-hidden shadow-xl snap-center
                            transition-transform duration-300 ease-in-out hover:scale-[1.05]
                            border border-transparent hover:border-red-600
                        "
                        aria-label={`Ver productos en la categoría ${category.name}`}
                    >
                        <img 
                            // OJO: Esta ruta debe funcionar correctamente si ya tienes las imágenes en public/images/
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 transition-opacity duration-300 hover:bg-opacity-20"></div>

                        <div className="absolute bottom-4 left-4 z-10"> {/* 👈 AÑADIMOS Z-10 */}
    <h3 className="text-3xl font-extrabold text-white leading-none drop-shadow-lg uppercase">
        {category.name}
    </h3>
    <p className="text-sm text-white font-medium text-white">Ver más &rarr;</p>
</div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default CategoryScroll;