import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users, ChevronLeft } from 'lucide-react';
import type { Manga, AnimeCharacter } from '@/lib/types';
import { CharacterCard } from '@/components/anime/character-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getMangaById, getMangaCharacters as getCharacters } from '@/services/jikan';

interface MangaCharactersPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    const response = await getMangaById(id);
    return response?.data ?? null;
}

async function getMangaCharacters(id: string): Promise<AnimeCharacter[]> {
    const response = await getCharacters(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: MangaCharactersPageProps): Promise<Metadata> {
    const manga = await getMangaDetails(params.id);
    if (!manga) {
      return { title: 'Characters not found' };
    }
    return {
      title: `Characters for ${manga.title_english || manga.title} - NeonIME`,
      description: `Browse characters from ${manga.title_english || manga.title}.`,
    };
  }

export default async function MangaCharactersPage({ params }: MangaCharactersPageProps) {
  const manga = await getMangaDetails(params.id);
  const characters = await getMangaCharacters(params.id);

  if (!manga) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Users />
                Characters for {manga.title_english || manga.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/manga/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Manga
                </Link>
            </Button>
        </div>
      {characters.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {characters.map(character => (
            <CharacterCard key={character.character.mal_id} character={character} />
          ))}
        </div>
      ) : (
        <p>No characters found for this manga.</p>
      )}
    </section>
  );
}
