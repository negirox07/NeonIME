import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import type { JikanAPIResponse, AnimeCharacter, Anime } from '@/lib/types';
import { CharacterCard } from '@/components/anime/character-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface CharactersPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch anime ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Anime> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching anime ${id}:`, error);
      return null;
    }
  }

async function getAnimeCharacters(id: string): Promise<AnimeCharacter[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
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

export async function generateMetadata({ params }: CharactersPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Characters not found' };
    }
    return {
      title: `Characters for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse characters from ${anime.title_english || anime.title}.`,
    };
  }

export default async function CharactersPage({ params }: CharactersPageProps) {
  const anime = await getAnimeDetails(params.id);
  const characters = await getAnimeCharacters(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Users />
                Characters for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
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
        <p>No characters found for this anime.</p>
      )}
    </section>
  );
}
