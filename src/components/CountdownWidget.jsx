import React, { useState, useEffect } from "react";

const CountdownBanner = () => {
  const deadline = new Date("2026-02-28T23:59:59"); // sábado 23:59
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = deadline - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.expired) {
    return (
      <div className="w-full bg-red-700 text-white text-center py-2 font-bold">
        🎉 ¡La oferta terminó!
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-600 black text-white py-2 shadow-md">
  <div className="flex items-center justify-between max-w-5xl mx-auto px-4">
    {/* Título más sutil */}
    <h2 className="text-sm md:text-base font-semibold tracking-wide opacity-90">
      ¡Dale! Aprovechá el descuentazo
    </h2>

    {/* Contador */}
    <div className="flex gap-3">
      {["days", "hours", "minutes", "seconds"].map((unit, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-black/30 px-2 py-1 rounded-md"
        >
          <span className="text-base md:text-lg font-bold">
            {timeLeft[unit] !== undefined ? timeLeft[unit] : "--"}
          </span>
          <span className="text-[10px] uppercase tracking-wide">
            {unit === "days"
              ? "Días"
              : unit === "hours"
              ? "Horas"
              : unit === "minutes"
              ? "Min"
              : "Seg"}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default CountdownBanner;
