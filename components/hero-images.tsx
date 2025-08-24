import Image from "next/image";
import EditableContent from "@/components/editable-content";

type HeroImagesProps = {
  initialContent?: Record<string, string | undefined>;
  initialContentCs?: Record<string, string | undefined>;
  initialContentEn?: Record<string, string | undefined>;
};

export default function HeroImages({ initialContent = {}, initialContentCs, initialContentEn }: HeroImagesProps) {
  const byLoc = (id: string) => ({ cs: initialContentCs?.[id], en: initialContentEn?.[id] });
  const items = [
    { title: "Rozdělovač vytápění", image: "/images/mechanical-room-heating-manifold.webp", en: "Heating manifold" },
    { title: "Rozvody vody", image: "/images/bathroom-water-supply-rough-in.webp", en: "Water distribution" },
    { title: "Topení", image: "/images/radiator-under-window.webp", en: "Heating" },
    { title: "Rekonstrukce", image: "/images/interior-renovation-copper-pipes-room.webp", en: "Renovations" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 ml-auto max-w-xl">
      {items.map((item, i) => (
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
          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            <EditableContent
              id={`hero.images.${i}.title`}
              as="span"
              className="align-middle"
              placeholder={item.title}
              placeholderByLocale={{ cs: item.title, en: item.en ?? item.title }}
              initialValue={initialContent[`hero.images.${i}.title`]}
              initialValueByLocale={byLoc(`hero.images.${i}.title`)}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
