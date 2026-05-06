// src/components/TrustBanner.jsx

import React from "react";
import { ShieldCheck, Package, Lock, BadgeCheck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Discreto",
    text: "y seguro",
  },
  {
    icon: Package,
    title: "Envío",
    text: "discreto",
  },
  {
    icon: Lock,
    title: "Compra",
    text: "100% segura",
  },
  {
    icon: BadgeCheck,
    title: "Productos",
    text: "originales",
  },
];

const TrustBanner = () => {
  return (
    <section
      className="
        my-10 overflow-hidden rounded-[26px]
        border border-red-700/30
        bg-gradient-to-r from-black via-[#120202] to-black
        px-4 py-4
        shadow-[0_0_35px_rgba(185,28,28,0.22)]
      "
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="
              flex items-center gap-3
              rounded-2xl border border-white/10
              bg-white/[0.03] px-3 py-3
              transition duration-300
              hover:border-red-700/60
              hover:bg-red-950/20
            "
          >
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full border border-red-600/60
                text-red-500
                shadow-[0_0_16px_rgba(220,38,38,0.55)]
              "
            >
              <Icon size={20} />
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-wide text-white">
                {title}
              </h3>
              <p className="text-[10px] uppercase tracking-wide text-white/55">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBanner;