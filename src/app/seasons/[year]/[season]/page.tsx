import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import type { Anime } from '@/lib/types';
import { AnimeGrid } from '@/components/anime/anime-grid';
import { Skeleton } from '@/components/ui/skeleton';
import RandomAd from '@/components/RandomAd';
import { getSeason as getSeasonAnimeData } from '@/services/jikan';

interface SeasonPageProps {
  params: {
    year: string;
    season: string;
  };
}

async function getSeasonAnime(year: string, season: string): Promise<Anime[]> {
    const response = await getSeasonAnimeData(year, season);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: { params: SeasonPageProps['params'] }): Promise<Metadata> {
  const { year, season } = params;
  const capitalizedSeason = season.charAt(0).toUpperCase() + season.slice(1);
  return {
    title: `${capitalizedSeason} ${year} Anime - NeonIME`,
    description: `Discover anime from the ${capitalizedSeason} ${year} season.`,
  };
}

function SearchSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-[2/3] rounded-lg" />
                    <Skeleton className="h-6 w-3/4 rounded-md mt-4" />
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                </div>
            ))}
        </div>
    );
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { year, season } = params;
  const animeList = await getSeasonAnime(year, season);

  if (!animeList) {
    notFound();
  }
  
  const capitalizedSeason = season.charAt(0).toUpperCase() + season.slice(1);

  return (
    <section>
      <RandomAd />
      <h1 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2 capitalize">
        <Calendar />
        {capitalizedSeason} {year} Season
      </h1>
       <Suspense fallback={<SearchSkeleton />}>
        {animeList.length > 0 ? (
          <AnimeGrid animeList={animeList} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-headline mb-2">No Anime Found</h2>
            <p className="text-muted-foreground">
              There might not be any data for the {capitalizedSeason} {year} season, or it might be too far in the future.
            </p>
          </div>
        )}
      </Suspense>
    </section>
  );
}
