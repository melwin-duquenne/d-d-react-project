export default function AbilityScore() {
  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Compétences</h3>
        <ul className="w-full">
            <li className="flex w-full justify-between">cha<input type="number" defaultValue={5} className="w-12 bg-white text-center mx-1 border rounded" /></li>
            <li className="flex w-full justify-between">con<input type="number" defaultValue={5} className="w-12 bg-white text-center mx-1 border rounded" /></li>
            <li className="flex w-full justify-between">dex<input type="number" defaultValue={5} className="w-12 bg-white text-center mx-1 border rounded" /></li>
            <li className="flex w-full justify-between">int<input type="number" defaultValue={5} className="w-12 bg-white text-center mx-1 border rounded" /></li>
            <li className="flex w-full justify-between">str<input type="number" defaultValue={5} className="w-12 bg-white text-center mx-1 border rounded" /></li>
            <li className="flex w-full justify-between">wis<input type="number" defaultValue={5} className="w-12 bg-white text-center mx-1 border rounded" /></li>
        </ul>
    </div>
  );
}
