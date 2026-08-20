import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // --- REGLAS DE NEGOCIO PROMO +$50.000 ---
  const MONTO_MINIMO_PROMO = 50000;
  const PORCENTAJE_DESCUENTO = 0.15;

  // 1. Subtotal sin el descuento de +$50k
  const subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // 2. Lógica para aplicar el 15% OFF si supera los 50 mil
  const aplicaDescuento = subtotal >= MONTO_MINIMO_PROMO;
  const montoDescuento = aplicaDescuento ? subtotal * PORCENTAJE_DESCUENTO : 0;
  const total = subtotal - montoDescuento;

  // 3. Progreso dinámico para la barra visual
  const montoFaltante = aplicaDescuento ? 0 : MONTO_MINIMO_PROMO - subtotal;
  const porcentajeProgreso = Math.min(100, (subtotal / MONTO_MINIMO_PROMO) * 100);

  const agregarItem = (producto, cantidad = 1) => {
    // 🔧 Lógica de promo por fecha (se mantiene intacta)
    const ahora = new Date();
    const inicioPromo = new Date("2026-03-27T00:00:00");
    const finPromo = new Date("2026-03-30T23:59:59");
    const promoActiva = ahora >= inicioPromo && ahora <= finPromo;

    const precioBase = producto.precio ?? 0;
    const precioFinal = promoActiva ? Math.round(precioBase * 0.9) : precioBase;

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

    mensaje += `💵 Subtotal: $${subtotal.toFixed(2)}\n`;
    if (aplicaDescuento) {
      mensaje += `🎉 Descuento especial (15% OFF por compra > $50.000): -$${montoDescuento.toFixed(2)}\n`;
    }
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
        montoDescuento,
        total,
        aplicaDescuento,
        montoFaltante,
        porcentajeProgreso,
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