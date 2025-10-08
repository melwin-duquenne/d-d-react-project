import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full  items-center justify-center mt-8 text-amber-800">
     <div className="flex flex-col items-center z-10 max-w-[60%] bg-[url('/parchemin.png')] bg-top bg-cover bg-center rounded-2xl p-10 text-center animate-scroll-fade">
        <h1 className="text-5xl font-bold  drop-shadow-lg font-serif mt-60 mb-4">
          La Taverne du Héros
        </h1>
        <p className="text-lg leading-relaxed w-3/6 font-medium mb-6">
          Bienvenue, aventurier ! <br />
          Ici, les récits prennent vie et les quêtes s’écrivent à l’encre du destin.
          <br /> <br />
          <span className="text-amber-800">
            La Taverne du Héros
          </span>{" "}
          est ton alliée pour forger des scénarios épiques et gérer ton
          bestiaire avec aisance.  
          Que tu sois <b>Game Master</b> ou <b>joueur</b>, ce lieu te guidera
          dans la création de mondes, de monstres et de légendes.
        </p>

        <ul className="text-left max-w-lg mx-auto list-disc list-inside space-y-2 mb-6">
          <li>Authentifie-toi en tant que Maître du Jeu ou Aventurier.</li>
          <li>Crée et organise ton scénario avec un éditeur narratif.</li>
          <li>Consulte un bestiaire complet issu de l’API D&D 5e.</li>
          <li>Crée et gère les personnages de tes joueurs.</li>
        </ul>

        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-amber-700 hover:bg-amber-800 text-white text-lg px-8 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105">
            ⚔️ Entrer dans la taverne
          </button>
          <button className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105">
            🗺️ Découvrir le bestiaire
          </button>
        </div>
      </div>
      </div>
  );
}
