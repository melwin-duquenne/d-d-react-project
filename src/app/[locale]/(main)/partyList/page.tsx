"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Partys } from "@/model/partyModel";


export default function PartyListPage() {
  const locale = useLocale();
  const [parties, setParties] = useState<Partys[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Récupérer l'email du master connecté via NextAuth
  const { data: session } = useSession();
  const masterEmail = session?.user?.email || "";

  // Traductions
  const t = useTranslations('partyList');

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
        setError(t('errorLoading'));
        setLoading(false);
      });
  }, [masterEmail]);

  async function handleCreateParty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
  if (!name) return setError(t('nameRequired'));
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
      setError(data.error || t('errorCreate'));
    }
    setLoading(false);
  }

  async function handleDeleteParty(id: string) {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/party`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, masterEmail }),
    });
    if (res.ok) {
      setParties(parties.filter(p => p._id !== id));
    } else {
      const data = await res.json();
      setError(data.error || t('errorDelete'));
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-12 h-screen">
  <h1 className="text-3xl font-bold mb-8 text-center">{t('title')}</h1>
      <form className="flex gap-4 mb-8" onSubmit={handleCreateParty}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-amber-700 text-white px-6 py-2 rounded" disabled={loading}>
          {t('create')}
        </button>
      </form>
  {error && <div className="text-red-600 mb-4">{error}</div>}
  {loading && <div className="text-gray-600">{t('loading')}</div>}
      <ul className="space-y-4">
        {parties.map((party) => (
          <li key={party._id} className="border p-4 rounded flex justify-between items-center">
            <span className="font-semibold">{party.name}</span>
            <div className="flex gap-2">
              <Link href={`/${locale}/master/${party._id}`} className="bg-amber-700 text-white px-4 py-2 rounded">{t('access')}</Link>
              <button
                onClick={() => handleDeleteParty(party._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                disabled={loading}
              >
                {t('delete')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
