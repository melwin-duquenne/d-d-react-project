import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white w-full">
        <div className="w-2/3 flex flex-col items-center">
            <Image src="/404.webp" alt="404 Not Found" width={800} height={700} />
            <h2 className="text-2xl text-center mb-2">Oups ! Page non trouvée</h2>
            <p className="mb-6 text-center">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
            <Link href="/fr" className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition">Retour à l&apos;accueil</Link>
        </div>
    </div>
  );
}
