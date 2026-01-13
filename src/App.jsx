import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';


// 🧱 Estructura persistente
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CarritoSidebar from './components/CarritoSidebar';
import FloatingContactButton from './components/FloatingContactButton';
import ScrollToTop from './components/ScrollToTop';

// 📄 Páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Mayorista from "./pages/Mayorista";
import Contacto from './pages/Contacto';

// ✨ Transición editorial
import PageTransition from './components/PageTransition';


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🔐 Filtro +18 persistente
  const [isAllowed, setIsAllowed] = useState(() => {
    return localStorage.getItem("isAllowed") === "true";
  });

  const location = useLocation();

  const handleAccess = () => {
    localStorage.setItem("isAllowed", "true");
    setIsAllowed(true);
  };

  if (!isAllowed) {
    return (
      
      <motion.div
        className="bg-black text-white flex flex-col items-center justify-center min-h-screen overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* 🌫️ Fondo pulsante */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-red-900/10 via-red-600/5 to-transparent pointer-events-none"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* 🖼️ Logo con resplandor */}
        <motion.img
          src="/PP1.png"
          alt="Logo SECRETO"
          className="w-40 mb-6 drop-shadow-[0_0_15px_rgba(255,0,80,0.3)] object-contain"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* 🩸 Frase poética + texto editorial */}
        <motion.div
          className="text-center max-w-sm mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p
            className="text-sm text-gray-700 mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Lo sensorial empieza cuando te animás a entrar …
          </p>
          <p className="text-sm font-bold text-gray-400 tracking-wide">
            EXCLUSIVO +18
          </p>
        </motion.div>

        {/* 🎭 Botón de ingreso */}
        <motion.button
          onClick={handleAccess}
          className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-full font-bold tracking-wide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: -1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          INGRESAR
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-[70px]">
      
      <ScrollToTop />

      {/* 🔝 Navbar */}
      <Navbar openCart={() => setIsCartOpen(true)} />

      {/* 🔀 Rutas con transición */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<PageTransition><Productos /></PageTransition>} />
          <Route path="/mayorista"element={<PageTransition><Mayorista /></PageTransition>} />
          <Route path="/contacto" element={<PageTransition><Contacto /></PageTransition>} />
          
        </Routes>
      </AnimatePresence>

      {/* 🔚 Footer */}
      <Footer />

      {/* 🛒 Carrito */}
      <FloatingContactButton />
      <CarritoSidebar
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
      />
      <Analytics />

    </div>
  );
}

export default App;


