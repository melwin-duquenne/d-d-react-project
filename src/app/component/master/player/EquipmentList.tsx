import { useEffect, useState } from "react";
import { fetchAllEquipment, fetchAllMagicItems } from "@/fetch/MonsterFetch";

export default function EquipmentList() {
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const [equipment, magicItems] = await Promise.all([
          fetchAllEquipment(),
          fetchAllMagicItems(),
        ]);
        const eqOptions = equipment.map((item: { name: string; index: string }) => ({
          label: item.name,
          value: item.index,
        }));
        const miOptions = magicItems.map((item: { name: string; index: string }) => ({
          label: item.name + " (Magique)",
          value: item.index,
        }));
        setItems([...eqOptions, ...miOptions]);
      } catch (e) {
        setItems([]);
      }
    }
    loadItems();
  }, []);

  function handleAdd(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value && !selected.includes(value)) {
      setSelected([...selected, value]);
    }
  }

  function handleRemove(value: string) {
    setSelected(selected.filter((v) => v !== value));
  }

  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Équipement & Magic Items</h3>
      <select onChange={handleAdd} value="" className="bg-white rounded px-2 py-1 border w-full">
        <option value="">Ajouter...</option>
        {items
          .filter((item) => !selected.includes(item.value))
          .map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      <ul className="mt-2">
        {selected.map((val) => {
          const item = items.find((i) => i.value === val);
          return (
            <li key={val} className="flex items-center justify-between bg-white rounded px-2 py-1 mb-1 border">
              <span>{item ? item.label : val}</span>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemove(val)}
                type="button"
              >
                Retirer
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
