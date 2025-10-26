"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Party {
  _id: string;
  name: string;
  masterEmail: string;
  createdAt: string | Date;
}

export default function PartyListPage() {
  const [parties, setParties] = useState<Party[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (!masterEmail) return;
    setLoading(true);
    fetch(`/api/party?masterEmail=${masterEmail}`)
      .then(res => res.json())
      .then(data => {
        setParties(data.parties || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des parties");
        setLoading(false);
      });
  }, [masterEmail]);

  async function handleCreateParty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!name) return setError("Nom de partie requis");
    setLoading(true);
    const res = await fetch("/api/party", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, masterEmail }),
    });
    const data = await res.json();
    if (res.ok) {
      setParties([
        ...parties,
        { _id: data.id, name, masterEmail, createdAt: new Date().toISOString() },
      ]);
      setName("");
    } else {
      setError(data.error || "Erreur lors de la création");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Mes parties</h1>
      <form className="flex gap-4 mb-8" onSubmit={handleCreateParty}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nom de la partie"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-amber-700 text-white px-6 py-2 rounded" disabled={loading}>
          Créer
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-gray-600">Chargement...</div>}
      <ul className="space-y-4">
        {parties.map((party) => (
          <li key={party._id} className="border p-4 rounded flex justify-between items-center">
            <span className="font-semibold">{party.name}</span>
            <Link href={`/master/${party._id}`} className="bg-amber-700 text-white px-4 py-2 rounded">Accéder</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
