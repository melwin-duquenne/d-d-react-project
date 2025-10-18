import TextInput from "../../form/input/inputText";

export default function NameText() {
  return (
    <div className="rounded p-4">
      <TextInput name="text" label="Nom :" type="text" placeholder=""/>
    </div>
  );
}