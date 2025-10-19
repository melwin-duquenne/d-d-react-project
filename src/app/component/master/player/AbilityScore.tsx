interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface AbilityScoreProps {
  value: AbilityScores;
  onChange: (scores: AbilityScores) => void;
}

export default function AbilityScore({ value, onChange }: AbilityScoreProps) {
  function handleChange(key: keyof AbilityScores, val: number) {
    onChange({ ...value, [key]: val });
  }
  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Scores de Caractéristiques</h3>
      <ul className="w-full">
        <li className="flex w-full justify-between">CHA
          <input type="number" value={value.charisma} min={1} max={30} onChange={e => handleChange('charisma', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">CON
          <input type="number" value={value.constitution} min={1} max={30} onChange={e => handleChange('constitution', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">DEX
          <input type="number" value={value.dexterity} min={1} max={30} onChange={e => handleChange('dexterity', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">INT
          <input type="number" value={value.intelligence} min={1} max={30} onChange={e => handleChange('intelligence', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">STR
          <input type="number" value={value.strength} min={1} max={30} onChange={e => handleChange('strength', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">WIS
          <input type="number" value={value.wisdom} min={1} max={30} onChange={e => handleChange('wisdom', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
      </ul>
    </div>
  );
}
