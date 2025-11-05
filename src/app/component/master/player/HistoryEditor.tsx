import { useTranslations } from 'next-intl';

interface HistoryEditorProps {
  value: string;
  onChange: (history: string) => void;
}

export default function HistoryEditor({ value, onChange }: HistoryEditorProps) {
  const t = useTranslations('history');
  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">{t('title')}</h3>
      <textarea
        className="w-full bg-white h-24 p-2 rounded border"
        placeholder={t('placeholder')}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
