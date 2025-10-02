import React from 'react';
import { useCarrito } from '../context/CarritoContext';

const CarritoSidebar = ({ isOpen, closeCart }) => {
    // 1. Conexión con el Contexto del Carrito
    const { items, calcularTotal, generarMensajeWhatsapp, agregarItem, eliminarProducto } = useCarrito();

    // Clases de Tailwind para controlar el slide-in/slide-out
    const sidebarClasses = `
        fixed top-0 right-0 h-full w-full sm:w-80 bg-bg-principal text-white shadow-2xl z-50 p-4 
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `;

    // 2. Función para abrir el enlace de WhatsApp
    const handleCheckout = () => {
        if (items.length === 0) {
            alert("Tu carrito está vacío. Agrega productos para hacer un pedido.");
            return;
        }
        const enlace = generarMensajeWhatsapp();
        window.open(enlace, '_blank');
        closeCart(); // Cierra el sidebar después de enviar el pedido
    };

    // 3. Función para ajustar la cantidad (incluyendo la eliminación si llega a cero)
    const updateQuantity = (producto, delta) => {
        const newCantidad = producto.cantidad + delta;

        if (newCantidad <= 0) {
            // Si la cantidad es 0 o menos, elimina el producto
            eliminarProducto(producto.id);
        } else {
            // Si es positivo, actualiza o añade (agregamos delta para restar/sumar)
            agregarItem(producto, delta);
        }
    };

    return (
        // Overlay para cerrar el carrito al hacer clic fuera (solo si está abierto)
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 z-40" 
                    onClick={closeCart}
                    aria-hidden="true"
                ></div>
            )}
            
            {/* Sidebar principal */}
            <div className={sidebarClasses}>
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-red-600">Tu Pedido ({items.length})</h2>
                    <button 
                        onClick={closeCart} 
                        className="text-texto-claro text-3xl hover:text-acento transition-colors"
                        aria-label="Cerrar Carrito"
                    >
                        &times;
                    </button>
                </div>
                
                {/* Lista de productos */}
                <div className="py-4 h-[calc(100vh-200px)] overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">¡Aún no hay productos en tu carrito!</p>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-800">
                                <div className="flex-1 mr-4">
                                    <p className="font-semibold">{item.nombre}</p>
                                    <p className="text-sm text-gray-400">${item.precio.toFixed(2)} c/u</p>
                                </div>

                                {/* Controles de Cantidad */}
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => updateQuantity(item, -1)}
                                        className="w-8 h-8 bg-gray-700 hover:bg-acento rounded-full transition-colors font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="font-bold w-4 text-center">{item.cantidad}</span>
                                    <button 
                                        onClick={() => updateQuantity(item, 1)}
                                        className="w-8 h-8 bg-gray-700 hover:bg-acento rounded-full transition-colors font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del Carrito y Total */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-bg-principal">
                    <div className="flex justify-between font-extrabold text-xl mb-4">
                        <span>TOTAL ESTIMADO:</span>
                        <span className="text-red-600">${calcularTotal().toFixed(2)}</span>
                    </div>
                    
                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Enviar Pedido por WhatsApp
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-2">
                        *El precio final será confirmado por la tienda.
                    </p>
                </div>
            </div>
        </>
    );
};

export default CarritoSidebar;