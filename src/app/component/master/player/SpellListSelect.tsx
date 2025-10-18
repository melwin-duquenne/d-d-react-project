import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllSpells } from "@/fetch/MonsterFetch";

export default function SpellListSelect() {
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

  return (
    <div className="rounded p-4">
      <SelectInput label="Sorts" name="spells" options={options} multiple />
    </div>
  );
}
