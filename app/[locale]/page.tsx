import type { Metadata } from "next";
import siteMetadata from "@/app/metadata.json";
import HomePageContent from "@/components/home-page-content";
import { kv } from "@vercel/kv";
import { CONTENT_KEYS as KEYS } from "@/lib/contentKeys";

export const metadata: Metadata = siteMetadata["/"];
export const revalidate = 0;

// KEYS imported from lib/contentKeys

function prefixed(locale: string, key: string) {
  return `content:${locale === "cs" ? "" : `${locale}:`}${key}`;
}

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "en" }] as const;
}

export default async function LocaleHomePage({
  params,
}: {
  params: { locale: "cs" | "en" };
}) {
  const { locale } = params;
  let initialContent: Record<string, string | undefined> = {};
  let initialContentCs: Record<string, string | undefined> = {};
  let initialContentEn: Record<string, string | undefined> = {};

  try {
    // Always fetch default CS and EN maps
    const csKeys = KEYS.map((k) => `content:${k}`);
    const enKeys = KEYS.map((k) => `content:en:${k}`);
    const [csRes, enRes] = await Promise.all([kv.mget(...csKeys), kv.mget(...enKeys)]);
    const csVals: (string | null)[] = Array.isArray(csRes) ? (csRes as (string | null)[]) : [];
    const enVals: (string | null)[] = Array.isArray(enRes) ? (enRes as (string | null)[]) : [];

    initialContentCs = KEYS.reduce<Record<string, string | undefined>>((acc, key, i) => {
      const v = csVals[i] ?? null;
      if (v != null) acc[key] = v as string;
      return acc;
    }, {});

    initialContentEn = KEYS.reduce<Record<string, string | undefined>>((acc, key, i) => {
      const v = enVals[i] ?? null;
      if (v != null) acc[key] = v as string;
      return acc;
    }, {});

    // Effective map for current locale; for EN do not fall back to CS here
    initialContent = locale === "cs" ? initialContentCs : initialContentEn;
  } catch {
    initialContent = {};
    initialContentCs = {};
    initialContentEn = {};
  }

  return (
    <HomePageContent
      initialContent={initialContent}
      initialContentCs={initialContentCs}
      initialContentEn={initialContentEn}
    />
  );
}
