import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllClasses } from "@/fetch/MonsterFetch";

interface ClassSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ClassSelect({ value, onChange }: ClassSelectProps) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function loadClasses() {
      try {
        const classes = await fetchAllClasses();
        setOptions(
          classes.map((classe: { name: string; index: string }) => ({
            label: classe.name,
            value: classe.index,
          }))
        );
      } catch (e) {
        setOptions([]);
      }
    }
    loadClasses();
  }, []);

  return (
    <div className="rounded p-4">
      <SelectInput
        label="Classes"
        name="class"
        options={options}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
