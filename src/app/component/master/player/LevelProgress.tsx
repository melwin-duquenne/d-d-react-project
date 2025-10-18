import { useState } from "react";
import { levelThresholds } from "../../../../utils/player/levelThresholds";

export default function LevelProgress() {
  // Exemple : XP du joueur (à remplacer par une prop ou une valeur dynamique)
  const [xp, setXp] = useState(0);

  // Trouver le niveau actuel
  let level = 1;
  for (let i = 0; i < levelThresholds.length; i++) {
    if (xp >= levelThresholds[i]) level = i + 1;
    else break;
  }
  const nextLevelXp = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  const currentLevelXp = levelThresholds[level - 1];
  const progress = Math.min(1, (xp - currentLevelXp) / (nextLevelXp - currentLevelXp));

  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Niveau & Progression XP</h3>
      <div className="mb-2">Niveau actuel : <span className="font-bold">{level}</span></div>
      <div className="mb-2">XP : <input type="number" value={xp} min={0} max={nextLevelXp} onChange={e => setXp(Number(e.target.value))} className="border bg-white px-2 py-1 rounded w-24" /> / {nextLevelXp} (pour niveau {level + 1})</div>
      <div className="w-full bg-gray-200 rounded h-4">
        <div
          className="h-4 rounded"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, #1b7a3eff 0%, #16a34a 100%)`,
            transition: 'width 0.3s',
          }}
        />
      </div>
      <div className="text-xs mt-1">Progression vers le niveau {level + 1}: {(progress * 100).toFixed(1)}%</div>
    </div>
  );
}
