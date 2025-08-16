import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BarChart as BarChartIcon, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, AnimeStatistics } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatisticsChart } from '@/components/anime/statistics-chart';

interface StatisticsPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch anime ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Anime> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching anime ${id}:`, error);
      return null;
    }
  }

async function getAnimeStatistics(id: string): Promise<AnimeStatistics | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/statistics`);
    if (!res.ok) {
      console.error(`Failed to fetch statistics for ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<AnimeStatistics> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching statistics for ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: StatisticsPageProps['params'] }): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Statistics not found' };
    }
    return {
      title: `Statistics for ${anime.title_english || anime.title} - NeonIME`,
      description: `View rating statistics for ${anime.title_english || anime.title}.`,
    };
}

export default async function StatisticsPage({ params }: StatisticsPageProps) {
  const anime = await getAnimeDetails(params.id);
  const statistics = await getAnimeStatistics(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <BarChartIcon />
                Statistics for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {statistics ? (
        <StatisticsChart statistics={statistics} />
      ) : (
        <p>No statistics found for this anime.</p>
      )}
    </section>
  );
}
