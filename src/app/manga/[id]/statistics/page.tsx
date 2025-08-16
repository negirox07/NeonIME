import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BarChart as BarChartIcon, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Manga, MangaStatistics } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatisticsChart } from '@/components/anime/statistics-chart';

interface StatisticsPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch manga ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Manga> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching manga ${id}:`, error);
      return null;
    }
  }

async function getMangaStatistics(id: string): Promise<MangaStatistics | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/statistics`);
    if (!res.ok) {
      console.error(`Failed to fetch statistics for ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<MangaStatistics> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching statistics for ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: StatisticsPageProps['params'] }): Promise<Metadata> {
    const manga = await getMangaDetails(params.id);
    if (!manga) {
      return { title: 'Statistics not found' };
    }
    return {
      title: `Statistics for ${manga.title_english || manga.title} - NeonIME`,
      description: `View rating statistics for ${manga.title_english || manga.title}.`,
    };
}

export default async function StatisticsPage({ params }: StatisticsPageProps) {
  const manga = await getMangaDetails(params.id);
  const statistics = await getMangaStatistics(params.id);

  if (!manga) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <BarChartIcon />
                Statistics for {manga.title_english || manga.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/manga/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Manga
                </Link>
            </Button>
        </div>
      {statistics ? (
        <StatisticsChart statistics={statistics} />
      ) : (
        <p>No statistics found for this manga.</p>
      )}
    </section>
  );
}
