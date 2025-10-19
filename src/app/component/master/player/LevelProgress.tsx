import { levelThresholds } from "../../../../utils/player/levelThresholds";

interface LevelProgressProps {
  level: number;
  xp: number;
  onChangeLevel: (level: number) => void;
  onChangeXp: (xp: number) => void;
}

export default function LevelProgress({ level, xp, onChangeLevel, onChangeXp }: LevelProgressProps) {
  // Calcul du niveau à partir de l'xp si besoin (ici, on suppose que le parent gère la cohérence)
  const nextLevelXp = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  const currentLevelXp = levelThresholds[level - 1];
  const progress = Math.min(1, (xp - currentLevelXp) / (nextLevelXp - currentLevelXp));

  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Niveau & Progression XP</h3>
      <div className="mb-2">
        Niveau actuel :
        <input
          type="number"
          value={level}
          min={1}
          max={20}
          onChange={e => onChangeLevel(Number(e.target.value))}
          className="border bg-white px-2 py-1 rounded w-16 mx-2"
        />
      </div>
      <div className="mb-2">
        XP :
        <input
          type="number"
          value={xp}
          min={0}
          max={nextLevelXp}
          onChange={e => onChangeXp(Number(e.target.value))}
          className="border bg-white px-2 py-1 rounded w-24 mx-2"
        />
        / {nextLevelXp} (pour niveau {level + 1})
      </div>
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
