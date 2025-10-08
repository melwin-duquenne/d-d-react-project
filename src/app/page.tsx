import Image from "next/image";

export default function Home() {
  return (
    <div className=" relative min-h-screen flex flex-col items-center justify-between bg-gray-900 bg-cover bg-center text-amber-100">
      {/* Overlay sombre */}
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>

      {/* Contenu principal */}
      <main className="relative z-10 flex flex-col items-center text-center mt-24 space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-300 drop-shadow-lg font-serif">
          La Taverne du Héros
        </h1>

        <p className="max-w-2xl text-lg text-amber-100/90 leading-relaxed">
          Bienvenue voyageur ! Ici, les récits s’échangent autour d’une chope de bière
          et les quêtes se préparent au coin du feu. Que cherches-tu ?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="bg-amber-700 hover:bg-amber-800 text-white text-lg px-6 py-3 rounded-2xl shadow-lg transition-all duration-200">
            ⚔️ Commencer une quête
          </button>

          <button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-6 py-3 rounded-2xl shadow-lg transition-all duration-200">
            🗺️ Explorer le monde
          </button>

          <button className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-6 py-3 rounded-2xl shadow-lg transition-all duration-200">
            🍺 S’asseoir à la taverne
          </button>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="relative z-10 mb-6 text-sm text-amber-300">
        © 2025 La Taverne du Héros
      </footer>
    </div>
  );
}
