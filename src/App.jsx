// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// 🧱 Estructura persistente
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CarritoSidebar from './components/CarritoSidebar';
import FloatingContactButton from './components/FloatingContactButton';
import ScrollToTop from './components/ScrollToTop';

// 📄 Páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';

// ✨ Transición editorial
import PageTransition from './components/PageTransition';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

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
    </div>
  );
}

export default App;
