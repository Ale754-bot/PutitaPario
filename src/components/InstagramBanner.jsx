import React from 'react';

const InstagramBanner = () => {
  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <a
  href="https://www.instagram.com/putitapario/"
  target="_blank"
  rel="noopener noreferrer"
  className="relative block w-full overflow-hidden group"
>
  <img
    src="/INSTABANNER.jpg"
    alt="Instagram Secreto"
    className="w-full h-auto object-contain brightness-[0.6] transition-all duration-500 group-hover:brightness-[0.8]"
  />

  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-white text-xl md:text-2xl font-semibold tracking-wide bg-black/40 px-6 py-3 rounded-md hover:bg-black/60 transition-all duration-300">
      Seguinos en <span className="text-acento">@putitapario</span>
    </p>
  </div>
</a>

      </div>
    </section>
  );
};

export default InstagramBanner;
