import { Wrench, Shield, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/contact-form";
import EditableContent from "@/components/editable-content";
import Gallery from "@/components/gallery";
import HeroImages from "@/components/hero-images";
import ServicesSection from "@/components/services-section";
import MobileNav from "@/components/mobile-nav";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  OWNER_NAME,
} from "@/lib/contact";

type HomePageContentProps = {
  initialContent?: Record<string, string | undefined>;
};

export default function HomePageContent({
  initialContent = {},
}: HomePageContentProps) {
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
                Vojtěch Kostkan
              </span>
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
              {/* <a
                href="#oblast"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                Oblast
              </a> */}
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

            {/* Mobile Menu Button + Drawer (client island) */}
            <MobileNav />
          </div>

          {/* Mobile Menu is rendered inside MobileNav */}
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
                  <EditableContent
                    id="hero.title1"
                    as="h1"
                    className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight"
                    placeholder="instalace"
                    initialValue={initialContent["hero.title1"]}
                  />
                  <EditableContent
                    id="hero.title2"
                    as="h1"
                    className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight"
                    placeholder="topení"
                    initialValue={initialContent["hero.title2"]}
                  />
                  <EditableContent
                    id="hero.title3"
                    as="h1"
                    className="text-6xl lg:text-8xl font-light text-orange-200 leading-none tracking-tight"
                    placeholder="koupelny"
                    initialValue={initialContent["hero.title3"]}
                  />
                  <EditableContent
                    id="hero.title4"
                    as="h1"
                    className="text-6xl lg:text-8xl font-light text-orange-200/80 leading-none tracking-tight"
                    placeholder="rozvody vody"
                    initialValue={initialContent["hero.title4"]}
                  />
                  <EditableContent
                    id="hero.title5"
                    as="h1"
                    className="text-6xl lg:text-8xl font-light text-orange-300/60 leading-none tracking-tight"
                    placeholder="rekonstrukce"
                    initialValue={initialContent["hero.title5"]}
                  />
                </div>

                <div className="mt-16 flex gap-3">
                  <a
                    href="#sluzby"
                    className="px-8 py-4 bg-white text-orange-500 text-sm font-bold rounded-full hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    Prohlédnout služby
                  </a>
                  <a
                    href="#kontakt"
                    className="px-8 py-4 border border-white/70 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    Poptat
                  </a>
                </div>
              </div>

              <div className="relative">
                <HeroImages initialContent={initialContent} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (component with editable content) */}
      <ServicesSection initialContent={initialContent} />

      {/* About Me Section (orange) */}
      <section
        id="omne"
        className="relative py-24 bg-orange-500 text-white overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-56 h-56 border-2 border-white/20 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/20 rotate-45" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableContent
                id="about.title"
                as="h2"
                className="text-4xl lg:text-6xl font-black mb-4"
                placeholder="O mně"
                initialValue={initialContent["about.title"]}
              />
              <EditableContent
                id="about.lead"
                as="p"
                className="text-orange-50/90 text-lg leading-relaxed mb-6"
                placeholder={`Jsem ${OWNER_NAME}. Dělám instalace vody, topení a rekonstrukce koupelen v Praze a okolí. Držím se jednoduchosti, přesnosti a čistého provedení. Vždy vysvětlím možnosti a doporučím řešení, které dává smysl pro váš prostor i rozpočet.`}
                initialValue={initialContent["about.lead"]}
              />
              <div className="flex gap-3">
                <a
                  href="#kontakt"
                  className="px-6 py-3 bg-white text-orange-600 rounded-full text-sm font-bold hover:bg-orange-50 transition-colors"
                >
                  Kontakt
                </a>
                <a
                  href="#sluzby"
                  className="px-6 py-3 border border-white/40 text-white rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  Služby
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/vojta-kostkan-elevator-carrying-tools.webp"
                  alt="Vojtěch Kostkan v terénu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg translate-y-6">
                <Image
                  src="/images/vojta-kostkan-copper-pipe-brazing-in-ceiling.webp"
                  alt="Vojtěch Kostkan – pájení mědi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <EditableContent
            id="contact.title"
            as="h2"
            className="text-4xl lg:text-6xl font-light text-black mb-8"
            placeholder="Kontakt"
            initialValue={initialContent["contact.title"]}
          />

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
                href={`https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`}
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
              <EditableContent
                id="contact.area"
                as="p"
                className="text-xl text-black"
                placeholder="Praha a okolí"
                initialValue={initialContent["contact.area"]}
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Gallery Section (server component with editable captions) */}
      <Gallery initialContent={initialContent} />

      {/* Cooperation Section */}
      <section id="spoluprace" className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableContent
                id="coop.title"
                as="h2"
                className="text-4xl lg:text-6xl font-black text-black mb-4"
                placeholder="Spolupráce"
                initialValue={initialContent["coop.title"]}
              />
              <EditableContent
                id="coop.lead"
                as="p"
                className="text-neutral-700 text-lg leading-relaxed mb-6"
                placeholder={
                  "Podle potřeby pracuji v tandemu s kolegou Járou Kroupou (také instalatér a topenář). Na zakázkách tak umíme zajistit větší kapacitu a plynulý průběh prací – od koupelen přes rozvody vody až po topení – abyste vše vyřešili na jeden zátah a bez zbytečných prodlev."
                }
                initialValue={initialContent["coop.lead"]}
              />
              <div className="flex gap-3">
                <a
                  href="https://www.jarakroupa.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-neutral-800 transition-colors"
                >
                  Web Járy Kroupy
                </a>
                <a
                  href="#kontakt"
                  className="px-6 py-3 border border-black/10 text-black rounded-full text-sm font-bold hover:bg-black/5 transition-colors"
                >
                  Domluvit společnou realizaci
                </a>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <h3 className="text-sm font-semibold text-neutral-800">
                    Voda & Topení
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    Instalace, rozvody, rekonstrukce
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <h3 className="text-sm font-semibold text-neutral-800">
                    Dvojice řemeslníků
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    Dvě zkušené ruce navíc, rychlejší průběh
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <h3 className="text-sm font-semibold text-neutral-800">
                    Koordinace profesí
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    Jedna domluva, plynulý průběh prací
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <h3 className="text-sm font-semibold text-neutral-800">
                    Termíny
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    Minimální čekání mezi etapami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white rounded-full mr-2"></div>
              <span className="text-sm font-medium">Vojtěch Kostkan</span>
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
