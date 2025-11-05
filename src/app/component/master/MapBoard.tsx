"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import UploadImage from "../upload/UploadImage";
import SelectImage from "../upload/SelectImage";

import { useTranslations } from 'next-intl';
import { Pawn } from "@/model/map";


export default function MapBoard() {
  const t = useTranslations('mapBoard');
  const [zoom, setZoom] = useState(1);
  function handleZoomIn() {
    setZoom(z => Math.min(z + 0.2, 3));
  }
  function handleZoomOut() {
    setZoom(z => Math.max(z - 0.2, 0.4));
  }
  const [pawns, setPawns] = useState<Pawn[]>([]);
  const [newPawn, setNewPawn] = useState({ label: "", color: "#eab308" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [dragged, setDragged] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Liste des maps du dossier public/basicMap
  const basicMaps = [
    { url: "/basicMap/camp.jpg", name: "camp.jpg" },
    { url: "/basicMap/foreste-village.webp", name: "foreste-village.webp" },
    { url: "/basicMap/Halloween-Dungeon.jpg", name: "Halloween-Dungeon.jpg" }
  ];
  const uploadedImages = useSelector((state: RootState) => state.mapImages.images);
  const allImages = [...basicMaps, ...uploadedImages];
  const [selectedImage, setSelectedImage] = useState<string>(basicMaps[0].url);

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
  setSelectedImage(url);
  }

  return (
    <div className="mb-4 p-4 bg-white text-black">
  <SelectImage images={allImages} value={selectedImage} onChange={setSelectedImage} />
      <UploadImage onUpload={handleUpload} />
      {/* Formulaire d'ajout de pion */}
      <form className="flex gap-2 items-center my-4" onSubmit={handleAddPawn}>
        <input
          type="text"
          placeholder={t('playerNamePlaceholder')}
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
        <button type="submit" className="bg-amber-700 text-white px-3 py-1 rounded text-sm">{t('addPlayer')}</button>
      </form>
      <div
        className="relative w-full h-[800px] border rounded-lg overflow-hidden"
        style={{
          background: "#f3f3f3",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Map image zoomée */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `100%`,
            height: `100%`,
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <Image
            src={selectedImage}
            alt="map"
            fill
            style={{
              objectFit: "contain",
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.2s",
              pointerEvents: "none",
              userSelect: "none",
            }}
            draggable={false}
            priority
          />
        </div>

        {/* Pions */}
        {pawns.map(pawn => (
          <div
            key={pawn.id}
            style={{
              position: "absolute",
              left: pawn.x * zoom,
              top: pawn.y * zoom,
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
              title={t('delete')}
              style={{ zIndex: 20 }}
            >×</button>
          </div>
        ))}
        <div className="absolute top-2 left-2 flex items-center z-30 gap-2 text-black bg-white bg-opacity-80 px-2 py-1 rounded shadow text-xs">
          <span>{t('interactiveMap')}</span>
          <button onClick={handleZoomOut} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span className="px-2">{(zoom * 100).toFixed(0)}%</span>
          <button onClick={handleZoomIn} className="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>
      </div>
    </div>
  );
}
