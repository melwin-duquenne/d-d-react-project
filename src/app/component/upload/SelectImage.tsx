'use client';
import { SelectImageProps } from "@/model/map";
import React from "react";



export default function SelectImage({ images, value, onChange }: SelectImageProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">Choisir une carte :</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        {images.map((img, idx) => (
          <option key={idx} value={img.url}>{img.name}</option>
        ))}
      </select>
    </div>
  );
}
