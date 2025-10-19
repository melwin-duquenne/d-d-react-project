interface HistoryEditorProps {
  value: string;
  onChange: (history: string) => void;
}

export default function HistoryEditor({ value, onChange }: HistoryEditorProps) {
  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Histoire</h3>
      <textarea
        className="w-full bg-white h-24 p-2 rounded border"
        placeholder="Racontez l'histoire du personnage..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
