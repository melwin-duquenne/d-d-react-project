import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllSkills } from "@/fetch/MonsterFetch";

interface SkillSelectProps {
  value: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillSelect({ value, onChange }: SkillSelectProps) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function loadSkills() {
      try {
        const skills = await fetchAllSkills();
        setOptions(
          skills.map((skill: { name: string; index: string }) => ({
            label: skill.name,
            value: skill.index,
          }))
        );
      } catch (e) {
        setOptions([]);
      }
    }
    loadSkills();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    onChange(selected);
  }

  return (
    <div className="rounded p-4 w-full">
      <SelectInput
        label="Compétences"
        name="skills"
        options={options}
        multiple
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
