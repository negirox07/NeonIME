import type { Metadata } from 'next';
import type { Anime } from '@/lib/types';
import { AnimeGrid } from '@/components/anime/anime-grid';
import RandomAd from '@/components/RandomAd';
import { getTopAnime } from '@/services/jikan';

export const metadata: Metadata = {
  title: 'NeonIME - Your Anime Universe',
  description: 'Discover trending, popular, and upcoming anime. Your ultimate guide to the anime world, powered by the Jikan API.',
};

async function getTrendingAnime(): Promise<Anime[]> {
  const response = await getTopAnime('airing');
  return response?.data || [];
}

async function getPopularAnime(): Promise<Anime[]> {
  const response = await getTopAnime('bypopularity');
  return response?.data || [];
}

async function getUpcomingAnime(): Promise<Anime[]> {
  const response = await getTopAnime('upcoming');
  return response?.data || [];
}

export default async function HomePage() {
  const [trendingAnime, popularAnime, upcomingAnime] = await Promise.all([
    getTrendingAnime(),
    getPopularAnime(),
    getUpcomingAnime(),
  ]);

  const displayedIds = new Set<number>();

  const uniqueTrending = trendingAnime.filter(anime => {
    if (displayedIds.has(anime.mal_id)) {
      return false;
    }
    displayedIds.add(anime.mal_id);
    return true;
  });

  const uniquePopular = popularAnime.filter(anime => {
    if (displayedIds.has(anime.mal_id)) {
      return false;
    }
    displayedIds.add(anime.mal_id);
    return true;
  });

  const uniqueUpcoming = upcomingAnime.filter(anime => {
    if (displayedIds.has(anime.mal_id)) {
      return false;
    }
    displayedIds.add(anime.mal_id);
    return true;
  });

  return (
    <div className="space-y-12">
      <RandomAd />
      <section>
        <h1 className="text-3xl font-bold mb-6 font-headline text-primary">Trending Now</h1>
        {uniqueTrending.length > 0 ? (
          <AnimeGrid animeList={uniqueTrending} />
        ) : (
          <p>Could not load trending anime. Please try again later.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 font-headline text-primary">All-Time Popular</h2>
        {uniquePopular.length > 0 ? (
          <AnimeGrid animeList={uniquePopular} />
        ) : (
          <p>Could not load popular anime. Please try again later.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 font-headline text-primary">Top Upcoming</h2>
        {uniqueUpcoming.length > 0 ? (
          <AnimeGrid animeList={uniqueUpcoming} />
        ) : (
          <p>Could not load upcoming anime. Please try again later.</p>
        )}
      </section>
    </div>
  );
}
