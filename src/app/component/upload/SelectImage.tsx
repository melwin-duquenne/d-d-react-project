import React from "react";

interface SelectImageProps {
  images: string[];
  value: string;
  onChange: (url: string) => void;
}

export default function SelectImage({ images, value, onChange }: SelectImageProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">Choisir une carte :</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        {images.map((url, idx) => (
          <option key={idx} value={url}>{url.split("/").pop()}</option>
        ))}
      </select>
    </div>
  );
}
