import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const overlayVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transitionEnd: { display: "none" } },
  exit: { opacity: 1, display: "flex" }
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

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🌫️ Capa de transición con logo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="absolute inset-0 z-50 bg-black flex items-center justify-center"
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 📄 Contenido de la página */}
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
};

export default PageTransition;
