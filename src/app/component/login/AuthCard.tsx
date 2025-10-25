"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [connected, setConnected] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Email et mot de passe requis");
      return;
    }
    if (!isLogin && password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const res = await fetch("/api/auth", {
        method: isLogin ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur inconnue");
      } else {
        setSuccess(isLogin ? "Connexion réussie !" : "Inscription réussie !");
        if (isLogin) {
          setConnected(true);
          if (data.token) localStorage.setItem("token", data.token);
        }
      }
    } catch (err) {
      setError("Erreur serveur");
    }
  }
  return (
    <div className="flex w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden bg-white">
      <div className="w-1/2 flex items-center justify-center bg-amber-100">
        <div className="relative overflow-hidden shadow-lg ">
          <Image
            src="/login.webp"
            alt="Login illustration"
            width={400}
            height={384}
            className="w-full "
            priority
          />
          <Link href={"/"}>
          <Image
            src="/logo.webp"
            alt="Logo"
            width={50}
            height={50}
            className="absolute top-4 left-4 rounded-full bg-white"
            priority
          />
          </Link>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center p-12">
        <h2 className="text-3xl font-bold mb-6 text-amber-800 text-center font-serif">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-amber-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className=" w-full px-4 py-3 rounded-xl border border-amber-300 text-black focus:border-amber-700 focus:outline-none"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-amber-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full text-black px-4 py-3 rounded-xl border border-amber-300 focus:border-amber-700 focus:outline-none"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm" className="block text-lg font-medium mb-2 text-amber-700">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirm"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full text-black px-4 py-3 rounded-xl border border-amber-300 focus:border-amber-700 focus:outline-none"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
            disabled={connected}
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
        {connected && <div className="mt-4 text-blue-600 text-center">Vous êtes connecté !</div>}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-amber-700 hover:underline font-medium"
            onClick={() => setIsLogin((v) => !v)}
          >
            {isLogin ? "Pas de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
  }