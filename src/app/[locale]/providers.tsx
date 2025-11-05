import { NextIntlClientProvider } from "next-intl";
import Nav from "../component/header/nav";

export default async function Providers({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Nav />
      {children}
    </NextIntlClientProvider>
  );
}