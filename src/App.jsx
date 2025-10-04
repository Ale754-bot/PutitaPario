// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="min-h-screen bg-black pt-[70px]">

        {/* 🔝 Navbar */}
        <Navbar openCart={() => setIsCartOpen(true)} />

        {/* 🔀 Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>

        {/* 🔚 Footer */}
        <Footer />

        {/* 🛒 Carrito */}
<FloatingContactButton />
        <CarritoSidebar
          isOpen={isCartOpen}
          closeCart={() => setIsCartOpen(false)}
        />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
