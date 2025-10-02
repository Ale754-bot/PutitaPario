import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const CarritoContext = createContext();

// 2. Definir el Proveedor del Contexto
export const CarritoProvider = ({ children }) => {
  // Estado que almacena los ítems del carrito: { id, nombre, precio, cantidad }
  const [items, setItems] = useState([]);

  // --- Funciones de Lógica del Carrito ---

  const agregarItem = (producto, cantidad = 1) => {
    setItems(prevItems => {
      const itemExistente = prevItems.find(item => item.id === producto.id);

      if (itemExistente) {
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { ...producto, cantidad }];
      }
    });
  };

  const eliminarProducto = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  };
  
  const generarMensajeWhatsapp = () => {
      // 🚨 IMPORTANTE: Reemplaza este número por el de la dueña del local (formato internacional sin +)
      const numeroDuena = "5493412634440"; 
      
      let mensaje = '*🛒 NUEVO PEDIDO WEB (Tienda Online)*\n';
      // ... (El resto de la generación del mensaje que ya teníamos)
      
      items.forEach(item => {
        const subtotal = (item.precio * item.cantidad).toFixed(2);
        mensaje += `${item.cantidad}x ${item.nombre} (P/U: $${item.precio.toFixed(2)} | Subtotal: $${subtotal})\n`;
      });

      mensaje += '---------------------------------\n';
      mensaje += `*TOTAL ESTIMADO: $${calcularTotal().toFixed(2)}*\n\n`;
      // ...
      mensaje += '*Nombre y Apellido:* \n';
      mensaje += '*Dirección de Entrega:* \n';
      
      const mensajeCodificado = encodeURIComponent(mensaje);
      
      return `https://wa.me/${numeroDuena}?text=${mensajeCodificado}`;
  };


  return (
    <CarritoContext.Provider 
      value={{ 
        items, 
        agregarItem, 
        eliminarProducto, 
        calcularTotal, 
        generarMensajeWhatsapp 
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// 3. Hook Personalizado para usar el Contexto
export const useCarrito = () => useContext(CarritoContext);