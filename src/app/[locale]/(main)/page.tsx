'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations('home');
  const locale = useLocale();

  function handleStart() {
    if (session) {
      router.push(`/${locale}/partyList`);
    } else {
      router.push(`/${locale}/login`);
    }
  }
  return (
    <div className="flex w-full  items-center justify-center text-amber-800">
      <div className="flex flex-col items-center z-10 max-w-[60%] mt-8 bg-[url('/parchemin.webp')] bg-top bg-cover bg-center rounded-2xl p-10 text-center animate-scroll-fade">
        <h1 className="text-5xl font-bold  drop-shadow-lg font-serif mt-50 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg leading-relaxed w-3/6 font-medium mb-2">
          {t('intro1')}
        </p>
        <p className="text-lg leading-relaxed w-3/6 font-medium mb-2">
          {t('intro2')}
        </p>
        <p className="text-lg leading-relaxed w-3/6 font-medium mb-2">
          {t('intro3')}
        </p>
        <p className="text-lg leading-relaxed w-3/6 font-medium mb-6">
          {t('intro4')}
        </p>
        <ul className="text-left max-w-lg mx-auto list-disc list-inside space-y-2 mb-6">
          <li>{t('feature1')}</li>
          <li>{t('feature2')}</li>
          <li>{t('feature3')}</li>
          <li>{t('feature4')}</li>
        </ul>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleStart}
            className="bg-amber-700 hover:bg-amber-800 text-white text-lg px-8 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105"
          >
            {t('cta')}
          </button>
        </div>
      </div>
    </div>
  );
}
