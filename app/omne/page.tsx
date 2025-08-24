import type { Metadata } from 'next'
import Image from 'next/image'
import siteMetadata from '@/app/metadata.json'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, OWNER_NAME } from '@/lib/contact'

export const metadata: Metadata = siteMetadata['/omne']

export default function AboutPage() {
  const photos = [
    { src: '/images/vojta-kostkan-elevator-carrying-tools.webp', alt: 'Vojtěch Kostkan – v terénu s nářadím' },
    { src: '/images/vojta-kostkan-copper-pipe-brazing-in-ceiling.webp', alt: 'Vojtěch Kostkan – pájení mědi' },
    { src: '/images/F2D8B393-67FA-45CE-A278-C9530F951226.webp', alt: 'Strojovna – izolované potrubí' },
    { src: '/images/F7FAE785-2C91-4014-A140-7238811AB8F7.webp', alt: 'Detail armatury' },
  ]

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="relative pt-28 pb-16 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-black text-black mb-6">O mně</h1>
          <p className="text-neutral-700 text-lg leading-relaxed max-w-3xl">
            Jmenuji se {OWNER_NAME}. Pracuji jako instalatér a topenář v Praze a okolí. 
            Zaměřuji se na koupelny, rozvody vody, topení a rekonstrukce. Dbám na čistotu
            provedení, kvalitní materiály a komunikaci od první nabídky až po předání.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((p, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl border border-neutral-200 bg-white ${i === 0 ? 'sm:col-span-2 aspect-[3/2]' : 'aspect-[4/3]'}`}>
              <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-black mb-3">Proč se mnou</h2>
            <ul className="list-disc pl-5 text-neutral-700 space-y-2">
              <li>Precizní práce a pořádek na stavbě</li>
              <li>Konzultace řešení a férová cena</li>
              <li>Spolehlivost, dochvilnost a komunikace</li>
              <li>Pohotovostní zásahy dle domluvy</li>
            </ul>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-black mb-2">Kontakt</h3>
            <p className="text-neutral-700">Telefon: <a className="underline" href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a></p>
            <p className="text-neutral-700">Email: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
            <p className="text-neutral-700">Oblast: Praha a okolí</p>
          </div>
        </div>
      </section>
    </main>
  )
}
