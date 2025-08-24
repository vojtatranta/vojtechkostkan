"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
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
        <div id="mobile-nav-panel" className="border-t border-neutral-200 py-6">
          <div className="flex flex-col space-y-4">
            <a
              href="#sluzby"
              className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Služby
            </a>
            <a
              href="#omne"
              className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              O mně
            </a>
            <a
              href="#koupelny"
              className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Koupelny
            </a>
            <a
              href="#topeni"
              className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Topení
            </a>
            <a
              href="#kontakt"
              className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Kontakt
            </a>
            <a
              href="#oblast"
              className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Oblast
            </a>
            <a
              href="#kontakt"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors mx-4 text-center text-sm"
              onClick={() => setOpen(false)}
            >
              Poptat
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
