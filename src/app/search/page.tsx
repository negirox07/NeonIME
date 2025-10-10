import { Suspense } from 'react';
import type { Metadata } from 'next';
import type { Anime } from '@/lib/types';
import { AnimeGrid } from '@/components/anime/anime-grid';
import { Skeleton } from '@/components/ui/skeleton';
import RandomAd from '@/components/RandomAd';
import { getAnimeSearch } from '@/services/jikan';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  if (!query) {
    return {
      title: 'Search - NeonIME',
      description: 'Search for your favorite anime on NeonIME.',
    };
  }
  return {
    title: `Search results for "${query}" - NeonIME`,
    description: `Find anime matching "${query}" on NeonIME, your ultimate anime guide.`,
  };
}


async function searchAnime(query: string): Promise<Anime[]> {
  if (!query) return [];
  const response = await getAnimeSearch(query);
  return response?.data ?? [];
}

async function SearchResults({ query }: { query: string }) {
  const animeList = await searchAnime(query);

  return (
    <>
      {animeList.length > 0 ? (
        <AnimeGrid animeList={animeList} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline mb-2">No Results Found</h2>
          <p className="text-muted-foreground">Try searching for something else.</p>
        </div>
      )}
    </>
  );
}

function SearchSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="aspect-[2/3] rounded-lg" />
                    <Skeleton className="h-6 w-3/4 rounded-md mt-4" />
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                </div>
            ))}
        </div>
    );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <section>
      <RandomAd />
      <h1 className="text-3xl font-bold mb-6 font-headline">
        {query ? (
          <>
            Search Results for <span className="text-primary">"{query}"</span>
          </>
        ) : (
          'Search for an Anime'
        )}
      </h1>
      <Suspense fallback={<SearchSkeleton />}>
        {query ? <SearchResults query={query} /> : <p className="text-muted-foreground">Start by typing in the search bar above.</p>}
      </Suspense>
    </section>
  );
}
