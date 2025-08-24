"use client";

import { useEffect } from "react";

export default function LangHtmlSetter({ locale }: { locale: "cs" | "en" }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
