import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import HomePageContent from '@/components/home-page-content';

// Export metadata from the server component
export const metadata: Metadata = siteMetadata['/'];

// This is the page shell. It just renders the client component.
export default function HomePage() {
  return <HomePageContent />;
}
