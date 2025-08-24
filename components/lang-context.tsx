"use client";

import React, { createContext, useContext } from "react";

export type Locale = "cs" | "en";

type LangContextValue = {
  locale: Locale;
  defaultLocale: Locale;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  locale,
  children,
  defaultLocale = "cs",
}: {
  locale: Locale;
  defaultLocale?: Locale;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={{ locale, defaultLocale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
