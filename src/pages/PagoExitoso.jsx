import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCarrito } from '../context/CarritoContext';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
  const { vaciarCarrito, generarMensajeWhatsapp } = useCarrito();

  useEffect(() => {
    // Vaciamos el carrito automáticamente al llegar aquí
    vaciarCarrito();
  }, []);

  const handleWhatsAppNotify = () => {
    // Generamos el mensaje avisando que ya pagó por MP
    const enlace = generarMensajeWhatsapp("domicilio", true); 
    window.open(enlace, '_blank');
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-green-500/10 p-6 rounded-full mb-6">
        <span className="text-6xl">✅</span>
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-4 italic" style={{ fontFamily: 'Playfair Display, serif' }}>
        ¡Tu pedido está en camino!
      </h1>
      
      <p className="text-gray-400 max-w-md mb-8">
        El pago se procesó correctamente. Ahora, avísanos por WhatsApp para que empecemos a preparar tu paquete de inmediato.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleWhatsAppNotify}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all"
        >
          NOTIFICAR POR WHATSAPP
        </button>

        <Link 
          to="/" 
          className="text-gray-500 hover:text-white text-sm underline transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </motion.div>
  );
};

export default PagoExitoso;