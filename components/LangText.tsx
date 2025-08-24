"use client";

import { useLang } from "@/components/lang-context";

export default function LangText({ cs, en, as: Tag = "span", className }: { cs: string; en: string; as?: any; className?: string; }) {
  const { locale } = useLang();
  const text = locale === "en" ? en : cs;
  return <Tag className={className}>{text}</Tag>;
}
