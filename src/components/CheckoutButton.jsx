import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// Inicializamos con tu clave pública
initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, { locale: "es-AR" });

export default function CheckoutButton({ cartItems, total, entrega }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Si el usuario cambia el método de entrega (domicilio/local), 
  // reseteamos la preferencia para generar una nueva con el dato correcto.
  useEffect(() => {
    setPreferenceId(null);
  }, [entrega, cartItems]);

  const createPreference = async () => {
    setIsLoading(true);

    const itemsToPay = cartItems.map((item) => {
      const detalles = [item.color, item.talle].filter(Boolean).join(" · ");
      const nombreCompleto = detalles ? `${item.nombre} (${detalles})` : item.nombre;

      return {
        id: item.id.toString(),
        title: nombreCompleto,
        unit_price: Number(item.precio),
        quantity: Number(item.cantidad),
        currency_id: "ARS",
      };
    });

    try {
      const response = await fetch("https://backend-mercadopago-3gpx.onrender.com/create_preference", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    items: itemsToPay, 
    entrega: entrega 
  }), 
});


      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Error al conectar con Mercado Pago:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) setPreferenceId(id);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={handleBuy}
        disabled={isLoading || preferenceId || total === 0}
        className={`w-full text-white font-semibold py-3 rounded-lg transition-colors text-sm tracking-wide ${
          isLoading || preferenceId || total === 0
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-[#009EE3] hover:bg-[#008ACB]"
        }`}
      >
        {isLoading ? "Procesando..." : "Pagar con Mercado Pago"}
      </button>

      {preferenceId && (
        <div className="w-full mt-2">
          <Wallet
            initialization={{ preferenceId: preferenceId, redirectMode: "modal" }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </div>
      )}
    </div>
  );
}