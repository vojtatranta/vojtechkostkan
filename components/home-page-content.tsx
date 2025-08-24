import { Wrench, Shield, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/contact-form";
import EditableContent from "@/components/editable-content";
import Gallery from "@/components/gallery";
import HeroImages from "@/components/hero-images";
import ServicesSection from "@/components/services-section";
import MobileNav from "@/components/mobile-nav";
import LangText from "@/components/LangText";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  OWNER_NAME,
} from "@/lib/contact";

type HomePageContentProps = {
  initialContent?: Record<string, string | undefined>;
  initialContentCs?: Record<string, string | undefined>;
  initialContentEn?: Record<string, string | undefined>;
};

export default function HomePageContent({
  initialContent = {},
  initialContentCs,
  initialContentEn,
}: HomePageContentProps) {
  const getByLoc = (id: string) => ({
    cs: initialContentCs?.[id],
    en: initialContentEn?.[id],
  });
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
                <LangText cs="Služby" en="Services" />
              </a>
              <a
                href="#omne"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                <LangText cs="O mně" en="About" />
              </a>
              <a
                href="#koupelny"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                <LangText cs="Koupelny" en="Bathrooms" />
              </a>
              <a
                href="#topeni"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                <LangText cs="Topení" en="Heating" />
              </a>
              <a
                href="#kontakt"
                className="text-neutral-600 hover:text-black transition-colors text-sm"
              >
                <LangText cs="Kontakt" en="Contact" />
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
                <LangText cs="Poptat" en="Request quote" />
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
                  <LangText
                    cs="Potřebujete? Vyřešíme to"
                    en="Need help? We'll handle it"
                  />
                </p>

                <div className="space-y-2">
                  <EditableContent
                    id="hero.title1"
                    as="h1"
                    className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight"
                    placeholder="instalace"
                    placeholderByLocale={{
                      cs: "instalace",
                      en: "installation",
                    }}
                    initialValue={initialContent["hero.title1"]}
                    initialValueByLocale={getByLoc("hero.title1")}
                  />
                  <EditableContent
                    id="hero.title2"
                    as="p"
                    className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight"
                    placeholder="topení"
                    placeholderByLocale={{ cs: "topení", en: "heating" }}
                    initialValue={initialContent["hero.title2"]}
                    initialValueByLocale={getByLoc("hero.title2")}
                  />
                  <EditableContent
                    id="hero.title3"
                    as="p"
                    className="text-6xl lg:text-8xl font-light text-orange-200 leading-none tracking-tight"
                    placeholder="koupelny"
                    placeholderByLocale={{ cs: "koupelny", en: "bathrooms" }}
                    initialValue={initialContent["hero.title3"]}
                    initialValueByLocale={getByLoc("hero.title3")}
                  />
                  <EditableContent
                    id="hero.title4"
                    as="p"
                    className="text-6xl lg:text-8xl font-light text-orange-200/80 leading-none tracking-tight"
                    placeholder="rozvody vody"
                    placeholderByLocale={{
                      cs: "rozvody vody",
                      en: "water distribution",
                    }}
                    initialValue={initialContent["hero.title4"]}
                    initialValueByLocale={getByLoc("hero.title4")}
                  />
                  <EditableContent
                    id="hero.title5"
                    as="p"
                    className="text-6xl lg:text-8xl font-light text-orange-300/60 leading-none tracking-tight"
                    placeholder="rekonstrukce"
                    placeholderByLocale={{
                      cs: "rekonstrukce",
                      en: "renovations",
                    }}
                    initialValue={initialContent["hero.title5"]}
                    initialValueByLocale={getByLoc("hero.title5")}
                  />
                </div>

                <div className="mt-16 flex gap-3">
                  <a
                    href="#sluzby"
                    className="px-8 py-4 bg-white text-orange-500 text-sm font-bold rounded-full hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    <LangText cs="Prohlédnout služby" en="View services" />
                  </a>
                  <a
                    href="#kontakt"
                    className="px-8 py-4 border border-white/70 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    <LangText cs="Poptat" en="Request quote" />
                  </a>
                </div>
              </div>

              <div className="relative">
                <HeroImages
                  initialContent={initialContent}
                  initialContentCs={initialContentCs}
                  initialContentEn={initialContentEn}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (component with editable content) */}
      <ServicesSection
        initialContent={initialContent}
        initialContentCs={initialContentCs}
        initialContentEn={initialContentEn}
      />

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
                placeholderByLocale={{ cs: "O mně", en: "About me" }}
                initialValue={initialContent["about.title"]}
                initialValueByLocale={getByLoc("about.title")}
              />
              <EditableContent
                id="about.lead"
                as="p"
                className="text-orange-50/90 text-lg leading-relaxed mb-6"
                placeholder={`Jsem ${OWNER_NAME}. Dělám instalace vody, topení a rekonstrukce koupelen v Praze a okolí. Držím se jednoduchosti, přesnosti a čistého provedení. Vždy vysvětlím možnosti a doporučím řešení, které dává smysl pro váš prostor i rozpočet.`}
                placeholderByLocale={{
                  cs: `Jsem ${OWNER_NAME}. Dělám instalace vody, topení a rekonstrukce koupelen v Praze a okolí. Držím se jednoduchosti, přesnosti a čistého provedení. Vždy vysvětlím možnosti a doporučím řešení, které dává smysl pro váš prostor i rozpočet.`,
                  en: `I am ${OWNER_NAME}. I do water installation, heating and bathroom renovations in Prague and nearby. I keep things simple, precise and clean. I always explain the options and recommend solutions that make sense for your space and budget.`,
                }}
                initialValue={initialContent["about.lead"]}
                initialValueByLocale={getByLoc("about.lead")}
              />
              <div className="flex gap-3">
                <a
                  href="#kontakt"
                  className="px-6 py-3 bg-white text-orange-600 rounded-full text-sm font-bold hover:bg-orange-50 transition-colors"
                >
                  <LangText cs="Kontakt" en="Contact" />
                </a>
                <a
                  href="#sluzby"
                  className="px-6 py-3 border border-white/40 text-white rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  <LangText cs="Služby" en="Services" />
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
            placeholderByLocale={{ cs: "Kontakt", en: "Contact" }}
            initialValue={initialContent["contact.title"]}
            initialValueByLocale={getByLoc("contact.title")}
          />

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wide">
                <LangText cs="Telefon" en="Phone" />
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
                <LangText cs="Oblast" en="Area" />
              </h3>
              <EditableContent
                id="contact.area"
                as="p"
                className="text-xl text-black"
                placeholder="Praha a okolí"
                placeholderByLocale={{
                  cs: "Praha a okolí",
                  en: "Prague and nearby",
                }}
                initialValue={initialContent["contact.area"]}
                initialValueByLocale={getByLoc("contact.area")}
              />
            </div>
          </div>

          <ContactForm
            initialContent={initialContent}
            initialContentCs={initialContentCs}
            initialContentEn={initialContentEn}
          />
        </div>
      </section>

      {/* Gallery Section (server component with editable captions) */}
      <Gallery
        initialContent={initialContent}
        initialContentCs={initialContentCs}
        initialContentEn={initialContentEn}
      />

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
                placeholderByLocale={{ cs: "Spolupráce", en: "Cooperation" }}
                initialValue={initialContent["coop.title"]}
                initialValueByLocale={getByLoc("coop.title")}
              />
              <EditableContent
                id="coop.lead"
                as="p"
                className="text-neutral-700 text-lg leading-relaxed mb-6"
                placeholder={
                  "Podle potřeby pracuji v tandemu s kolegou Járou Kroupou (také instalatér a topenář). Na zakázkách tak umíme zajistit větší kapacitu a plynulý průběh prací – od koupelen přes rozvody vody až po topení – abyste vše vyřešili na jeden zátah a bez zbytečných prodlev."
                }
                placeholderByLocale={{
                  cs: "Podle potřeby pracuji v tandemu s kolegou Járou Kroupou (také instalatér a topenář). Na zakázkách tak umíme zajistit větší kapacitu a plynulý průběh prací – od koupelen přes rozvody vody až po topení – abyste vše vyřešili na jeden zátah a bez zbytečných prodlev.",
                  en: "When needed, I work in tandem with my colleague Jára Kroupa (also a plumber and heating specialist). This lets us provide more capacity and a smooth workflow on projects — from bathrooms to water distribution to heating — so you can get everything done in one go without unnecessary delays.",
                }}
                initialValue={initialContent["coop.lead"]}
                initialValueByLocale={getByLoc("coop.lead")}
              />
              <div className="flex gap-3">
                <a
                  href="https://www.jarakroupa.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-neutral-800 transition-colors"
                >
                  <LangText cs="Web Járy Kroupy" en="Jára Kroupa website" />
                </a>
                <a
                  href="#kontakt"
                  className="px-6 py-3 border border-black/10 text-black rounded-full text-sm font-bold hover:bg-black/5 transition-colors"
                >
                  <LangText
                    cs="Domluvit společnou realizaci"
                    en="Arrange a joint project"
                  />
                </a>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <EditableContent
                    id={`coop.cards.0.title`}
                    as="h3"
                    className="text-sm font-semibold text-neutral-800"
                    placeholder="Voda & Topení"
                    placeholderByLocale={{
                      cs: "Voda & Topení",
                      en: "Water & Heating",
                    }}
                    initialValue={initialContent[`coop.cards.0.title`]}
                    initialValueByLocale={getByLoc(`coop.cards.0.title`)}
                  />
                  <EditableContent
                    id={`coop.cards.0.desc`}
                    as="p"
                    className="text-sm text-neutral-600 mt-1"
                    placeholder="Instalace, rozvody, rekonstrukce"
                    placeholderByLocale={{
                      cs: "Instalace, rozvody, rekonstrukce",
                      en: "Installation, distribution, renovations",
                    }}
                    initialValue={initialContent[`coop.cards.0.desc`]}
                    initialValueByLocale={getByLoc(`coop.cards.0.desc`)}
                  />
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <EditableContent
                    id={`coop.cards.1.title`}
                    as="h3"
                    className="text-sm font-semibold text-neutral-800"
                    placeholder="Dvojice řemeslníků"
                    placeholderByLocale={{
                      cs: "Dvojice řemeslníků",
                      en: "Two tradesmen",
                    }}
                    initialValue={initialContent[`coop.cards.1.title`]}
                    initialValueByLocale={getByLoc(`coop.cards.1.title`)}
                  />
                  <EditableContent
                    id={`coop.cards.1.desc`}
                    as="p"
                    className="text-sm text-neutral-600 mt-1"
                    placeholder="Dvě zkušené ruce navíc, rychlejší průběh"
                    placeholderByLocale={{
                      cs: "Dvě zkušené ruce navíc, rychlejší průběh",
                      en: "An extra pair of skilled hands, faster progress",
                    }}
                    initialValue={initialContent[`coop.cards.1.desc`]}
                    initialValueByLocale={getByLoc(`coop.cards.1.desc`)}
                  />
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <EditableContent
                    id={`coop.cards.2.title`}
                    as="h3"
                    className="text-sm font-semibold text-neutral-800"
                    placeholder="Koordinace profesí"
                    placeholderByLocale={{
                      cs: "Koordinace profesí",
                      en: "Coordination of trades",
                    }}
                    initialValue={initialContent[`coop.cards.2.title`]}
                    initialValueByLocale={getByLoc(`coop.cards.2.title`)}
                  />
                  <EditableContent
                    id={`coop.cards.2.desc`}
                    as="p"
                    className="text-sm text-neutral-600 mt-1"
                    placeholder="Jedna domluva, plynulý průběh prací"
                    placeholderByLocale={{
                      cs: "Jedna domluva, plynulý průběh prací",
                      en: "One agreement, smooth workflow",
                    }}
                    initialValue={initialContent[`coop.cards.2.desc`]}
                    initialValueByLocale={getByLoc(`coop.cards.2.desc`)}
                  />
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 bg-white">
                  <EditableContent
                    id={`coop.cards.3.title`}
                    as="h3"
                    className="text-sm font-semibold text-neutral-800"
                    placeholder="Termíny"
                    placeholderByLocale={{ cs: "Termíny", en: "Timelines" }}
                    initialValue={initialContent[`coop.cards.3.title`]}
                    initialValueByLocale={getByLoc(`coop.cards.3.title`)}
                  />
                  <EditableContent
                    id={`coop.cards.3.desc`}
                    as="p"
                    className="text-sm text-neutral-600 mt-1"
                    placeholder="Minimální čekání mezi etapami"
                    placeholderByLocale={{
                      cs: "Minimální čekání mezi etapami",
                      en: "Minimal waiting between stages",
                    }}
                    initialValue={initialContent[`coop.cards.3.desc`]}
                    initialValueByLocale={getByLoc(`coop.cards.3.desc`)}
                  />
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
