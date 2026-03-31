import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Countdown = () => {
  const inicioPromo = new Date("2026-03-27T00:00:00");
  const finPromo = new Date("2026-03-31T23:59:59"); // 🔧 extendido hasta hoy a las 00

  const ahora = new Date();
  const targetDate = ahora < inicioPromo ? inicioPromo : finPromo;
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === null) {
    if (ahora > finPromo) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-base md:text-2xl text-gray-400 font-bold"
        >
          La promo terminó 😢
        </motion.p>
      );
    }
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-center text-base md:text-2xl text-green-400 font-bold"
      >
        🔥 ¡SALE 10% activo en toda la tienda! 🔥
      </motion.p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-6 flex justify-center gap-3 md:gap-6 text-red-600 font-extrabold text-lg md:text-3xl"
    >
      <div className="bg-white rounded-lg shadow-md px-2 py-1 md:px-4 md:py-2">
        {timeLeft.days} <span className="text-xs md:text-sm">días</span>
      </div>
      <div className="bg-white rounded-lg shadow-md px-2 py-1 md:px-4 md:py-2">
        {timeLeft.hours} <span className="text-xs md:text-sm">hs</span>
      </div>
      <div className="bg-white rounded-lg shadow-md px-2 py-1 md:px-4 md:py-2">
        {timeLeft.minutes} <span className="text-xs md:text-sm">min</span>
      </div>
      <div className="bg-white rounded-lg shadow-md px-2 py-1 md:px-4 md:py-2">
        {timeLeft.seconds} <span className="text-xs md:text-sm">seg</span>
      </div>
    </motion.div>
  );
};

export default Countdown;
