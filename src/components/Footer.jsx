import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-acento/50 mt-16 px-6 py-12 text-texto-claro">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🏠 Información del negocio */}
        <div>
          <h3 className="text-xl font-bold text-acento mb-2">SECRETO</h3>
          <p className="text-sm text-gray-400 mb-1">
            Tienda Online de Artículos de Placer y Bienestar.
          </p>
          <p className="text-sm text-gray-400">
            Local 1-15 · Galería Rosario
          </p>
          <p className="text-sm text-gray-400">
            Sarmiento 783, Rosario, Santa Fe
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>

        {/* 📞 Contacto directo */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contacto</h4>
          <p className="text-sm text-gray-400">📞 +54 9 341 1234567</p>
          <p className="text-sm text-gray-400">📧 contacto@secreto.com</p>
          <p className="text-sm text-gray-400">🕒 Lun a Sab: 10:00 – 20:00</p>
          <p className="text-sm text-gray-400 mt-2">
            📸 <a href="https://www.instagram.com/secreto_rosario" target="_blank" rel="noopener noreferrer" className="text-acento hover:underline">Instagram @secreto_rosario</a>
          </p>
        </div>

        {/* 🗺️ Mapa embebido */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Ubicación</h4>
          <iframe
            title="Mapa Secreto"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.503965273099!2d-60.64120482454159!3d-32.94625107355959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab0f3c8e3e3f%3A0x6e5e3f6f1e7f5e6b!2sSarmiento%20783%2C%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1696534567890!5m2!1ses!2sar"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
