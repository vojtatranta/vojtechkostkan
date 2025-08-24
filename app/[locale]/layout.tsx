import type { Metadata } from "next";
import { LangProvider } from "@/components/lang-context";
import LangHtmlSetter from "@/components/lang-html-setter";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Vojtěch Kostkan",
    template: "%s | Vojtěch Kostkan",
  },
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "cs" | "en" };
}) {
  const { locale } = params;
  const other = locale === "cs" ? "en" : "cs";
  return (
    <LangProvider locale={locale}>
      <LangHtmlSetter locale={locale} />
      {children}
      {/* Simple floating language switcher */}
      <div className="fixed top-3 right-3 z-[100] hidden md:block">
        <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 backdrop-blur px-2 py-1 text-xs shadow-sm">
          <span className="text-neutral-600">Lang:</span>
          {locale === "cs" ? (
            <span className="font-semibold">CS</span>
          ) : (
            <Link href="/" className="text-neutral-700 hover:text-black">CS</Link>
          )}
          <span className="text-neutral-400">/</span>
          {locale === "en" ? (
            <span className="font-semibold">EN</span>
          ) : (
            <Link href="/en" className="text-neutral-700 hover:text-black">EN</Link>
          )}
        </div>
      </div>
    </LangProvider>
  );
}
