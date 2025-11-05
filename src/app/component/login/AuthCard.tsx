"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthCard() {
  const t = useTranslations('login');
  const locale = useLocale();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError(t('errorRequired'));
      toast.error(t('errorRequired'));
      return;
    }
    if (!isLogin && password !== confirm) {
      setError(t('errorPasswordMatch'));
      toast.error(t('errorPasswordMatch'));
      return;
    }
    if (isLogin) {
      // Connexion via next-auth
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        setSuccess(t('successLogin'));
        toast.success(t('successLogin'), {
          onClose: () => router.replace(`/${locale}`),
          autoClose: 1500,
        });
      }
    } else {
      // Inscription via API custom
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || t('errorRegister'));
          toast.error(data.error || t('errorRegister'));
        } else {
          setSuccess(t('successRegister'));
          toast.success(t('successRegister'), {
            autoClose: 1200,
            onClose: async () => {
              const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
              });
              if (!result?.error) {
                router.replace(`/${locale}`);
              }
            },
          });
        }
      } catch (err) {
        setError(t('errorServer'));
        toast.error(t('errorServer'));
      }
    }
  }
  return (
    <>
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
            <Link href={`/${locale}`}>
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
            {isLogin ? t('login') : t('register')}
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2 text-amber-700">{t('email')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className=" w-full px-4 py-3 rounded-xl border border-amber-300 text-black focus:border-amber-700 focus:outline-none"
                placeholder={t('email')}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium mb-2 text-amber-700">{t('password')}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-black px-4 py-3 rounded-xl border border-amber-300 focus:border-amber-700 focus:outline-none"
                placeholder={t('password')}
                required
              />
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="confirm" className="block text-lg font-medium mb-2 text-amber-700">{t('confirmPassword')}</label>
                <input
                  type="password"
                  id="confirm"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="w-full text-black px-4 py-3 rounded-xl border border-amber-300 focus:border-amber-700 focus:outline-none"
                  placeholder={t('confirmPassword')}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              id="validate"
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
              disabled={!!session} // désactive le bouton si déjà connecté
            >
              {isLogin ? t('loginButton') : t('registerButton')}
            </button>
          </form>
          {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
          {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
          {session && <div className="mt-4 text-blue-600 text-center">{t('connected')}</div>}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-amber-700 hover:underline font-medium"
              onClick={() => setIsLogin((v) => !v)}
            >
              {isLogin ? t('noAccount') : t('alreadyAccount')}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
  }