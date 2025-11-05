"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

export default function Nav() {

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');

  // Déduire la locale courante depuis l'URL
  const locale = pathname ? (pathname.split('/')[1] || 'fr') : 'fr';

  const isConnected = !!session;

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}/login` });
  };

  // Lang selector logic
  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    if (!pathname) return;
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && ['fr', 'en'].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    router.push(newPath);
  };

  return (
    <nav className="bg-[#f7f2c6] text-black p-4 w-full flex items-center justify-between">
      <div className="flex items-center">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
        <h1 className="text-2xl font-bold font-serif">{t('title')}</h1>
      {isConnected && (
        <button className="bg-amber-700 ml-8 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
          <Link className="font-bold" href={`/${locale}/partyList`}>{t('parties')}</Link>
        </button>
      )}
      <button className="bg-amber-700 ml-8 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
          <Link className="font-bold" href={`/${locale}/about`}>{t('about')}</Link>
        </button>
      </div>
      <div className="flex">
        <select
            className="mr-4 border rounded px-2 py-1 bg-amber-700 text-white focus-within:outline-none"
            value={locale}
            onChange={handleLocaleChange}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        {isConnected ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-2 rounded"
            id="logout"
          >
            {t('logout')}
          </button>
        ) : (
          <Link href={`/${locale}/login`} className="bg-black text-white p-2 rounded">{t('login')}</Link>
        )}
      </div>
    </nav>
  );
}
