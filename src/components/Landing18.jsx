export default function Landing18() {
  return (
    <div className="bg-black text-white flex flex-col items-center justify-center min-h-screen">
      <img
        src="/PP1.png"
        alt="Logo SECRETO"
        className="w-40 mb-6 animate-fade-in"
      />

      <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide">
        SITIO EXCLUSIVO PARA +18
      </p>

      <a
        href="/inicio"
        className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-full font-bold tracking-wide transition duration-300 ease-in-out"
      >
        INGRESAR
      </a>
    </div>
  );
}
