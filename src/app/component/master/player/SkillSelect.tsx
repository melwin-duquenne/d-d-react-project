import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllSkills } from "@/fetch/MonsterFetch";

export default function SkillSelect() {
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

  return (
    <div className="rounded p-4 w-full">
      <SelectInput label="Compétences" name="skills" options={options} multiple />
    </div>
  );
}
