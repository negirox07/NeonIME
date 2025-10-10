import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import type { AnimeCharacter, Anime } from '@/lib/types';
import { CharacterCard } from '@/components/anime/character-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import RandomAd from '@/components/RandomAd';
import { getAnimeById, getAnimeCharacters as getCharacters } from '@/services/jikan';

interface CharactersPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    const response = await getAnimeById(id);
    return response?.data ?? null;
}

async function getAnimeCharacters(id: string): Promise<AnimeCharacter[]> {
  const response = await getCharacters(id);
  return response?.data ?? [];
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
      <RandomAd />
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
