import React from "react";
import { Link } from "react-router-dom";

const BannerPerfumesHombre = () => {
  return (
    <section className="my-14">
      <div
        className="
          overflow-hidden
          bg-black
          shadow-[0_0_35px_rgba(185,28,28,0.16)]
        "
      >
        <Link
          to="/productos?categoria=Perfumes#hombre"
          className="group block overflow-hidden"
        >
          <img
            src="/Banner pagina.png"
            alt="Perfumes de Hombre"
            className="
              w-full object-cover
              transition duration-700
              group-hover:scale-[1.015]
              group-hover:brightness-110
            "
          />
        </Link>
      </div>
    </section>
  );
};

export default BannerPerfumesHombre;