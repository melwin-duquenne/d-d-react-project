'use client';
import { useEffect, useState } from "react";
import { fetchAllMonsters } from "@/fetch/MonsterFetch";
import MonsterModal from "@/app/component/modal/monsterModal";
import { Monsters } from "@/model/monster";
import PlayerCard from "./PlayerCard";
import ListPlayerCard from "./player/ListPlayerCard";
interface ListMonsterProps {
    partyId: string;
    isOwner: boolean;
    onInsertMonster?: (monsterName: string) => void;
}

export default function ListMonster({ partyId, isOwner, onInsertMonster }: ListMonsterProps) {

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
        // Listen for monster tag click events from SlateEditor
        const handler = (e: CustomEvent) => {
            const monsterName = (e.detail.monsterName || "").toLowerCase().trim();
            // Find monster index by name (case-insensitive, trimmed)
            const monster = monsters.find(m => m.name.toLowerCase().trim() === monsterName);
            if (monster) setSelectedIndex(monster.index);
        };
        window.addEventListener('openMonsterModal', handler as EventListener);
        return () => {
            window.removeEventListener('openMonsterModal', handler as EventListener);
        };
    }, [monsters]);

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
                                                className="border-b pb-2 flex items-center cursor-pointer hover:bg-amber-100"
                                            >
                                                <span onClick={() => setSelectedIndex(monster.index)} className="flex-1 cursor-pointer">{monster.name}</span>
                                                <button
                                                    className="ml-2 px-2 py-1 text-xs bg-amber-700 text-white rounded"
                                                    onClick={() => onInsertMonster && onInsertMonster(monster.name)}
                                                >
                                                    +
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full flex items-center"> 
                                <button
                                    className="mt-4 px-4 ml-4 py-2 text-black rounded shadow hover:bg-amber-800"
                                    onClick={() => setShowPlayerCard(true)}>
                                    +
                                </button>
                                <ListPlayerCard partyId={partyId} isOwner={isOwner} />
                            </div>
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
                                    <PlayerCard partyId={partyId} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
    );
}