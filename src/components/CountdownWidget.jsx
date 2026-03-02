import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const frases = ["NOVEDADES", "INGRESOS", "ATENTO", "PRONTO"];

export default function LetterBoxCounter() {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(frases[0].split(""));

  useEffect(() => {
    const interval = setInterval(() => {
      // cambiar a la siguiente frase
      setIndex((prev) => (prev + 1) % frases.length);
    }, 3000); // ⏳ cada palabra dura 3 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChars(frases[index].split(""));
  }, [index]);

  return (
    <div className="w-full h-[150px] flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg overflow-hidden">
      <div className="flex gap-2">
        {chars.map((char, i) => (
          <AnimatePresence key={i}>
            <motion.span
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center w-10 h-12 bg-black/40 text-white font-bold text-xl rounded-md shadow-md"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
