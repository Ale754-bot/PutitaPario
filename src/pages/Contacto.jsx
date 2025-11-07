import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.2 },
  }),
};

const Contacto = () => {
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-20 text-center min-h-[70vh]">
      <motion.h1
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl font-extrabold text-red-600 mb-6 tracking-tight"
      >
        ¿Hablamos?
      </motion.h1>

      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-12"
      >
        Si tenés dudas, curiosidades, ganas de comprar por mayor o simplemente querés charlar sobre lo que te gusta… estamos acá. Te respondemos con onda, atención real y cero robots.
      </motion.p>

      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row justify-center items-center gap-8 text-left mb-12"
      >
        {/* WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://wa.me/5493412634440"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-acento text-white px-6 py-5 rounded-xl shadow-lg hover:bg-red-800 transition-all w-full max-w-sm"
        >
          <h3 className="text-xl font-bold mb-1">WhatsApp directo</h3>
          <p className="text-sm">Consultanos lo que quieras. Te respondemos con buena onda y sin vueltas.</p>
        </motion.a>
      </motion.div>

      {/* Formulario */}
      <motion.form
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        action="https://formsubmit.co/putitapario@gmail.com"
        method="POST"
        className="mx-auto max-w-md flex flex-col gap-4 text-left"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          required
          className="p-3 rounded-xl border border-white/20 bg-black text-white placeholder-white/50"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo"
          required
          className="p-3 rounded-xl border border-white/20 bg-black text-white placeholder-white/50"
        />
        <textarea
          name="mensaje"
          placeholder="Escribí tu consulta..."
          required
          className="p-3 rounded-xl border border-white/20 bg-black text-white placeholder-white/50 h-32 resize-none"
        />
        <input type="hidden" name="_next" value="https://tusitio.com/gracias" />
        <input type="text" name="_honey" style={{ display: 'none' }} />

        <button
          type="submit"
          className="bg-acento text-white py-3 px-6 rounded-xl hover:bg-red-800 transition-all"
        >
          Enviar mensaje
        </button>
      </motion.form>
    </main>
  );
};

export default Contacto;
