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

import { useTranslations } from 'next-intl';

export default function AbilityScore({ value, onChange }: AbilityScoreProps) {
  const t = useTranslations('ability');
  function handleChange(key: keyof AbilityScores, val: number) {
    onChange({ ...value, [key]: val });
  }
  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">{t('title')}</h3>
      <ul className="w-full">
        <li className="flex w-full justify-between">{t('charisma')}
          <input type="number" value={value.charisma} min={1} max={30} onChange={e => handleChange('charisma', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">{t('constitution')}
          <input type="number" value={value.constitution} min={1} max={30} onChange={e => handleChange('constitution', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">{t('dexterity')}
          <input type="number" value={value.dexterity} min={1} max={30} onChange={e => handleChange('dexterity', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">{t('intelligence')}
          <input type="number" value={value.intelligence} min={1} max={30} onChange={e => handleChange('intelligence', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">{t('strength')}
          <input type="number" value={value.strength} min={1} max={30} onChange={e => handleChange('strength', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
        <li className="flex w-full justify-between">{t('wisdom')}
          <input type="number" value={value.wisdom} min={1} max={30} onChange={e => handleChange('wisdom', Number(e.target.value))} className="w-12 bg-white text-center mx-1 border rounded" />
        </li>
      </ul>
    </div>
  );
}
