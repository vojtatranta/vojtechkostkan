import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import HomePageContent from '@/components/home-page-content';
import { kv } from '@vercel/kv';

// Export metadata from the server component
export const metadata: Metadata = siteMetadata['/'];

// Always render fresh content
export const revalidate = 0;

export default async function HomePage() {
  const keys = [
    'hero.title1',
    'hero.title2',
    'hero.title3',
    'hero.title4',
    'hero.title5',
    // Hero images captions
    'hero.images.0.title',
    'hero.images.1.title',
    'hero.images.2.title',
    'hero.images.3.title',
    'services.title',
    'about.title',
    'about.lead',
    'contact.title',
    'contact.area',
    'coop.title',
    'coop.lead',
    // Services categories
    'services.koupelny.title',
    'services.koupelny.intro',
    'services.topeni.title',
    'services.topeni.intro',
    'services.technologie.title',
    'services.technologie.intro',
    'services.site.title',
    'services.site.intro',
    'services.rekonstrukce.title',
    'services.rekonstrukce.intro',
    // Services items (title/description)
    'services.koupelny.items.0.title',
    'services.koupelny.items.0.description',
    'services.koupelny.items.1.title',
    'services.koupelny.items.1.description',
    'services.koupelny.items.2.title',
    'services.koupelny.items.2.description',
    'services.koupelny.items.3.title',
    'services.koupelny.items.3.description',
    'services.topeni.items.0.title',
    'services.topeni.items.0.description',
    'services.topeni.items.1.title',
    'services.topeni.items.1.description',
    'services.topeni.items.2.title',
    'services.topeni.items.2.description',
    'services.technologie.items.0.title',
    'services.technologie.items.0.description',
    'services.technologie.items.1.title',
    'services.technologie.items.1.description',
    'services.site.items.0.title',
    'services.site.items.0.description',
    'services.site.items.1.title',
    'services.site.items.1.description',
    'services.site.items.2.title',
    'services.site.items.2.description',
    'services.rekonstrukce.items.0.title',
    'services.rekonstrukce.items.0.description',
    'services.rekonstrukce.items.1.title',
    'services.rekonstrukce.items.1.description',
    // Gallery
    'gallery.title',
    'gallery.intro',
    'gallery.items.0.title',
    'gallery.items.1.title',
    'gallery.items.2.title',
    'gallery.items.3.title',
    'gallery.items.4.title',
    'gallery.items.5.title',
    'gallery.items.6.title',
  ];
  const kvKeys = keys.map(k => `content:${k}`);

  let initialContent: Record<string, string | undefined> = {};
  try {
    const res = await kv.mget(...kvKeys);
    const values: (string | null)[] = Array.isArray(res) ? (res as (string | null)[]) : [];
    initialContent = keys.reduce<Record<string, string | undefined>>((acc, key, i) => {
      const v = values[i] ?? null;
      if (v != null) acc[key] = v;
      return acc;
    }, {});
  } catch {
    // KV not configured or unreachable; render with placeholders
    initialContent = {};
  }

  return <HomePageContent initialContent={initialContent} />;
}
