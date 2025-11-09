import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';

const CarritoSidebar = ({ isOpen, closeCart }) => {
  const {
    items,
    calcularTotal,
    agregarItem,
    eliminarProducto,
    generarMensajeWhatsapp
  } = useCarrito();

  const [metodoEntrega, setMetodoEntrega] = useState("domicilio");

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const sidebarClasses = `
    fixed top-0 right-0 h-full w-full max-w-screen sm:max-w-[480px] overflow-x-hidden bg-bg-principal text-white shadow-2xl z-50 p-4 
    transform transition-transform duration-500 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `;

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Tu carrito está vacío. Agrega productos para hacer un pedido.");
      return;
    }

    const productosTexto = items.map(item => {
      const variante = [item.color, item.talle].filter(Boolean).join(" · ") || item.variante || "sin variante";
      return `• ${item.nombre} (${variante}) x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    }).join("\n");

    const mensaje = `Hola! Quiero hacer un pedido:\n\n${productosTexto}\n\nMétodo de entrega: ${
      metodoEntrega === "domicilio" ? "Enviar a domicilio" : "Retirar en el local"
    }`;

    const enlace = generarMensajeWhatsapp(metodoEntrega);
    window.open(enlace, '_blank');
    closeCart();
  };

  const updateQuantity = (producto, delta) => {
    const nuevaCantidad = producto.cantidad + delta;
    if (nuevaCantidad <= 0) {
      eliminarProducto(producto.id);
    } else {
      agregarItem(producto, delta);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-40" 
          onClick={closeCart}
          aria-hidden="true"
        ></div>
      )}

      <div className={sidebarClasses}>
        <div className="mx-auto max-w-md px-2 flex justify-between items-center pb-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-red-600">Tu Pedido ({items.length})</h2>
          <button 
            onClick={closeCart} 
            className="text-texto-claro text-3xl hover:text-acento transition-colors"
            aria-label="Cerrar Carrito"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-64px)]">
          <div className="flex-grow overflow-y-auto py-4">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">¡Aún no hay productos en tu carrito!</p>
            ) : (
              items.map(item => {
                const imagenVariante =
                  item.imagen ||
                  (item.variantes?.find(
                    v => v.color === item.color && v.talle === item.talle
                  )?.imagen) ||
                  "/images/placeholder.png";

                return (
                  <div key={item.id} className="flex items-start gap-4 py-4 border-b border-gray-800 flex-wrap md:flex-nowrap">
                    <img
                      src={imagenVariante}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex flex-col flex-grow min-w-0">
                      <p className="text-sm text-white font-medium leading-tight">{item.nombre}</p>
                      <p className="text-xs text-gray-400 mt-0.5">${item.precio.toFixed(2)} c/u</p>
                      <div className="flex gap-2 mt-1 text-xs text-gray-400 flex-wrap">
                        {item.color && <span className="bg-gray-800 px-2 py-0.5 rounded-full">Color: {item.color}</span>}
                        {item.talle && <span className="bg-gray-800 px-2 py-0.5 rounded-full">Talle: {item.talle}</span>}
                        {item.variante && !item.color && !item.talle && (
                          <span className="bg-gray-800 px-2 py-0.5 rounded-full">{item.variante}</span>
                        )}
                      </div>
                      <p className="text-sm text-red-500 font-semibold mt-1">
                        Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <button onClick={() => updateQuantity(item, -1)} className="text-white px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">−</button>
                      <span className="text-white text-sm">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item, 1)} className="text-white px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">+</button>
                    </div>
                    <button onClick={() => eliminarProducto(item.id)} className="text-red-500 text-xs ml-2 hover:underline mt-2 md:mt-0">Eliminar</button>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-2 mb-3 text-center">
            <label className="text-sm text-white font-medium mb-2 block">¿Cómo querés recibir tu pedido?</label>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setMetodoEntrega("domicilio")}
                className={`px-4 py-2 rounded-full text-xs ${
                  metodoEntrega === "domicilio" ? "bg-red-700 text-white" : "bg-gray-800 text-gray-300"
                }`}
              >
                Enviar a domicilio
              </button>
              <button
                onClick={() => setMetodoEntrega("local")}
                className={`px-4 py-2 rounded-full text-xs ${
                  metodoEntrega === "local" ? "bg-red-700 text-white" : "bg-gray-800 text-gray-300"
                }`}
              >
                Retirar en el local
              </button>
            </div>

            {metodoEntrega === "local" && (
              <p className="text-xs text-gray-400 mt-2">
                Retiro en: Galería Córdoba, Sarmiento 783, Local 01-15 — de 10 a 19 hs
              </p>
            )}
          </div>

          <div className="border-t border-gray-800 bg-bg-principal p-4">
            <div className="flex justify-between font-extrabold text-xl mb-4">
              <span>TOTAL ESTIMADO:</span>
              <span className="text-red-600">${calcularTotal().toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm tracking-wide"
            >
              Confirmar pedido por WhatsApp
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              *El precio final será confirmado por la tienda.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarritoSidebar;
