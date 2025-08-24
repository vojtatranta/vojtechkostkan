import "./globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "vojta kostkan | Instalatér & Topenář Praha",
  description: "Instalatérské a topenářské práce v Praze a okolí. Koupelny, rozvody vody, topení a rekonstrukce.",
  metadataBase: new URL('https://vojtakostkan.cz'),
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
      'max-snippet': -1,
      'max-image-preview': "large",
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
    </html>
  )
}
