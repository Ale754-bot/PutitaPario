import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // El subtotal y el total se calculan directamente en base a los precios ya con el 40% aplicado
  const subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const total = subtotal;

  const agregarItem = (producto, cantidad = 1) => {
    // Tomamos el precio base original del producto (sea cual fuere la propiedad que traiga)
    const precioBaseOriginal = producto.precio || producto.precioBase || producto.precioOriginal || 0;
    
    // Aplicamos el 40% OFF permanente (el producto queda al 60% de su valor original)
    const precioFinal = Math.round(precioBaseOriginal * 0.60);

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
        return [
          ...prevItems, 
          { 
            ...producto, 
            cantidad, 
            precioOriginal: precioBaseOriginal, 
            precio: precioFinal // Guardamos el precio ya con el 40% off aplicado
          }
        ];
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
      mensaje += `  Precio unitario (40% OFF): $${item.precio.toLocaleString("es-AR")}\n`;
      mensaje += `  Subtotal: $${Number(subtotalItem).toLocaleString("es-AR")}\n\n`;
    });

    mensaje += `🧾 Total a pagar: $${total.toLocaleString("es-AR")}\n\n`;

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