import React, { useState } from "react";
import UploadImage from "../upload/UploadImage";
import SelectImage from "../upload/SelectImage";
import { Pawn } from "@/model/map";



export default function MapBoard() {
  const [pawns, setPawns] = useState<Pawn[]>([
    { id: 1, x: 100, y: 100, color: "#eab308", label: "A" },
    { id: 2, x: 200, y: 180, color: "#2563eb", label: "B" },
  ]);
  const [newPawn, setNewPawn] = useState({ label: "", color: "#eab308" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [dragged, setDragged] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Liste des maps du dossier public/basicMap
  const basicMaps = [
    "/basicMap/camp.jpg",
    "/basicMap/foreste-village.webp",
    "/basicMap/Halloween-Dungeon.jpg"
  ];
  const [images, setImages] = useState<string[]>(basicMaps);
  const [selectedImage, setSelectedImage] = useState<string>(basicMaps[0]);

  function handleMouseDown(e: React.MouseEvent, id: number) {
    setDragged(id);
    const pawn = pawns.find(p => p.id === id);
    if (pawn) {
      setOffset({ x: e.clientX - pawn.x, y: e.clientY - pawn.y });
    }
  }

  function handleAddPawn(e: React.FormEvent) {
    e.preventDefault();
    if (!newPawn.label.trim()) return;
    const nextId = pawns.length ? Math.max(...pawns.map(p => p.id)) + 1 : 1;
    setPawns([...pawns, { id: nextId, x: 120, y: 120, color: newPawn.color, label: newPawn.label }]);
    setNewPawn({ label: "", color: "#eab308" });
  }

  function handleDeletePawn(id: number) {
    setPawns(pawns => pawns.filter(p => p.id !== id));
  }

  function handleEditPawn(id: number, label: string) {
    setPawns(pawns => pawns.map(p => p.id === id ? { ...p, label } : p));
    setEditingId(null);
  }
  function handleMouseMove(e: React.MouseEvent) {
    if (dragged !== null) {
      setPawns(pawns => pawns.map(p =>
        p.id === dragged ? { ...p, x: e.clientX - offset.x, y: e.clientY - offset.y } : p
      ));
    }
  }
  function handleMouseUp() {
    setDragged(null);
  }
  function handleUpload(url: string) {
    setImages(imgs => [...imgs, url]);
    setSelectedImage(url);
  }

  return (
    <div className="mb-4 p-4 bg-white text-black">
      <SelectImage images={images} value={selectedImage} onChange={setSelectedImage} />
      <UploadImage onUpload={handleUpload} />
      {/* Formulaire d'ajout de pion */}
      <form className="flex gap-2 items-center my-4" onSubmit={handleAddPawn}>
        <input
          type="text"
          placeholder="Nom du joeur"
          value={newPawn.label}
          onChange={e => setNewPawn({ ...newPawn, label: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        />
        <input
          type="color"
          value={newPawn.color}
          onChange={e => setNewPawn({ ...newPawn, color: e.target.value })}
          className="w-8 h-8 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Ajouter joueur</button>
      </form>
      <div
        className="relative w-full h-[800px] border rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url('${selectedImage}')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {pawns.map(pawn => (
          <div
            key={pawn.id}
            style={{
              position: "absolute",
              left: pawn.x,
              top: pawn.y,
              width: 40,
              height: 40,
              background: pawn.color,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "grab",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              userSelect: "none",
            }}
            onMouseDown={e => handleMouseDown(e, pawn.id)}
          >
            {editingId === pawn.id ? (
              <input
                type="text"
                value={editLabel}
                onChange={e => setEditLabel(e.target.value)}
                onBlur={() => handleEditPawn(pawn.id, editLabel)}
                onKeyDown={e => {
                  if (e.key === "Enter") handleEditPawn(pawn.id, editLabel);
                }}
                autoFocus
                className="w-24 px-1 text-black rounded"
                style={{ whiteSpace: "nowrap", overflow: "visible" }}
              />
            ) : (
              <span
                onDoubleClick={() => { setEditingId(pawn.id); setEditLabel(pawn.label); }}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "visible",
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  transform: "translate(-50%, 0)",
                  minWidth: 40,
                  zIndex: 15,
                  fontWeight: "bold",
                  color: "#222",
                  background: "rgba(255,255,255,0.8)",
                  padding: "0 4px",
                  borderRadius: 4,
                  pointerEvents: "auto"
                }}
              >
                {pawn.label}
              </span>
            )}
            <button
              onClick={e => { e.stopPropagation(); handleDeletePawn(pawn.id); }}
              className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center"
              title="Supprimer"
              style={{ zIndex: 20 }}
            >×</button>
          </div>
        ))}
        <div className="absolute top-2 left-2 text-black bg-white bg-opacity-80 px-2 py-1 rounded shadow text-xs">Carte interactive</div>
      </div>
    </div>
  );
}
