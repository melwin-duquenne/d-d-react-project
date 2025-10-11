export default function AbilityScore() {
  return (
    <div className="bg-gray-50 rounded p-4">
      <h3 className="font-bold mb-2">Compétences</h3>
        <ul className="w-1/6">
            <li className="flex justify-between">cha<input type="number" defaultValue={5} className="w-12 text-center mx-1 border rounded" /></li>
            <li className="flex justify-between">con<input type="number" defaultValue={5} className="w-12 text-center mx-1 border rounded" /></li>
            <li className="flex justify-between">dex<input type="number" defaultValue={5} className="w-12 text-center mx-1 border rounded" /></li>
            <li className="flex justify-between">int<input type="number" defaultValue={5} className="w-12 text-center mx-1 border rounded" /></li>
            <li className="flex justify-between">str<input type="number" defaultValue={5} className="w-12 text-center mx-1 border rounded" /></li>
            <li className="flex justify-between">wis<input type="number" defaultValue={5} className="w-12 text-center mx-1 border rounded" /></li>
        </ul>
    </div>
  );
}
