import type { Manga } from '@/lib/types';
import { MangaCard } from './manga-card';

interface MangaGridProps {
  mangaList: Manga[];
}

export function MangaGrid({ mangaList }: MangaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {mangaList.map((manga) => (
        <MangaCard key={manga.mal_id} manga={manga} />
      ))}
    </div>
  );
}
