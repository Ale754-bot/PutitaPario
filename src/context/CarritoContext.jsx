import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const generarIdUnico = (producto) => {
    const partes = [producto.id, producto.color, producto.talle].filter(Boolean);
    return partes.join("-");
  };

  const agregarItem = (producto, cantidad = 1) => {
    const idUnico = generarIdUnico(producto);

    setItems(prevItems => {
      const itemExistente = prevItems.find(item => item.id === idUnico);

      if (itemExistente) {
        return prevItems.map(item =>
          item.id === idUnico
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { ...producto, id: idUnico, cantidad }];
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
      const variante = [item.color, item.talle].filter(Boolean).join(" · ") || item.variante || "sin variante";
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

export const useCarrito = () => useContext(CarritoContext);
