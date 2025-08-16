import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Manga, AnimeCharacter } from '@/lib/types';
import { CharacterCard } from '@/components/anime/character-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface MangaCharactersPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch manga ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Manga> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching manga ${id}:`, error);
      return null;
    }
  }

async function getMangaCharacters(id: string): Promise<AnimeCharacter[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`);
    if (!res.ok) {
      console.error(`Failed to fetch characters for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<AnimeCharacter[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching characters for ${id}:`, error);
    return [];
  }
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
