import { useEffect, useState } from "react";
import Image from "next/image";
import PlayerCardView from "./PlayerCardView";

interface PlayerCardListItem {
  _id: string;
  name: string;
}

export default function ListPlayerCard() {
  const [players, setPlayers] = useState<PlayerCardListItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/playerCard?all=true")
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

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
        <PlayerCardView name={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
