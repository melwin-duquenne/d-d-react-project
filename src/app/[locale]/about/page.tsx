'use client';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
	const t = useTranslations('about');
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-white/80 text-black">
			<div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
				<h1 className="text-4xl font-bold mb-6 text-center font-serif">{t('title')}</h1>
				<p className="mb-4 text-lg">{t('p1')}</p>
				<p className="mb-4 text-lg">{t('p2')}</p>
				<p className="mb-4 text-lg">{t('p3')}</p>
				<p className="mt-6 text-center text-xl font-semibold">{t('thanks')}</p>
			</div>
		</div>
	);
}
