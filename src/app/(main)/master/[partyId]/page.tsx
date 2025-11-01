"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ListMonster from "@/app/component/master/Listmonster";
import SlateEditor from "@/app/component/master/SlateEditor";
import { Party } from "@/model/partyModel";

export default function MasterPage() {
  const params = useParams();
  const partyId = params?.partyId ? String(params.partyId) : "";
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // Récupérer l'email du master connecté depuis le token localStorage
  const getMasterEmail = (): string => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "";
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email || "";
    } catch {
      return "";
    }
  };
  const masterEmail = getMasterEmail();

  useEffect(() => {
    if (!partyId) return;
    setLoading(true);
    fetch(`/api/party`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: partyId }),
    })
      .then(res => res.json())
      .then(data => {
        setParty(data.party);
        setIsOwner(data.party?.masterEmail === masterEmail);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [partyId, masterEmail]);

  if (loading) return <div className="text-center py-12">Chargement...</div>;
  if (!party) return <div className="text-center py-12 text-red-600">Partie introuvable</div>;

  return (
    <div className="flex min-h-screen items-center justify-center backdrop-blur-md">
      <div className="w-1/2 h-screen">
        <SlateEditor initialText={party.adventureText ?? ""} partyId={partyId} />
      </div>
      <div className="w-1/2 min-h-screen">
        {/* Passer partyId à ListMonster pour filtrer les cartes joueurs */}
        <ListMonster partyId={partyId as string} isOwner={isOwner} />
      </div>
    </div>
  );
}