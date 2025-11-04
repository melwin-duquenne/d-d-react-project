"use client";
import { UploadImageProps } from "@/model/map";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMapImage } from "@/store/mapImagesSlice";


export default function UploadImage({ onUpload }: UploadImageProps) {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1 Mo
        setError("Image trop lourde (max 1 Mo)");
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        dispatch(addMapImage({ id: Date.now().toString(), url: dataUrl, name: file.name }));
        setTimeout(() => {
          onUpload(dataUrl);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="mb-4">
      {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
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
