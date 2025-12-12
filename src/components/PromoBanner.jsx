import React from "react";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="promo-banner relative w-full"
    >
      <img
        src="/bannernavidad.jpg"
        alt="Banner Promo Navidad"
        className="w-full h-auto object-cover"
      />
    </motion.section>
  );
}
