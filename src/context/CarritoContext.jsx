import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const agregarItem = (producto, cantidad = 1) => {
    // 🔧 Lógica de promo centralizada
    const ahora = new Date();
    const inicioPromo = new Date("2026-03-27T00:00:00");
    const finPromo = new Date("2026-03-30T23:59:59");
    const promoActiva = ahora >= inicioPromo && ahora <= finPromo;

    const precioBase = producto.precio ?? 0;
    const precioFinal = promoActiva ? Math.round(precioBase * 0.9) : precioBase;

    setItems(prevItems => {
      const itemExistente = prevItems.find(item => item.id === producto.id);

      if (itemExistente) {
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { ...producto, cantidad, precio: precioFinal }];
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

    let mensaje = '🛒 ¡Hola! Me gustaría confirmar mi compra.\n\n';
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
      mensaje += '📍 Forma de entrega: Retiro en Galería Córdoba, Sarmiento 783, Local 01-15 — de 10 a 19 hs\n\n';
    } else {
      mensaje += '🚚 Forma de entrega: Envío a domicilio\n\n';
    }

    mensaje += '🏦 Datos para transferencia:\n';
    mensaje += 'Alias: putitapario.mp\n';
    mensaje += 'CVU: 0000003100018609620921\n\n';
    mensaje += '📎 Por favor, adjuntá el comprobante de pago para confirmar tu pedido.\n';

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
