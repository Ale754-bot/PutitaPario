import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import CheckoutButton from './CheckoutButton'; 

const CarritoSidebar = ({ isOpen, closeCart }) => {
  const { items, calcularTotal, agregarItem, eliminarProducto } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState("domicilio");

  // Bloqueo de scroll cuando el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const updateQuantity = (item, delta) => {
    const nuevaCantidad = item.cantidad + delta;
    if (nuevaCantidad <= 0) {
      eliminarProducto(item.id);
    } else {
      agregarItem(item, delta);
    }
  };

  return (
    <>
      {/* Fondo oscuro traslúcido */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 transition-opacity" 
          onClick={closeCart}
        ></div>
      )}

      {/* Sidebar Principal */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#1a1a1a] text-white shadow-2xl z-50 p-4 flex flex-col transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Cabecera */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-red-600 italic">TU PEDIDO</h2>
          <button onClick={closeCart} className="text-3xl hover:text-gray-400">&times;</button>
        </div>

        {/* Lista de productos con scroll */}
        <div className="flex-grow overflow-y-auto py-4 custom-scrollbar">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 italic">Tu carrito está vacío</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-gray-800">
                <img 
                  src={item.imagen || "/placeholder.png"} 
                  alt={item.nombre} 
                  className="w-16 h-20 object-cover rounded bg-black flex-shrink-0" 
                />
                <div className="flex-grow">
                  <p className="text-sm font-medium leading-tight">{item.nombre}</p>
                  <div className="flex gap-2 text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                    {item.color && <span className="bg-gray-800 px-2 py-0.5 rounded">Color: {item.color}</span>}
                    {item.talle && <span className="bg-gray-800 px-2 py-0.5 rounded">Talle: {item.talle}</span>}
                  </div>
                  <p className="text-red-500 font-bold mt-2">${(item.precio * item.cantidad).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button 
                    onClick={() => eliminarProducto(item.id)} 
                    className="text-gray-500 hover:text-red-500 text-xs transition-colors"
                  >
                    🗑
                  </button>
                  <div className="flex items-center gap-2 bg-black border border-gray-800 rounded p-1">
                    <button onClick={() => updateQuantity(item, -1)} className="px-2 text-gray-400 hover:text-white transition-colors">-</button>
                    <span className="text-xs font-bold w-4 text-center">{item.cantidad}</span>
                    <button onClick={() => updateQuantity(item, 1)} className="px-2 text-gray-400 hover:text-white transition-colors">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con Resumen y Checkout */}
        <div className="p-6 bg-[#1a1a1a] border-t border-gray-800 space-y-6">
          
          {/* MÉTODO DE ENTREGA */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center mb-3">¿Cómo recibís tu pedido?</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setMetodoEntrega("domicilio")}
                className={`flex-1 py-3 rounded-lg text-[10px] font-bold transition-all border ${
                  metodoEntrega === "domicilio" 
                    ? "bg-red-700 border-red-700 text-white shadow-[0_0_15px_rgba(185,28,28,0.3)]" 
                    : "bg-transparent border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                ENVÍO A DOMICILIO
              </button>
              <button 
                onClick={() => setMetodoEntrega("local")}
                className={`flex-1 py-3 rounded-lg text-[10px] font-bold transition-all border ${
                  metodoEntrega === "local" 
                    ? "bg-red-700 border-red-700 text-white shadow-[0_0_15px_rgba(185,28,28,0.3)]" 
                    : "bg-transparent border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                RETIRO EN LOCAL
              </button>
            </div>
            {metodoEntrega === "local" && (
              <p className="text-[9px] text-gray-400 mt-3 text-center italic animate-pulse">
                Retiro en: Galería Córdoba, Sarmiento 783, Local 01-15
              </p>
            )}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center border-t border-gray-800 pt-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Estimado:</span>
            <span className="text-2xl font-black text-red-600">${calcularTotal().toFixed(2)}</span>
          </div>

          {/* BOTÓN MERCADO PAGO */}
          <CheckoutButton 
            cartItems={items} 
            total={calcularTotal()} 
            entrega={metodoEntrega} 
          />
          
          <p className="text-[8px] text-center text-gray-600 uppercase tracking-widest">
            * El stock se reserva al completar el pago
          </p>
        </div>
      </div>
    </>
  );
};

export default CarritoSidebar;