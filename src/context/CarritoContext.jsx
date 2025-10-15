import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const CarritoContext = createContext();

// 2. Definir el Proveedor del Contexto
export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

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

  const generarMensajeWhatsapp = (metodoEntrega) => {
  const numeroDuena = "5493412634440";

  let mensaje = '🛒 ¡Hola! Me gustaría hacer un pedido.\n\n';
  mensaje += 'Estos son los productos que seleccioné:\n\n';

  items.forEach(item => {
    const variante = item.variante || item.talle || "sin variante";
    const subtotal = (item.precio * item.cantidad).toFixed(2);
    mensaje += `— ${item.nombre} (${variante})\n`;
    mensaje += `  Cantidad: ${item.cantidad} ${item.cantidad === 1 ? 'unidad' : 'unidades'}\n`;
    mensaje += `  Precio unitario: $${item.precio.toFixed(2)}\n`;
    mensaje += `  Subtotal: $${subtotal}\n\n`;
  });

  mensaje += `🧾 Total estimado: $${calcularTotal().toFixed(2)}\n\n`;

  if (metodoEntrega === "local") {
    mensaje += '📍 Forma de entrega: Retiro en Galería Córdoba, Sarmiento 783, Local 01-15 — de 10 a 19 hs\n';
  } else {
    mensaje += '🚚 Forma de entrega: Envío a domicilio\n';
  }

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
