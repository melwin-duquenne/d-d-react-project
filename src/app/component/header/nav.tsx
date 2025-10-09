import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-[#f7f2c6] text-black p-4 w-full flex items-center justify-between">
      <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-bold font-serif">La Taverne du Héros</h1>
      </div>
      <Link href="/login" className="bg-black text-white p-2 rounded">Se connecter</Link>
    </nav>
  );
}
