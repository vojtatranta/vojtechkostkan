import { Wrench, Shield, Clock } from "lucide-react";
import Image from "next/image";
import EditableContent from "@/components/editable-content";

type ServicesSectionProps = {
  initialContent?: Record<string, string | undefined>;
};

export default function ServicesSection({ initialContent = {} }: ServicesSectionProps) {
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
          initialValue={initialContent["services.title"]}
        />

        {/* Value props */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Kvalita a jistota</h3>
            </div>
            <p className="text-sm text-neutral-300">
              Práce dle osvědčených postupů, čisté detaily a dlouhá životnost instalací.
            </p>
          </div>
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Spolehlivost a termíny</h3>
            </div>
            <p className="text-sm text-neutral-300">
              Dochvilnost, domluvené termíny a průběžná komunikace bez překvapení.
            </p>
          </div>
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Wrench className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Praktická řešení</h3>
            </div>
            <p className="text-sm text-neutral-300">
              Návrh řešení na míru, které dává smysl pro provoz i údržbu.
            </p>
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
                    initialValue={initialContent[`services.${cat.id}.title`]}
                  />
                  {cat.intro && (
                    <EditableContent
                      id={`services.${cat.id}.intro`}
                      as="p"
                      className="text-neutral-300 mt-2 max-w-2xl"
                      placeholder={cat.intro}
                      initialValue={initialContent[`services.${cat.id}.intro`]}
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
                        initialValue={initialContent[`services.${cat.id}.items.${i}.title`]}
                      />
                      <EditableContent
                        id={`services.${cat.id}.items.${i}.description`}
                        as="p"
                        className="text-sm text-neutral-300 mt-1"
                        placeholder={item.description}
                        initialValue={initialContent[`services.${cat.id}.items.${i}.description`]}
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
