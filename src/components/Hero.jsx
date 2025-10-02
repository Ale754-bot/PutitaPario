// src/components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion'; 

const Hero = () => {
    
    // Variante para animar la aparición del logo (Más sutil ahora)
    const logoVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 0.10, // 🚨 Opacidad muy baja para que sea sutil
            scale: 1, 
            transition: { 
                duration: 1.5, // Animación larga para un efecto "épico"
                ease: "easeOut",
            } 
        },
    };
    
    // Variante para animar la aparición del texto y el botón
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 5, 
            y: 0, 
            transition: { 
                delay: 1.2, // Aparece después de que el logo se asienta
                duration: 0.7, 
                ease: "easeOut" 
            } 
        },
    };

    const handleScrollToProducts = (e) => {
        // Lógica de scroll a la primera categoría (Juguetes)
        e.preventDefault(); 
        const productSection = document.getElementById('Juguetes'); 
        if (productSection) {
            productSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'      
            });
        }
    };

    return (
        <section
            // Contenedor principal: Negro y centrado
            className="
                relative h-[60vh] flex items-center justify-center 
                bg-black border-b border-acento/50 overflow-hidden
            "
        >
            
            {/* 🚨 LOGO DE FONDO (Grande, centrado, baja opacidad) */}
            <motion.img 
                src="PP.png" 
                alt="Logo Principal"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                className="
                    absolute w-[80%] md:w-[60%] h-auto object-contain 
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    z-0 // Se va al fondo
                "
            />
            
            {/* 🚨 Contenido Central de Texto (Centrado vertical y horizontal) */}
            <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-center z-10 p-4" // z-10 para que quede encima del logo
            >
                
    
            
            </motion.div>
        </section>
    );
};

export default Hero;