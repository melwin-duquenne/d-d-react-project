import { UploadImageProps } from "@/model/map";
import React, { useRef, useState } from "react";


export default function UploadImage({ onUpload }: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      // Simule l'upload (à remplacer par un vrai upload backend si besoin)
      setTimeout(() => {
        onUpload(url);
      }, 500);
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor="upload-image" className="inline-block mb-2 px-4 py-2 bg-amber-700 text-white rounded cursor-pointer hover:bg-amber-800 transition-all">
        Ajouter une carte
      </label>
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {preview && (
        <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
      )}
    </div>
  );
}
