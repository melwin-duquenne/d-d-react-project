import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllRaces } from "@/fetch/MonsterFetch";
import { useTranslations } from 'next-intl';

interface RaceSelectProps {
  value: string;
  onChange: (value: string) => void;
}
export default function RaceSelect({ value, onChange }: RaceSelectProps) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const t = useTranslations('raceSelect');

  useEffect(() => {
    async function loadRaces() {
      try {
        const races = await fetchAllRaces();
        setOptions(
          races.map((race: { name: string; index: string }) => ({
            label: race.name,
            value: race.index,
          }))
        );
      } catch (e) {
        setOptions([]);
      }
    }
    loadRaces();
  }, []);

  return (
    <div className="rounded p-4">
      <SelectInput
        label={t('label')}
        name="race"
        options={options}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
