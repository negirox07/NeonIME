import { Suspense } from 'react';
import type { JikanAPIResponse, Anime } from '@/lib/types';
import { AnimeGrid } from '@/components/anime/anime-grid';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

async function searchAnime(query: string): Promise<Anime[]> {
  if (!query) return [];
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&sfw`);
    if (!res.ok) {
      console.error('Failed to fetch search results:', res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Anime[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
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
