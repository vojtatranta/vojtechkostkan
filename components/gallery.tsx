import Image from "next/image";
import EditableContent from "@/components/editable-content";

type GalleryProps = {
  initialContent?: Record<string, string | undefined>;
};

export default function Gallery({ initialContent = {} }: GalleryProps) {
  return (
    <section id="galerie" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <EditableContent
          id="gallery.title"
          as="h2"
          className="text-4xl lg:text-6xl font-black text-black mb-12"
          placeholder="Galerie"
          initialValue={initialContent["gallery.title"]}
        />
        <EditableContent
          id="gallery.intro"
          as="p"
          className="text-neutral-600 mb-8 max-w-3xl"
          placeholder="Ukázky dalších prací a detailů instalací."
          initialValue={initialContent["gallery.intro"]}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 0 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/bathroom-inwall-toilet-geberit-rough-in.webp"
                alt="Geberit – předstěna"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.0.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Geberit – předstěna"
                initialValue={initialContent["gallery.items.0.title"]}
              />
            </div>
          </div>

          {/* 1 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/bathroom-sink-plumbing-rough-in.webp"
                alt="Umývadlo – rozvody"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.1.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Umývadlo – rozvody"
                initialValue={initialContent["gallery.items.1.title"]}
              />
            </div>
          </div>

          {/* 2 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/bathroom-wall-chase-water-supply-and-drain-rough-in.webp"
                alt="Drážky ve zdi – rozvody"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.2.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Drážky ve zdi – rozvody"
                initialValue={initialContent["gallery.items.2.title"]}
              />
            </div>
          </div>

          {/* 3 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/hot-water-cylinder-with-expansion-vessel.webp"
                alt="Ohřívač vody s expanzí"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.3.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Ohřívač vody s expanzí"
                initialValue={initialContent["gallery.items.3.title"]}
              />
            </div>
          </div>

          {/* 4 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/industrial-gate-valves-replacement-before-after.webp"
                alt="Výměna průmyslových uzávěrů"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.4.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Výměna průmyslových uzávěrů"
                initialValue={initialContent["gallery.items.4.title"]}
              />
            </div>
          </div>

          {/* 5 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/mechanical-room-storage-tanks-and-copper-piping.webp"
                alt="Strojovna – zásobníky a potrubí"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.5.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Strojovna – zásobníky a potrubí"
                initialValue={initialContent["gallery.items.5.title"]}
              />
            </div>
          </div>

          {/* 6 */}
          <div className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/water-meter-assembly-with-valves.webp"
                alt="Vodoměrná sestava"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <EditableContent
                id="gallery.items.6.title"
                as="p"
                className="text-sm font-medium text-black"
                placeholder="Vodoměrná sestava"
                initialValue={initialContent["gallery.items.6.title"]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
