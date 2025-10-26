"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState } from "react";

export default function Nav() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Demo: check localStorage for a token
    setIsConnected(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
    // Optionally, redirect or reload
    window.location.href = "/login";
  };

  return (
    <nav className="bg-[#f7f2c6] text-black p-4 w-full flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold font-serif">La Taverne du Héros</h1>
      {isConnected && (
        <Link className="ml-8 font-bold" href="/partyList">Parties</Link>
      )}
      </div>
      
      {isConnected ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-2 rounded"
        >
          Se déconnecter
        </button>
      ) : (
        <Link href="/login" className="bg-black text-white p-2 rounded">Se connecter</Link>
      )}
    </nav>
  );
}
