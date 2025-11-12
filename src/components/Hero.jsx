import React, { useState } from 'react';
import { motion } from 'framer-motion'; 

const Hero = () => {
  const [mostrarLogo, setMostrarLogo] = useState(false);

  return (
    <section
      className="
        relative h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh] 
        flex items-center justify-center 
        bg-black border-b border-acento/50 overflow-hidden
      "
    >
      {/* 🎥 Video Intro */}
      {!mostrarLogo && (
        <video
          src="/video/video.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setMostrarLogo(true)}
          className="absolute w-full h-full object-cover"
        />
      )}

      {/* ✨ Logo con efecto de escritura progresiva */}
      {mostrarLogo && (
        <motion.img 
          src="PP.png" 
          alt="Logo Principal"
          initial={{ 
            clipPath: 'inset(0 100% 0 0)', 
            opacity: 0, 
            filter: 'blur(6px)' 
          }}
          animate={{ 
            clipPath: 'inset(0 0% 0 0)', 
            opacity: 0.9, 
            filter: 'blur(0px)' 
          }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="
            absolute w-[80%] md:w-[60%] h-auto object-contain 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            z-0
          "
        />
      )}

      {/* 🧠 Contenido central */}
      {mostrarLogo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="z-10 w-full"
        >
          <div className="mx-auto max-w-screen-xl px-4 text-center">
            {/* Podés agregar aquí una frase editorial si querés llenar el espacio */}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
