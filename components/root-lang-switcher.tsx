"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLangSwitcher() {
  const pathname = usePathname();
  // Show this switcher only on exact root '/'. Let the locale layout handle others.
  if (pathname !== "/") return null;

  return (
    <div className="fixed top-3 right-3 z-[100] hidden md:block">
      <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 backdrop-blur px-2 py-1 text-xs shadow-sm">
        <span className="text-neutral-600">Lang:</span>
        <span className="font-semibold">CS</span>
        <span className="text-neutral-400">/</span>
        <Link href="/en" className="text-neutral-700 hover:text-black">EN</Link>
      </div>
    </div>
  );
}
