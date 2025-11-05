import TextInput from "../../form/input/inputText";
import { useTranslations } from 'next-intl';

interface NameTextProps {
  value: string;
  onChange: (value: string) => void;
}
export default function NameText({ value, onChange }: NameTextProps) {
  const t = useTranslations('nameText');
  return (
    <div className="rounded p-4">
      <TextInput
        name="name"
        label={t('label')}
        type="text"
        placeholder=""
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}