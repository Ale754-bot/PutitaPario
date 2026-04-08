import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';

const CarritoSidebar = ({ isOpen, closeCart }) => {
  const { items, calcularTotal, agregarItem, eliminarProducto } = useCarrito();
  const [metodoEntrega, setMetodoEntrega] = useState("domicilio");
  const [mostrarCheckout, setMostrarCheckout] = useState(false);

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

  const enviarWhatsApp = () => {
    const mensaje = encodeURIComponent(`
Hola, quiero confirmar mi compra:

${items.map(item => {
  const subtotal = (item.precio * item.cantidad).toFixed(2);
  return `— ${item.nombre}\n  Cantidad: ${item.cantidad}\n  Subtotal: $${subtotal}`;
}).join("\n")}

🧾 Total: $${calcularTotal().toFixed(2)}

${metodoEntrega === "local" 
  ? "Forma de entrega: Retiro en Local" 
  : "Envío a domicilio"}

🏦 Datos para transferencia:
Alias: putitapario.mp
CVU: 0000003100018609620921

📎 Adjunto comprobante de pago.
    `);

    const url = `https://wa.me/5493412634440?text=${mensaje}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 transition-opacity" 
          onClick={closeCart}
        ></div>
      )}

<div className={`fixed top-0 right-0 h-full w-full max-w-[480px] 
  ${mostrarCheckout ? "bg-white text-black" : "bg-[#1a1a1a] text-white"} 
  shadow-2xl z-50 p-4 flex flex-col 
  transform transition-all duration-500 ease-in-out 
  ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        
        {/* Cabecera */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <h2 className={`text-2xl font-bold italic ${mostrarCheckout ? "text-green-500" : "text-red-600"}`}>
            {mostrarCheckout ? "CHECKOUT" : "TU PEDIDO"}
          </h2>
          <button onClick={closeCart} className="text-3xl hover:text-gray-400">&times;</button>
        </div>

        {/* Contenido */}
        <div className="flex-grow overflow-y-auto py-4 custom-scrollbar">
          {!mostrarCheckout ? (
            // 🛒 Vista Carrito
            items.length === 0 ? (
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
            )
          ) : (
            // ✅ Vista Checkout
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-500 text-center">Resumen de tu Pedido</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between border-b pb-2">
                    <span>{item.nombre} ({item.cantidad} u.)</span>
                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total a pagar:</span>
                <span>${calcularTotal().toFixed(2)}</span>
              </div>
              <div className="text-sm text-center text-gray-400">
                {metodoEntrega === "local" 
                  ? "RETIRO EN LOCAL"
                  : "ENVÍO A DOMICILIO"}
              </div>
              <div className="bg-gray-100 p-4 rounded text-center text-black">
                <p className="font-bold">Datos para transferencia</p>
                <p>Alias: <span className="text-blue-600 font-bold">putitapario.mp</span></p>
                <p>CVU: <span className="text-blue-600 font-bold">0000003100018609620921</span></p>
              </div>
              <button
                onClick={enviarWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                Confirmar compra por WhatsApp
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#1a1a1a] border-t border-gray-800 space-y-6">
          {!mostrarCheckout ? (
            <>
              {/* Método de entrega */}
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
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Estimado:</span>
                <span className="text-2xl font-black text-white">${calcularTotal().toFixed(2)}</span>
              </div>

              {/* Botón Finalizar compra → abre checkout */}
              <button
                onClick={() => setMostrarCheckout(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                Finalizar compra
              </button>
            </>
          ) : (
            <>
              {/* Botón volver al carrito */}
              <button
                onClick={() => setMostrarCheckout(false)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                ← Volver al carrito
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CarritoSidebar;
