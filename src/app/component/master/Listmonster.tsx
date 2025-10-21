'use client';
import { useEffect, useState } from "react";
import { fetchAllMonsters } from "@/fetch/MonsterFetch";
import MonsterModal from "@/app/component/modal/monsterModal";
import { Monsters } from "@/model/monster";
import PlayerCard from "./PlayerCard";
import ListPlayerCard from "./player/ListPlayerCard";
export default function ListMonster() {

    const [monsters, setMonsters] = useState<Monsters>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
    const [showPlayerCard, setShowPlayerCard] = useState(false);

    useEffect(() => {
        fetchAllMonsters()
            .then(data => setMonsters(data))
            .catch(() => setMonsters([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = monsters.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
                <div className="text-black">
                    <div className="p-4 bg-white  flex ">
                        <div className="w-1/2">
                            <input
                                type="text"
                                placeholder="Rechercher un monstre..."
                                className="mb-4 px-3 py-2 border rounded w-full"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <div className="max-h-[250px] overflow-y-auto">
                                {loading ? (
                                    <div>Chargement...</div>
                                ) : (
                                    <ul className="space-y-2">
                                        {filtered.map(monster => (
                                            <li
                                                key={monster.index}
                                                className="border-b pb-2 cursor-pointer hover:bg-amber-100"
                                                onClick={() => setSelectedIndex(monster.index)}
                                            >
                                                {monster.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* Bouton pour ouvrir la fiche joueur */}
                            <button
                                className="mt-4 px-4 py-2 bg-amber-700 text-white rounded shadow hover:bg-amber-800"
                                onClick={() => setShowPlayerCard(true)}
                            >
                                Afficher la fiche joueur
                            </button>
                        </div>
                        <div className="w-full">
                            <div className="w-full"> <ListPlayerCard /></div>
                            <div></div>
                        </div>
                    </div>
                    {selectedIndex && (
                        <MonsterModal index={selectedIndex} onClose={() => setSelectedIndex(null)} />
                    )}
                    {showPlayerCard && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 overflow-auto">
                            {/* Croix de fermeture flottante */}
                            <button
                                className="absolute top-2 right-8 text-amber-700 text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:bg-amber-100 hover:scale-110 transition-all border border-amber-300 z-50"
                                style={{ lineHeight: 1 }}
                                aria-label="Fermer la fiche joueur"
                                onClick={() => setShowPlayerCard(false)}
                            >
                                &times;
                            </button>
                                <div className="bg-[url('/playerPaper.webp')] bg-cover bg-center p-12 w-5/6 w-full mt-[500px] relative">
                                <div className="flex justify-center">
                                    <PlayerCard />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
    );
}