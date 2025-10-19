import TextInput from "../../form/input/inputText";

interface NameTextProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NameText({ value, onChange }: NameTextProps) {
  return (
    <div className="rounded p-4">
      <TextInput
        name="name"
        label="Nom :"
        type="text"
        placeholder=""
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}