// CategoryScroll.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CATEGORIES = [
  "Geles, Aceites & Cremas",
  "Perfumes Afrodisíacos y Body Splash",
  "Juegos Sexuales",
  "Vigorizantes",
  "Cuidado Personal Íntimo",
  "Juguetes",
  "Plugs Anales",
  "Dildos",
  "Velas",
  "Lencería",
  "Arneses",
  "BDSM",
  "Disfraces"
];

const CategoryScroll = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleCategoryClick = (name) => {
    const categoriaParam = name.toLowerCase().replace(/\s/g, "-");
    navigate(`/productos?categoria=${categoriaParam}`);
  };

  return (
    <section className="py-2 overflow-hidden min-h-[400px] bg-black relative">
      <div className="flex overflow-x-auto snap-x gap-6 px-6 py-6" ref={scrollRef}>
        {CATEGORIES.map((name) => (
          <CategoryCard
            key={name}
            name={name}
            logo="/PP1.png" // tu logo fijo como fondo
            onClick={() => handleCategoryClick(name)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryScroll;
