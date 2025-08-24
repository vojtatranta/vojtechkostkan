import { Wrench, Shield, Clock } from "lucide-react";
import Image from "next/image";
import EditableContent from "@/components/editable-content";

type ServicesSectionProps = {
  initialContent?: Record<string, string | undefined>;
  initialContentCs?: Record<string, string | undefined>;
  initialContentEn?: Record<string, string | undefined>;
};

export default function ServicesSection({ initialContent = {}, initialContentCs, initialContentEn }: ServicesSectionProps) {
  const getByLoc = (id: string) => ({
    cs: initialContentCs?.[id],
    en: initialContentEn?.[id],
  });
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
      intro: "Dodávka a montáž radiátorů, rozvody v podlahách a vyvážení okruhů.",
      items: [
        {
          title: "Radiátor pod oknem",
          description: "Montáž radiátorů, ventily, termohlavice a odvzdušnění.",
          image: "/images/radiator-under-window.webp",
        },
        {
          title: "Rozdělovač vytápění",
          description: "Zapojení rozdělovačů podlahového topení a radiátorových okruhů.",
          image: "/images/mechanical-room-heating-manifold.webp",
        },
        {
          title: "Rozvody v podlaze",
          description: "Fixace a příprava rozvodů pro zalití, kontrola tras a dilatací.",
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
          description: "Montáž a napojení technologií v kotelnách a strojovnách.",
          image: "/images/mechanical-room-robatherm-unit.webp",
        },
        {
          title: "Domácí vodárna – expanze",
          description: "Instalace expanzních nádob a čerpadel pro stabilní tlak.",
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
      intro: "Výměny starých rozvodů, péče o detaily a uvedení do čistého stavu.",
      items: [
        {
          title: "Měděné rozvody v interiéru",
          description: "Precizní pájení a estetické vedení instalací.",
          image: "/images/interior-renovation-copper-pipes-room.webp",
        },
        {
          title: "Suterén – před/po",
          description: "Opravy a úklid potrubních tras v suterénech a chodbách.",
          image: "/images/basement-corridor-piping-before-after.webp",
        },
      ],
    },
  ];

  return (
    <section id="sluzby" className="relative py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <EditableContent
          id="services.title"
          as="h2"
          className="text-4xl lg:text-6xl font-black mb-12"
          placeholder="Služby"
          placeholderByLocale={{ cs: "Služby", en: "Services" }}
          initialValue={initialContent["services.title"]}
          initialValueByLocale={getByLoc("services.title")}
        />

        {/* Value props */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5" />
              <EditableContent
                id={`services.values.quality.title`}
                as="h3"
                className="text-lg font-semibold"
                placeholder="Kvalita a jistota"
                placeholderByLocale={{ cs: "Kvalita a jistota", en: "Quality and assurance" }}
                initialValue={initialContent[`services.values.quality.title`]}
                initialValueByLocale={getByLoc(`services.values.quality.title`)}
              />
            </div>
            <EditableContent
              id={`services.values.quality.desc`}
              as="p"
              className="text-sm text-neutral-300"
              placeholder="Práce dle osvědčených postupů, čisté detaily a dlouhá životnost instalací."
              placeholderByLocale={{ cs: "Práce dle osvědčených postupů, čisté detaily a dlouhá životnost instalací.", en: "Work using proven methods, clean details, and long-lasting installations." }}
              initialValue={initialContent[`services.values.quality.desc`]}
              initialValueByLocale={getByLoc(`services.values.quality.desc`)}
            />
          </div>
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5" />
              <EditableContent
                id={`services.values.reliability.title`}
                as="h3"
                className="text-lg font-semibold"
                placeholder="Spolehlivost a termíny"
                placeholderByLocale={{ cs: "Spolehlivost a termíny", en: "Reliability and timelines" }}
                initialValue={initialContent[`services.values.reliability.title`]}
                initialValueByLocale={getByLoc(`services.values.reliability.title`)}
              />
            </div>
            <EditableContent
              id={`services.values.reliability.desc`}
              as="p"
              className="text-sm text-neutral-300"
              placeholder="Dochvilnost, domluvené termíny a průběžná komunikace bez překvapení."
              placeholderByLocale={{ cs: "Dochvilnost, domluvené termíny a průběžná komunikace bez překvapení.", en: "Punctuality, agreed deadlines, and ongoing communication without surprises." }}
              initialValue={initialContent[`services.values.reliability.desc`]}
              initialValueByLocale={getByLoc(`services.values.reliability.desc`)}
            />
          </div>
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Wrench className="w-5 h-5" />
              <EditableContent
                id={`services.values.practical.title`}
                as="h3"
                className="text-lg font-semibold"
                placeholder="Praktická řešení"
                placeholderByLocale={{ cs: "Praktická řešení", en: "Practical solutions" }}
                initialValue={initialContent[`services.values.practical.title`]}
                initialValueByLocale={getByLoc(`services.values.practical.title`)}
              />
            </div>
            <EditableContent
              id={`services.values.practical.desc`}
              as="p"
              className="text-sm text-neutral-300"
              placeholder="Návrh řešení na míru, které dává smysl pro provoz i údržbu."
              placeholderByLocale={{ cs: "Návrh řešení na míru, které dává smysl pro provoz i údržbu.", en: "Tailored solutions that make sense for operation and maintenance." }}
              initialValue={initialContent[`services.values.practical.desc`]}
              initialValueByLocale={getByLoc(`services.values.practical.desc`)}
            />
          </div>
        </div>

        <div className="space-y-24">
          {categories.map((cat, idx) => (
            <div key={cat.id} id={cat.id}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <EditableContent
                    id={`services.${cat.id}.title`}
                    as="h3"
                    className="text-3xl lg:text-4xl font-bold"
                    placeholder={cat.title}
                    placeholderByLocale={{
                      cs: cat.title,
                      en:
                        cat.id === "koupelny"
                          ? "Bathrooms and sanitary installations"
                          : cat.id === "topeni"
                          ? "Heating and radiators"
                          : cat.id === "technologie"
                          ? "Technology and plant rooms"
                          : cat.id === "site"
                          ? "Exterior and utility networks"
                          : cat.id === "rekonstrukce"
                          ? "Renovations and repairs"
                          : cat.title,
                    }}
                    initialValue={initialContent[`services.${cat.id}.title`]}
                    initialValueByLocale={getByLoc(`services.${cat.id}.title`)}
                  />
                  {cat.intro && (
                    <EditableContent
                      id={`services.${cat.id}.intro`}
                      as="p"
                      className="text-neutral-300 mt-2 max-w-2xl"
                      placeholder={cat.intro}
                      placeholderByLocale={{
                        cs: cat.intro,
                        en:
                          cat.id === "koupelny"
                            ? "Complete piping, fixture installation, and precise slopes for trouble‑free operation."
                            : cat.id === "topeni"
                            ? "Supply and installation of radiators, floor piping, and circuit balancing."
                            : cat.id === "technologie"
                            ? "Installation and service of technological units for stable, safe operation."
                            : cat.id === "site"
                            ? "Laying and connecting pipelines outside buildings, including vaults and protective elements."
                            : cat.id === "rekonstrukce"
                            ? "Replacement of old piping, attention to detail, and clean finishing."
                            : cat.intro,
                      }}
                      initialValue={initialContent[`services.${cat.id}.intro`]}
                      initialValueByLocale={getByLoc(`services.${cat.id}.intro`)}
                    />
                  )}
                </div>
                <div className={`hidden md:block h-10 w-10 rounded-full ${idx % 2 === 0 ? "bg-white/10" : "bg-white/5"}`}></div>
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
                      <EditableContent
                        id={`services.${cat.id}.items.${i}.title`}
                        as="h3"
                        className="text-lg font-semibold text-white"
                        placeholder={item.title}
                        placeholderByLocale={{
                          cs: item.title,
                          en:
                            item.title === "Rozvody koupelny"
                              ? "Bathroom rough‑in"
                              : item.title === "Sprchový žlab – rozvody"
                              ? "Linear shower drain rough‑in"
                              : item.title === "Přívody vody – rozvody"
                              ? "Water supply rough‑in"
                              : item.title === "Montáž WC"
                              ? "Toilet installation"
                              : item.title === "Radiátor pod oknem"
                              ? "Radiator under window"
                              : item.title === "Rozdělovač vytápění"
                              ? "Heating manifold"
                              : item.title === "Rozvody v podlaze"
                              ? "In‑floor piping"
                              : item.title === "Vzduchotechnická jednotka"
                              ? "Air handling unit"
                              : item.title === "Domácí vodárna – expanze"
                              ? "Domestic water booster – expansion"
                              : item.title === "Výkop a uložení potrubí"
                              ? "Trenching and pipe laying"
                              : item.title === "Technická šachta – potrubí"
                              ? "Utility vault – piping"
                              : item.title === "Vodoměrná šachta"
                              ? "Water meter pit"
                              : item.title === "Měděné rozvody v interiéru"
                              ? "Copper piping in interiors"
                              : item.title === "Suterén – před/po"
                              ? "Basement – before/after"
                              : item.title,
                        }}
                        initialValue={initialContent[`services.${cat.id}.items.${i}.title`]}
                        initialValueByLocale={getByLoc(`services.${cat.id}.items.${i}.title`)}
                      />
                      <EditableContent
                        id={`services.${cat.id}.items.${i}.description`}
                        as="p"
                        className="text-sm text-neutral-300 mt-1"
                        placeholder={item.description}
                        placeholderByLocale={{
                          cs: item.description,
                          en:
                            item.description === "Vedení odpadů a vody pro koupelny v novostavbách i rekonstrukcích."
                              ? "Routing of drains and water for bathrooms in new builds and renovations."
                              : item.description === "Instalace lineárních žlabů a správné napojení na sifon."
                              ? "Installing linear drains and connecting correctly to the trap."
                              : item.description === "Distribuce studené a teplé vody včetně uzlů a uzávěrů."
                              ? "Cold and hot water distribution including nodes and shut‑offs."
                              : item.description === "Montáž závěsných i stojících toalet a tlaková zkouška."
                              ? "Installation of wall‑hung and floor‑standing toilets and pressure testing."
                              : item.description === "Montáž radiátorů, ventily, termohlavice a odvzdušnění."
                              ? "Radiator installation, valves, thermostatic heads, and bleeding."
                              : item.description === "Zapojení rozdělovačů podlahového topení a radiátorových okruhů."
                              ? "Connecting floor heating manifolds and radiator circuits."
                              : item.description === "Fixace a příprava rozvodů pro zalití, kontrola tras a dilatací."
                              ? "Fixing and preparing piping for pouring, checking routes and expansion joints."
                              : item.description === "Montáž a napojení technologií v kotelnách a strojovnách."
                              ? "Installing and connecting technologies in boiler rooms and plant rooms."
                              : item.description === "Instalace expanzních nádob a čerpadel pro stabilní tlak."
                              ? "Installing expansion vessels and pumps for stable pressure."
                              : item.description === "Rýhy, pískové lože a ochrana potrubí dle norem."
                              ? "Trenches, sand bedding, and pipe protection to standards."
                              : item.description === "Osazení a propojení potrubí v kolektorech a šachtách."
                              ? "Fitting and connecting pipes in ducts and vaults."
                              : item.description === "Kompletace šachet, osazení vodoměrů a uzávěrů."
                              ? "Completing pits, fitting water meters and shut‑off valves."
                              : item.description === "Precizní pájení a estetické vedení instalací."
                              ? "Precise soldering and aesthetic routing of installations."
                              : item.description === "Opravy a úklid potrubních tras v suterénech a chodbách."
                              ? "Repairs and cleanup of piping routes in basements and corridors."
                              : item.description,
                        }}
                        initialValue={initialContent[`services.${cat.id}.items.${i}.description`]}
                        initialValueByLocale={getByLoc(`services.${cat.id}.items.${i}.description`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
