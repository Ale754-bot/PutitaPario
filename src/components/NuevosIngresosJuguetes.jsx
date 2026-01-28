import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const productosNuevos = [
  { id: 2001, 
    nombre: "Masturbador Ultra Realístico - Con vibración",
    precio: 156000,
    imagen: "/masturbadorultrareal.jpg"
},
  { id: 2002,
    nombre: "Ducha Limpieza Anal - 89ml ",
    precio: 22000,
    imagen: "/images/plugs/duchanal.webp"
},
  { id: 2003,
    nombre: "Huevo Vibrador Con Control Remoto",
    precio: 65000,
    imagen: "/huevo.jpg"
},
  { id: 2004,
    nombre: "Vibrador Doble Brighty",
    precio: 58000,
    imagen: "/brighty.jpg"
},
  { id: 2005,
    nombre: "Masturbador Masculino Premium",
    precio: 83000,
    imagen: "/masturbadorpremium.jpg"
},
  { id: 2006,
    nombre: "Dildo Vibrador Sopapa",
    precio: 85000,
    imagen: "/dildosopapavibrador.jpg"
},
];

// Función para dividir en grupos de 3
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

// Título animado
const AnimatedTitle = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, scale: [1, 1.1, 1] });
    }
  }, [inView, controls]);

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-3xl md:text-4xl font-extrabold text-center mb-10 
                 bg-white to-black 
                 bg-clip-text text-transparent tracking-wide"
    >
      NUEVOS INGRESOS
    </motion.h2>
  );
};

const NuevosIngresosJuguetes = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedTitle />

        {/* Mobile: dos filas de 3 productos con scroll horizontal */}
        <div className="lg:hidden flex flex-col gap-6">
          {chunkArray(productosNuevos, 3).map((grupo, idx) => (
            <div
              key={idx}
              className="flex gap-4 overflow-x-scroll overflow-y-hidden snap-x snap-mandatory px-2 h-auto"
            >
              {grupo.map((producto) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6 }}
                  className="snap-center min-w-[220px] bg-black rounded-xl shadow-lg overflow-hidden border border-gray-700 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-red-700 to-black text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md">
                      Nuevo ingreso
                    </span>
                  </div>
                  <div className="p-3 text-center flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold mb-2">{producto.nombre}</h3>
                    <p className="text-base font-bold text-red-500 mb-2">
                      ${producto.precio.toLocaleString("es-AR")}
                    </p>
                    <button className="mt-auto bg-red-600 hover:bg-red-800 text-white text-sm font-semibold py-2 px-4 rounded transition-colors">
                      Agregar al carrito
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop: grilla con animaciones de entrada */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-2">
          {productosNuevos.map((producto, idx) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              className="transform scale-75 origin-center bg-black rounded-xl shadow-xl overflow-hidden border border-gray-700 flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="absolute top-2 right-2 bg-gradient-to-r from-red-700 to-black text-white text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md">
                  Nuevo ingreso
                </span>
              </div>
              <div className="p-5 text-center flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">
                  {producto.nombre}
                </h3>
                <p className="text-xl font-extrabold text-red-500 mb-4">
                  ${producto.precio.toLocaleString("es-AR")}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-auto bg-red-600 hover:bg-red-800 text-white text-sm font-semibold py-2 px-6 rounded transition-colors shadow-lg"
                >
                  Agregar al carrito
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuevosIngresosJuguetes;
