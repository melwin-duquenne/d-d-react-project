import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllSpells } from "@/fetch/MonsterFetch";

interface SpellListSelectProps {
  value: string[];
  onChange: (spells: string[]) => void;
}

export default function SpellListSelect({ value, onChange }: SpellListSelectProps) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function loadSpells() {
      try {
        const spells = await fetchAllSpells();
        setOptions(
          spells.map((spell: { name: string; index: string }) => ({
            label: spell.name,
            value: spell.index,
          }))
        );
      } catch (e) {
        setOptions([]);
      }
    }
    loadSpells();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    onChange(selected);
  }

  return (
    <div className="rounded p-4">
      <SelectInput
        label="Sorts"
        name="spells"
        options={options}
        multiple
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
