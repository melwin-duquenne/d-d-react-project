import Providers from "./providers";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function Layout({ children, params }: Props) {
  return (
    <Providers params={params}>
      <div className="bg-[url('/font.webp')] bg-center bg-cover">
        {children}
      </div>
    </Providers>
  );
}