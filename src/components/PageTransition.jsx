import React from "react";
import { motion } from "framer-motion";

const overlayVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  exit: { opacity: 1 }
};

const overlayTransition = {
  duration: 1.8,
  ease: [0.16, 1, 0.3, 1]
};

const contentVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
};

const contentTransition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1]
};

const PageTransition = ({ children }) => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Capa de transición con logo */}
    <motion.div
      className="absolute inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={overlayTransition}
    >
      <motion.img
  src="/PP1.png"
  alt="Logo SECRETO"
  className="w-40 h-auto mb-6 drop-shadow-[0_0_15px_rgba(255,0,80,0.3)] object-contain"
  initial={{ scale: 0.95, opacity: 4 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, delay: 0.4 }}
/>

    </motion.div>

    {/* Contenido de la página */}
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={contentTransition}
      className="relative z-10"
    >
      {children}
    </motion.div>
  </div>
);

export default PageTransition;
