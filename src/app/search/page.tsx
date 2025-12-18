import { Suspense } from 'react';
import type { Metadata } from 'next';
import type { Anime, Manga } from '@/lib/types';
import { AnimeGrid } from '@/components/anime/anime-grid';
import { MangaGrid } from '@/components/manga/manga-grid';
import { Skeleton } from '@/components/ui/skeleton';
import RandomAd from '@/components/RandomAd';
import { getAnimeSearch, getMangaSearch } from '@/services/jikan';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
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


async function search(params: SearchPageProps['searchParams']): Promise<{ anime: Anime[], manga: Manga[] }> {
  const query = params.q?.toString() || '';
  const type = params.type?.toString();
  const genres = params.genres?.toString();

  const searchParams = new URLSearchParams();
  if (query) searchParams.set('q', query);
  if (genres) searchParams.set('genres', genres);
  if (type) searchParams.set('type', type);
  
  if (type === 'manga') {
    const response = await getMangaSearch(searchParams.toString());
    return { anime: [], manga: response?.data ?? [] };
  } else {
    // Default to anime search if type is not manga
    const response = await getAnimeSearch(searchParams.toString());
    return { anime: response?.data ?? [], manga: [] };
  }
}

async function SearchResults({ params }: { params: SearchPageProps['searchParams'] }) {
  const { anime: animeList, manga: mangaList } = await search(params);
  const isMangaSearch = params.type === 'manga';

  return (
    <>
      {isMangaSearch ? (
        mangaList.length > 0 ? (
          <MangaGrid mangaList={mangaList} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-headline mb-2">No Results Found</h2>
            <p className="text-muted-foreground">Try searching for something else.</p>
          </div>
        )
      ) : (
        animeList.length > 0 ? (
          <AnimeGrid animeList={animeList} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-headline mb-2">No Results Found</h2>
            <p className="text-muted-foreground">Try searching for something else.</p>
          </div>
        )
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
  const query = searchParams.q?.toString() || '';
  const genres = searchParams.genres?.toString();

  let title = 'Search for an Anime or Manga';
  if (query) {
    title = `Search Results for "${query}"`
  } else if (genres) {
    title = 'Genre Search'
  }

  return (
    <section>
      <RandomAd />
      <h1 className="text-3xl font-bold mb-6 font-headline">
        <span className="text-primary">{title}</span>
      </h1>
      <Suspense fallback={<SearchSkeleton />}>
        {query || genres ? <SearchResults params={searchParams} /> : <p className="text-muted-foreground">Start by typing in the search bar above or selecting a genre.</p>}
      </Suspense>
    </section>
  );
}
