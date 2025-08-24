import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import AuthSessionProvider from "@/components/auth-session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vojta kostkan | Instalatér & Topenář Praha",
  description:
    "Instalatérské a topenářské práce v Praze a okolí. Koupelny, rozvody vody, topení a rekonstrukce.",
  metadataBase: new URL("https://vojtakostkan.cz"),
  keywords: [
    "instalatér Praha",
    "topenář Praha",
    "rekonstrukce koupelny",
    "rozvody vody",
    "radiátory",
    "podlahové topení",
    "opravy vodoinstalace",
  ],
  authors: [{ name: "Vojtěch Kostkan" }],
  alternates: {
    canonical: "https://vojtakostkan.cz/",
  },
  openGraph: {
    type: "website",
    title: "Vojta Kostkan – Instalatér & Topenář Praha",
    description:
      "Instalatérské a topenářské práce v Praze a okolí. Koupelny, rozvody vody, topení a rekonstrukce.",
    url: "https://vojtakostkan.cz/",
    locale: "cs_CZ",
    siteName: "Vojta Kostkan",
    images: [
      {
        url: "/images/interior-renovation-copper-pipes-room.webp",
        width: 1200,
        height: 630,
        alt: "Instalatér & Topenář Praha – Vojta Kostkan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vojta Kostkan – Instalatér & Topenář Praha",
    description:
      "Instalatérské a topenářské práce v Praze a okolí. Koupelny, rozvody vody, topení a rekonstrukce.",
    images: ["/images/interior-renovation-copper-pipes-room.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SVYEL0E40R"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SVYEL0E40R');
          `}
        </Script>
        <AuthSessionProvider>
          <ConvexClientProvider>
            {children}
            <footer className="mx-auto w-full max-w-6xl px-4 py-10 text-center text-xs text-neutral-500">
              <div className="flex items-center justify-center gap-4">
                <a href="/login" className="underline hover:text-neutral-700">
                  Přihlášení
                </a>
                <span>·</span>
                <a
                  href="/register"
                  className="underline hover:text-neutral-700"
                >
                  Registrace
                </a>
              </div>
            </footer>
            <Toaster />
          </ConvexClientProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
