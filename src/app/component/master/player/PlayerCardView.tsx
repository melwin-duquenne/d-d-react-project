import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayerCardData } from "@/model/playerCardTemplate";
import { levelThresholds } from "../../../../utils/player/levelThresholds";
import PlayerCard from "../PlayerCard";



interface PlayerCardViewProps {
  name: string;
  onClose: () => void;
  isOwner?: boolean;
}

export default function PlayerCardView({ name, onClose, isOwner }: PlayerCardViewProps) {

  const [player, setPlayer] = useState<PlayerCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    fetch(`/api/playerCard?name=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        setPlayer(data);
        setLoading(false);
      });
  }, [name]);

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="bg-white rounded p-8 shadow text-center">Chargement...</div>
    </div>
  );
  if (!player) return null;

  // Calcul de la progression XP
  const level = player.level;
  const xp = player.xp;
  const nextLevelXp = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  const currentLevelXp = levelThresholds[level - 1];
  const progress = Math.min(1, (xp - currentLevelXp) / (nextLevelXp - currentLevelXp));

  if (editMode) {
    // Affiche le formulaire PlayerCard pré-rempli pour édition
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-auto">
        <div className="bg-[url('/playerPaper.webp')] bg-center bg-cover p-20 mt-[800px] w-full max-w-4xl relative">
          <button onClick={() => setEditMode(false)} className="absolute top-30 right-14 text-2xl text-gray-500 hover:text-red-500">&times;</button>
          <PlayerCard initialData={player} onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="bg-[url('/playerPaper.webp')] bg-center bg-cover p-20 w-full min-h-[800px] max-w-4xl relative">
        <button onClick={onClose} className="absolute top-2 right-14 text-2xl text-gray-500 hover:text-red-500">&times;</button>
        {isOwner && (
          <button onClick={() => setEditMode(true)} className="absolute top-2 left-18 text-lg cursor-pointer text-black px-4 py-3 rounded-full shadow">&#9998;</button>
        )}
        <h2 className="text-2xl font-bold mb-4 text-amber-800">{player.name}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><b>Race:</b> {player.race}</div>
          <div><b>Classe:</b> {player.class}</div>
          <div className="col-span-2 flex flex-col">
            <b>Niveau:</b> {level}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs">XP: {xp} / {nextLevelXp}</span>
              <div className="flex-1 bg-gray-200 rounded h-4">
                <div
                  className="h-4 rounded"
                  style={{
                    width: `${progress * 100}%`,
                    background: `linear-gradient(90deg, #1b7a3eff 0%, #16a34a 100%)`,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
              <span className="text-xs">{(progress * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <b>Caractéristiques:</b>
          <ul className="grid grid-cols-3 gap-2 mt-1">
            <li>FOR: {player.abilityScores.strength}</li>
            <li>DEX: {player.abilityScores.dexterity}</li>
            <li>CON: {player.abilityScores.constitution}</li>
            <li>INT: {player.abilityScores.intelligence}</li>
            <li>SAG: {player.abilityScores.wisdom}</li>
            <li>CHA: {player.abilityScores.charisma}</li>
          </ul>
        </div>
        <div className="mb-2"><b>Langues:</b> {player.languages.join(", ")}</div>
        <div className="mb-2"><b>Compétences:</b> {player.skills.join(", ")}</div>
        <div className="mb-2"><b>Sorts:</b> {player.spells.join(", ")}</div>
        <div className="mb-2"><b>Équipement:</b> {player.equipment.join(", ")}</div>
        <div className="mb-2"><b>Objets magiques:</b> {player.magicItems.join(", ")}</div>
        <div className="mb-2"><b>Histoire:</b> <span className="whitespace-pre-line">{player.history}</span></div>
      </div>
    </div>
  );
}
