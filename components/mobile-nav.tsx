"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import LangText from "@/components/LangText";
import Link from "next/link";
import { useLang } from "@/components/lang-context";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { locale } = useLang();

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-black hover:text-neutral-600 focus:outline-none"
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            aria-label="Zavřít menu"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            id="mobile-nav-panel"
            className="absolute inset-x-0 top-0 bg-white rounded-b-2xl shadow-lg border-b border-neutral-200 pt-4 pb-8 overflow-y-auto max-h-screen"
          >
            <div className="flex flex-col space-y-4">
              <a
                href="#sluzby"
                className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="Služby" en="Services" />
              </a>
              <a
                href="#omne"
                className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="O mně" en="About" />
              </a>
              <a
                href="#koupelny"
                className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="Koupelny" en="Bathrooms" />
              </a>
              <a
                href="#topeni"
                className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="Topení" en="Heating" />
              </a>
              <a
                href="#kontakt"
                className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="Kontakt" en="Contact" />
              </a>
              <a
                href="#oblast"
                className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="Oblast" en="Area" />
              </a>

              {/* CTA */}
              <a
                href="#kontakt"
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors mx-4 text-center text-sm"
                onClick={() => setOpen(false)}
              >
                <LangText cs="Poptat" en="Request" />
              </a>

              {/* Language switcher inside mobile menu */}
              <div className="px-4 pt-2 pb-2">
                <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-2 py-1 text-xs text-neutral-700">
                  <span className="text-neutral-600">
                    <LangText cs="Jazyk:" en="Lang:" />
                  </span>
                  {locale === "cs" ? (
                    <span className="font-semibold">CS</span>
                  ) : (
                    <Link href="/" className="hover:text-black">CS</Link>
                  )}
                  <span className="text-neutral-400">/</span>
                  {locale === "en" ? (
                    <span className="font-semibold">EN</span>
                  ) : (
                    <Link href="/en" className="hover:text-black">EN</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
