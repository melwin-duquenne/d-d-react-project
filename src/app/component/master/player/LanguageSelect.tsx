import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllLanguages } from "@/fetch/MonsterFetch";

export default function LanguageSelect() {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function loadLanguages() {
      try {
        const languages = await fetchAllLanguages();
        setOptions(
          languages.map((lang: { name: string; index: string }) => ({
            label: lang.name,
            value: lang.index,
          }))
        );
      } catch (e) {
        setOptions([]);
      }
    }
    loadLanguages();
  }, []);

  return (
    <div className="rounded p-4">
      <SelectInput label="Langues" name="languages" options={options} multiple />
    </div>
  );
}
