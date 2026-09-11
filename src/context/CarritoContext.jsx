import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // --- AUTOMATIZACIÓN: 15% OFF SOLO LUNES (1) Y MARTES (2) ---
  const verificarEsLunesOMartes = () => {
    const diaActual = new Date().getDay(); // 0 = Domingo, 1 = Lunes, 2 = Martes, etc.
    return diaActual === 1 || diaActual === 2;
  };

  // El subtotal y el total ahora son exactamente lo mismo
  const subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const total = subtotal;

  const agregarItem = (producto, cantidad = 1) => {
    const esLunesOMartes = verificarEsLunesOMartes();
    const precioBase = producto.precio ?? producto.precioBase ?? 0;
    const precioFinal = esLunesOMartes ? Math.round(precioBase * 0.85) : precioBase;

    setItems(prevItems => {
      const itemExistente = prevItems.find(
        item => item.carritoId === producto.carritoId
      );

      if (itemExistente) {
        return prevItems.map(item =>
          item.carritoId === producto.carritoId
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { ...producto, cantidad, precio: precioFinal }];
      }
    });
  };

  const eliminarProducto = (carritoId) => {
    setItems(prevItems =>
      prevItems.filter(item => item.carritoId !== carritoId)
    );
  };

  const calcularTotal = () => total;

  const generarMensajeWhatsapp = (metodoEntrega) => {
    const numeroDuena = "5493412634440";

    let mensaje = '🛒 ¡Hola! Me gustaría confirmar mi compra.\n\n';
    mensaje += 'Estos son los productos que seleccioné:\n\n';

    items.forEach(item => {
      const variante = [item.color, item.talle].filter(Boolean).join(" · ") || item.variante || "sin variante";
      const subtotalItem = (item.precio * item.cantidad).toFixed(2);
      mensaje += `— ${item.nombre} (${variante})\n`;
      mensaje += `  Cantidad: ${item.cantidad} ${item.cantidad === 1 ? 'unidad' : 'unidades'}\n`;
      mensaje += `  Precio unitario: $${item.precio.toFixed(2)}\n`;
      mensaje += `  Subtotal: $${subtotalItem}\n\n`;
    });

    mensaje += `🧾 Total a pagar: $${total.toFixed(2)}\n\n`;

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
        subtotal,
        total,
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