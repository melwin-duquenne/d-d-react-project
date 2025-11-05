"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();

  const isConnected = !!session;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-[#f7f2c6] text-black p-4 w-full flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
        <h1 className="text-2xl font-bold font-serif">La Taverne du Héros</h1>
      {isConnected && (
        <button className="bg-amber-700 ml-8 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
          <Link className="font-bold" href="/partyList">Parties</Link>
        </button>
      )}
      <button className="bg-amber-700 ml-8 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
          <Link className="font-bold" href="/about">à propos</Link>
        </button>
      </div>
      
      {isConnected ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-2 rounded"
          id="logout"
        >
          Se déconnecter
        </button>
      ) : (
        <Link href="/login" className="bg-black text-white p-2 rounded">Se connecter</Link>
      )}
    </nav>
  );
}
