import React from 'react';

const FloatingContactButton = () => {
  return (
    <a
      href="https://wa.me/5493412634440" // ← reemplazá con tu número real
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-40
        w-12 h-12 rounded-full bg-green-500 hover:bg-green-600
        flex items-center justify-center
        shadow-lg transition-all duration-300
      "
      aria-label="Contactar por WhatsApp"
    >
      <img
  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
  alt="WhatsApp"
  className="w-6 h-6"
/>

    </a>
  );
};

export default FloatingContactButton;
