// src/pages/Home.jsx

import React from "react";
import Hero from "../components/Hero";
import CategoryScroll from "../components/CategoryScroll";
import { Link } from "react-router-dom";
import InstagramBanner from "../components/InstagramBanner";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { useCarrito } from "../context/CarritoContext";

import NuevosIngresos from "../components/NuevosIngresos";
import Tops from "../components/tops";
import CapsulaDesbloqueada from "../components/CapsulaDesbloqueada";
import OfertaSemanal from "../components/OfertaSemanal";
import TrustBanner from "../components/TrustBanner";
import CrazyBullOferta from "../components/CrazyBullOferta";
import HotSaleSection from "../components/HotSaleSection";

const sectionAnimation = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const HomeSection = ({ children, className = "" }) => (
  <motion.section
    variants={sectionAnimation}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.18 }}
    className={className}
  >
    {children}
  </motion.section>
);

const Home = () => {
  const { agregarItem } = useCarrito();

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <Hero />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </motion.div>

        <main className="mx-auto max-w-screen-xl px-4 py-8">

          <HomeSection className="mb-8">
            <CategoryScroll />
          </HomeSection>

          <HomeSection className="mb-10">
            <TrustBanner />
          </HomeSection>

          <HotSaleSection />

          <CrazyBullOferta />

          <HomeSection className="mb-12">
            <OfertaSemanal />
          </HomeSection>

          <HomeSection className="mb-12">
            <NuevosIngresos />
          </HomeSection>

          <HomeSection className="mb-12">
            <Tops />
          </HomeSection>

          <HomeSection className="mb-12">
            <CapsulaDesbloqueada />
          </HomeSection>

          {/* 🖼️ LOCAL */}
          <HomeSection className="mt-20">
            <section
              className="
                group relative h-44 w-full overflow-hidden
                shadow-[0_0_40px_rgba(185,28,28,0.2)]
                sm:h-56 md:h-72 lg:h-96
              "
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <img
                  src="/LOCALBANNER.gif"
                  alt="Local Secreto"
                  className="h-full w-full object-cover opacity-65 transition duration-700 group-hover:opacity-80"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

                <Link
                  to="/productos"
                  className="
                    px-8 py-3
                    text-xs font-black uppercase tracking-[0.25em] text-white
                    transition duration-300
                    hover:scale-105
                    active:scale-95
                    sm:text-sm
                  "
                >
                  Galería Córdoba Local 1-15
                </Link>
              </div>
            </section>
          </HomeSection>

        </main>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <InstagramBanner />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;