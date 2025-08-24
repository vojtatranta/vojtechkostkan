"use client";

import {
  Phone,
  Mail,
  MapPin,
  Wrench,
  Flame,
  Droplets,
  Settings,
  Shield,
  Clock,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/contact-form";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  OWNER_NAME,
} from "@/lib/contact";

export default function HomePageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroImages = [
    { title: "Rozdělovač vytápění", image: "/images/mechanical-room-heating-manifold.webp" },
    {
      title: "Rozvody vody",
      image: "/images/bathroom-water-supply-rough-in.webp",
    },
    { title: "Topení", image: "/images/radiator-under-window.webp" },
    {
      title: "Rekonstrukce",
      image: "/images/interior-renovation-copper-pipes-room.webp",
    },
    {
      title: "Inženýrské sítě",
      image: "/images/railway-utility-conduits-trench.webp",
    },
  ];

  const categories = [
    {
      id: "koupelny",
      title: "Koupelny a sanitární instalace",
      intro:
        "Kompletní rozvody, montáže zařizovacích předmětů a přesné spády pro bezproblémový provoz.",
      items: [
        {
          title: "Rozvody koupelny",
          description:
            "Vedení odpadů a vody pro koupelny v novostavbách i rekonstrukcích.",
          image: "/images/bathroom-plumbing-rough-in.webp",
        },
        {
          title: "Sprchový žlab – rozvody",
          description:
            "Instalace lineárních žlabů a správné napojení na sifon.",
          image: "/images/bathroom-shower-rough-in-linear-drain.webp",
        },
        {
          title: "Přívody vody – rozvody",
          description: "Distribuce studené a teplé vody včetně uzlů a uzávěrů.",
          image: "/images/bathroom-water-supply-rough-in.webp",
        },
        {
          title: "Montáž WC",
          description: "Montáž závěsných i stojících toalet a tlaková zkouška.",
          image: "/images/toilet-installation-finished.webp",
        },
      ],
    },
    {
      id: "topeni",
      title: "Topení a radiátory",
      intro:
        "Dodávka a montáž radiátorů, rozvody v podlahách a vyvážení okruhů.",
      items: [
        {
          title: "Radiátor pod oknem",
          description: "Montáž radiátorů, ventily, termohlavice a odvzdušnění.",
          image: "/images/radiator-under-window.webp",
        },
        {
          title: "Rozdělovač vytápění",
          description:
            "Zapojení rozdělovačů podlahového topení a radiátorových okruhů.",
          image: "/images/mechanical-room-heating-manifold.webp",
        },
        {
          title: "Rozvody v podlaze",
          description:
            "Fixace a příprava rozvodů pro zalití, kontrola tras a dilatací.",
          image: "/images/rough-in-floor-piping-corridor.webp",
        },
      ],
    },
    {
      id: "technologie",
      title: "Technologie a strojovny",
      intro:
        "Instalace a servis technologických celků pro stabilní a bezpečný provoz.",
      items: [
        {
          title: "Vzduchotechnická jednotka",
          description:
            "Montáž a napojení technologií v kotelnách a strojovnách.",
          image: "/images/mechanical-room-robatherm-unit.webp",
        },
        {
          title: "Domácí vodárna – expanze",
          description:
            "Instalace expanzních nádob a čerpadel pro stabilní tlak.",
          image: "/images/domestic-water-booster-reflex-tank.webp",
        },
      ],
    },
    {
      id: "site",
      title: "Exteriér a inženýrské sítě",
      intro:
        "Pokládka a napojení potrubních tras vně objektů včetně šachet a ochranných prvků.",
      items: [
        {
          title: "Výkop a uložení potrubí",
          description: "Rýhy, pískové lože a ochrana potrubí dle norem.",
          image: "/images/railway-utility-conduits-trench.webp",
        },
        {
          title: "Technická šachta – potrubí",
          description: "Osazení a propojení potrubí v kolektorech a šachtách.",
          image: "/images/railway-utility-vault-piping.webp",
        },
        {
          title: "Vodoměrná šachta",
          description: "Kompletace šachet, osazení vodoměrů a uzávěrů.",
          image: "/images/water-meter-pit-assembly.webp",
        },
      ],
    },
    {
      id: "rekonstrukce",
      title: "Rekonstrukce a opravy",
      intro:
        "Výměny starých rozvodů, péče o detaily a uvedení do čistého stavu.",
      items: [
        {
          title: "Měděné rozvody v interiéru",
          description: "Precizní pájení a estetické vedení instalací.",
          image: "/images/interior-renovation-copper-pipes-room.webp",
        },
        {
          title: "Suterén – před/po",
          description:
            "Opravy a úklid potrubních tras v suterénech a chodbách.",
          image: "/images/basement-corridor-piping-before-after.webp",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-full mr-3"></div>
              <span className="text-lg font-medium text-black">
                vojta kostkan
              </span>
              <span className="text-xs text-neutral-500 ml-1">™</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#sluzby"
                className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Služby
              </a>
              <a
                href="#omne"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                O mně
              </a>
              <a
                href="#koupelny"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                Koupelny
              </a>
              <a
                href="#topeni"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                Topení
              </a>
              <a
                href="#kontakt"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                Kontakt
              </a>
              <a
                href="#oblast"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                Oblast
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#kontakt"
                className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
              >
                Poptat
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black hover:text-neutral-600 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-neutral-200 py-6">
              <div className="flex flex-col space-y-4">
                <a
                  href="#sluzby"
                  className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                >
                  Služby
                </a>
                <a
                  href="#omne"
                  className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                >
                  O mně
                </a>
                <a
                  href="#koupelny"
                  className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                >
                  Koupelny
                </a>
                <a
                  href="#topeni"
                  className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                >
                  Topení
                </a>
                <a
                  href="#kontakt"
                  className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                >
                  Kontakt
                </a>
                <a
                  href="#oblast"
                  className="text-black hover:text-neutral-600 transition-colors px-4 py-2 text-sm"
                >
                  Oblast
                </a>
                <a
                  href="#kontakt"
                  className="bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors mx-4 text-center text-sm"
                >
                  Poptat
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Orange Background with Large Typography */}
      <section className="relative min-h-screen bg-orange-500 overflow-hidden">
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[20vw] font-black text-orange-600/20 leading-none select-none">
            KOSTKAN
          </div>
        </div>

        {/* Geometric Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-orange-400/30 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-16 h-16 bg-orange-600/20 rotate-45"></div>

        <div className="relative z-10 pt-32 pb-20 px-6 lg:px-12 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm text-orange-200 mb-8 tracking-wide uppercase font-medium">
                  Potřebujete? Vyřešíme to
                </p>

                <div className="space-y-2">
                  <h1
                    className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight"
                    data-macaly="hero-title"
                  >
                    instalace
                  </h1>
                  <h1 className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight">
                    topení
                  </h1>
                  <h1 className="text-6xl lg:text-8xl font-light text-orange-200 leading-none tracking-tight">
                    koupelny
                  </h1>
                  <h1 className="text-6xl lg:text-8xl font-light text-orange-200/80 leading-none tracking-tight">
                    rozvody vody
                  </h1>
                  <h1 className="text-6xl lg:text-8xl font-light text-orange-300/60 leading-none tracking-tight">
                    rekonstrukce
                  </h1>
                </div>

                <div className="mt-16 flex gap-3">
                  <button
                    className="px-8 py-4 bg-white text-orange-500 text-sm font-bold rounded-full hover:bg-orange-50 transition-colors shadow-lg"
                    onClick={() =>
                      document
                        .getElementById("sluzby")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Prohlédnout služby
                  </button>
                  <a
                    href="#kontakt"
                    className="px-8 py-4 border border-white/70 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    Poptat
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4 ml-auto max-w-xl">
                  {heroImages.slice(0, 4).map((item, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden rounded-lg ${i % 3 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0" />
                      <span className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section grouped into categories (now dark) */}
      <section id="sluzby" className="relative py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-6xl font-black mb-12">Služby</h2>

          {/* Value props moved here */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Kvalita a jistota</h3>
              </div>
              <p className="text-sm text-neutral-300">Práce dle osvědčených postupů, čisté detaily a dlouhá životnost instalací.</p>
            </div>
            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Spolehlivost a termíny</h3>
              </div>
              <p className="text-sm text-neutral-300">Dochvilnost, domluvené termíny a průběžná komunikace bez překvapení.</p>
            </div>
            <div className="border border-white/10 rounded-xl p-6 bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Praktická řešení</h3>
              </div>
              <p className="text-sm text-neutral-300">Návrh řešení na míru, které dává smysl pro provoz i údržbu.</p>
            </div>
          </div>

          <div className="space-y-24">
            {categories.map((cat, idx) => (
              <div key={cat.id} id={cat.id}>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold">{cat.title}</h3>
                    {cat.intro && (
                      <p className="text-neutral-300 mt-2 max-w-2xl">{cat.intro}</p>
                    )}
                  </div>
                  <div className={`hidden md:block h-10 w-10 rounded-full ${idx % 2 === 0 ? 'bg-white/10' : 'bg-white/5'}`}></div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.items.map((item, i) => (
                    <div key={i} className="group bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-neutral-300 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section (orange) */}
      <section id="omne" className="relative py-24 bg-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-56 h-56 border-2 border-white/20 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/20 rotate-45" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black mb-4">O mně</h2>
              <p className="text-orange-50/90 text-lg leading-relaxed mb-6">
                Jsem {OWNER_NAME}. Dělám instalace vody, topení a rekonstrukce koupelen v Praze a okolí. 
                Držím se jednoduchosti, přesnosti a čistého provedení. Vždy vysvětlím možnosti a doporučím 
                řešení, které dává smysl pro váš prostor i rozpočet.
              </p>
              <div className="flex gap-3">
                <a href="#kontakt" className="px-6 py-3 bg-white text-orange-600 rounded-full text-sm font-bold hover:bg-orange-50 transition-colors">Kontakt</a>
                <a href="#sluzby" className="px-6 py-3 border border-white/40 text-white rounded-full text-sm font-bold hover:bg-white/10 transition-colors">Služby</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/vojta-kostkan-elevator-carrying-tools.webp" alt="Vojta Kostkan v terénu" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg translate-y-6">
                <Image src="/images/vojta-kostkan-copper-pipe-brazing-in-ceiling.webp" alt="Vojta Kostkan – pájení mědi" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-light text-black mb-8">
            Kontakt
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wide">
                Telefon
              </h3>
              <a
                href={`tel:${CONTACT_PHONE_E164}`}
                className="text-xl text-black hover:text-neutral-600 transition-colors"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wide">
                WhatsApp
              </h3>
              <a
                href={`https://wa.me/${CONTACT_PHONE_E164.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xl text-black hover:text-neutral-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wide">
                Email
              </h3>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xl text-black hover:text-neutral-600 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wide">
                Oblast
              </h3>
              <p className="text-xl text-black">Praha a okolí</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Gallery Section for additional photos (moved to last) */}
      <section id="galerie" className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-12">
            Galerie
          </h2>
          <p className="text-neutral-600 mb-8 max-w-3xl">
            Ukázky dalších prací a detailů instalací.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Geberit – předstěna', image: '/images/bathroom-inwall-toilet-geberit-rough-in.webp' },
              { title: 'Umývadlo – rozvody', image: '/images/bathroom-sink-plumbing-rough-in.webp' },
              { title: 'Drážky ve zdi – rozvody', image: '/images/bathroom-wall-chase-water-supply-and-drain-rough-in.webp' },
              { title: 'Ohřívač vody s expanzí', image: '/images/hot-water-cylinder-with-expansion-vessel.webp' },
              { title: 'Výměna průmyslových uzávěrů', image: '/images/industrial-gate-valves-replacement-before-after.webp' },
              { title: 'Strojovna – zásobníky a potrubí', image: '/images/mechanical-room-storage-tanks-and-copper-piping.webp' },
              { title: 'Vodoměrná sestava', image: '/images/water-meter-assembly-with-valves.webp' },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-black">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white rounded-full mr-2"></div>
              <span className="text-sm font-medium">vojta kostkan</span>
              <span className="text-xs text-neutral-400 ml-1">™</span>
            </div>

            <div className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} {OWNER_NAME} - Instalatér &
              Topenář
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
