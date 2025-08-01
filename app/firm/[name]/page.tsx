import { getFirmByName, getFirmSlugs, getFirmNameFromSlugHelper } from '../../../utils/firmData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FirmDisplay from '../../../components/FirmDisplay';

interface FirmPageProps {
  params: Promise<{
    name: string;
  }>;
}

// Generate static paths for all firms using slugs
export async function generateStaticParams() {
  const firmSlugs = getFirmSlugs();
  return firmSlugs.map((slug) => ({
    name: slug,
  }));
}

export default async function FirmPage({ params }: FirmPageProps) {
  const slug = (await params).name;
  const firmName = getFirmNameFromSlugHelper(slug);
  
  if (!firmName) {
    notFound();
  }
  
  const firm = getFirmByName(firmName);

  if (!firm) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Back to firms link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-accent-primary hover:text-accent-secondary transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Firms
        </Link>
      </div>

      {/* Firm Display */}
      <FirmDisplay firm={firm} />
    </div>
  );
} 