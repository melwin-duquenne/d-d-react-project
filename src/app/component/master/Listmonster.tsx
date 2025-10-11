'use client';
import { useEffect, useState } from "react";
import { fetchAllMonsters } from "@/fetch/MonsterFetch";
import MonsterModal from "@/app/component/modal/monsterModal";
import { Monsters } from "@/model/monster";
import PlayerCard from "./PlayerCard";
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
                    <div className="p-4 bg-white opacity-80 ">
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
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    {selectedIndex && (
                        <MonsterModal index={selectedIndex} onClose={() => setSelectedIndex(null)} />
                    )}
                    {showPlayerCard && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl shadow-lg p-8 w-1/2">
                                <div className="flex justify-end w-full">
                                    <button className="text-amber-700 text-2xl" onClick={() => setShowPlayerCard(false)}>&times;</button>
                                </div>
                                <div>
                                    <PlayerCard />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
    );
}