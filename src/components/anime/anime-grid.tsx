import type { Anime } from '@/lib/types';
import { AnimeCard } from './anime-card';

interface AnimeGridProps {
  animeList: (Partial<Anime> & { mal_id: number, title: string, images: Anime['images'] })[];
}

export function AnimeGrid({ animeList }: AnimeGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}
