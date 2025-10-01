// src/App.jsx

import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// 1. Componentes Estructurales (Se ven siempre)
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import CarritoSidebar from './components/CarritoSidebar'; 
import FloatingCartIcon from './components/FloatingCartIcon'; 

// 2. Páginas (Ahora App.jsx solo importa las páginas, no los componentes internos)
import Home from './pages/Home';
import Productos from './pages/Productos'; 
import Contacto from './pages/Contacto'; 

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    // El Router maneja la navegación
    <BrowserRouter> 
      
      <div className="min-h-screen bg-black pt-[70px]"> 
        
        {/* Navbar: Se ve en todas las rutas */}
        <Navbar openCart={() => setIsCartOpen(true)} />
        
        {/* Routes: Aquí decide qué página mostrar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>

        {/* Footer: Se ve en todas las rutas */}
        <Footer />
        
        {/* Carrito: Se ve en todas las rutas */}
        <FloatingCartIcon openCart={() => setIsCartOpen(true)} /> 
        <CarritoSidebar 
          isOpen={isCartOpen} 
          closeCart={() => setIsCartOpen(false)} 
        />

      </div>
    </BrowserRouter>
  )
}

export default App;