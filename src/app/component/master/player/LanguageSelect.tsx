import { useEffect, useState } from "react";
import SelectInput from "../../form/input/selectInput";
import { fetchAllLanguages } from "@/fetch/MonsterFetch";
import { useTranslations } from 'next-intl';

interface LanguageSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const t = useTranslations('languageSelect');
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

  // Pour le select multiple, value doit être un tableau de string
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    onChange(selected);
  };

  return (
    <div className="rounded p-4">
      <SelectInput
        label={t('label')}
        name="languages"
        options={options}
        multiple
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
