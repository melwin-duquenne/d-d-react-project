import { useEffect, useState } from "react";
import Image from "next/image";
import PlayerCardView from "./PlayerCardView";

interface PlayerCardListItem {
  _id: string;
  name: string;
}

interface ListPlayerCardProps {
  partyId: string;
  isOwner: boolean;
}

interface PlayerCardListItem {
  _id: string;
  name: string;
  partyId?: string;
}

export default function ListPlayerCard({ partyId, isOwner }: ListPlayerCardProps) {
  const [players, setPlayers] = useState<PlayerCardListItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/playerCard?all=true")
      .then(res => res.json())
      .then(data => {
        // Filtrer les joueurs par partyId
        setPlayers(data.filter((p: PlayerCardListItem) => p.partyId === partyId));
      });
  }, [partyId]);

  return (
    <>
      <div className="flex p-4">
        {players.map(player => (
          <div
            key={player._id}
            className="flex flex-col items-center bg-white rounded shadow p-3 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelected(player.name)}
          >
            <Image src="/list.webp" alt="player" width={80} height={80} className="mb-2" />
            <span className="font-semibold text-lg text-center break-words">{player.name}</span>
          </div>
        ))}
      </div>
      {selected && (
        <PlayerCardView name={selected} onClose={() => setSelected(null)} isOwner={isOwner} />
      )}
    </>
  );
}
