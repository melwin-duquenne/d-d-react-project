import { useEffect, useState } from "react";
import { fetchAllEquipment, fetchAllMagicItems } from "@/fetch/MonsterFetch";

interface EquipmentListProps {
  value: string[]; // équipement
  magicValue: string[]; // magic items
  onChange: (equipment: string[], magicItems: string[]) => void;
}

export default function EquipmentList({ value, magicValue, onChange }: EquipmentListProps) {
  const [items, setItems] = useState<{ label: string; value: string; isMagic: boolean }[]>([]);

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
          isMagic: false,
        }));
        const miOptions = magicItems.map((item: { name: string; index: string }) => ({
          label: item.name + " (Magique)",
          value: item.index,
          isMagic: true,
        }));
        setItems([...eqOptions, ...miOptions]);
      } catch (e) {
        setItems([]);
      }
    }
    loadItems();
  }, []);

  function handleAdd(e: React.ChangeEvent<HTMLSelectElement>) {
    const valueToAdd = e.target.value;
    const item = items.find(i => i.value === valueToAdd);
    if (!item) return;
    if (item.isMagic) {
      if (!magicValue.includes(valueToAdd)) {
        onChange(value, [...magicValue, valueToAdd]);
      }
    } else {
      if (!value.includes(valueToAdd)) {
        onChange([...value, valueToAdd], magicValue);
      }
    }
  }

  function handleRemove(val: string) {
    const item = items.find(i => i.value === val);
    if (!item) return;
    if (item.isMagic) {
      onChange(value, magicValue.filter(v => v !== val));
    } else {
      onChange(value.filter(v => v !== val), magicValue);
    }
  }

  return (
    <div className="rounded p-4">
      <h3 className="font-bold mb-2">Équipement & Magic Items</h3>
      <select onChange={handleAdd} value="" className="bg-white rounded px-2 py-1 border w-full">
        <option value="">Ajouter...</option>
        {items
          .filter((item) => !value.includes(item.value) && !magicValue.includes(item.value))
          .map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      <ul className="mt-2">
        {[...value, ...magicValue].map((val) => {
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
