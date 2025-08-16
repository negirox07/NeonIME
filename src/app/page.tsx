import type { JikanAPIResponse, Anime } from '@/lib/types';
import { AnimeGrid } from '@/components/anime/anime-grid';

async function getTrendingAnime(): Promise<Anime[]> {
  try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) {
      console.error('Failed to fetch trending anime:', res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Anime[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
}

async function getPopularAnime(): Promise<Anime[]> {
   try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
      next: { revalidate: 86400 } // Revalidate every day
    });
    if (!res.ok) {
      console.error('Failed to fetch popular anime:', res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Anime[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    return [];
  }
}

async function getUpcomingAnime(): Promise<Anime[]> {
  try {
   const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=upcoming', {
     next: { revalidate: 86400 } // Revalidate every day
   });
   if (!res.ok) {
     console.error('Failed to fetch upcoming anime:', res.status, await res.text());
     return [];
   }
   const data: JikanAPIResponse<Anime[]> = await res.json();
   return data.data;
 } catch (error) {
   console.error('Error fetching upcoming anime:', error);
   return [];
 }
}


export default async function HomePage() {
  const [trendingAnime, popularAnime, upcomingAnime] = await Promise.all([
    getTrendingAnime(),
    getPopularAnime(),
    getUpcomingAnime(),
  ]);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-6 font-headline text-primary">Trending Now</h1>
        {trendingAnime.length > 0 ? (
          <AnimeGrid animeList={trendingAnime} />
        ) : (
          <p>Could not load trending anime. Please try again later.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 font-headline text-primary">All-Time Popular</h2>
        {popularAnime.length > 0 ? (
          <AnimeGrid animeList={popularAnime} />
        ) : (
          <p>Could not load popular anime. Please try again later.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 font-headline text-primary">Top Upcoming</h2>
        {upcomingAnime.length > 0 ? (
          <AnimeGrid animeList={upcomingAnime} />
        ) : (
          <p>Could not load upcoming anime. Please try again later.</p>
        )}
      </section>
    </div>
  );
}
