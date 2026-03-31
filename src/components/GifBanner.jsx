import React from "react";

const GifBanner = () => {
  return (
    <div className="w-full flex justify-center my-6">
      <img
        src="/extension.gif" // ruta del gif (puede ser local en tu carpeta public/assets o una URL externa)
        alt="SALE 10% OFF"
        className="shadow-lg max-w-full h-auto"
      />
    </div>
  );
};

export default GifBanner;
