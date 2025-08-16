import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Character, CharacterManga } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MangaAppearanceCard } from '@/components/character/manga-appearance-card';

interface CharacterMangaPageProps {
  params: {
    id: string;
  };
}

async function getCharacterDetails(id: string): Promise<Character | null> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/characters/${id}`);
        if (!res.ok) {
            if (res.status === 404) return null;
            console.error(`Failed to fetch character ${id}:`, res.status, await res.text());
            return null;
        }
        const data: JikanAPIResponse<Character> = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching character ${id}:`, error);
        return null;
    }
}

async function getCharacterManga(id: string): Promise<CharacterManga[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/manga`);
    if (!res.ok) {
      console.error(`Failed to fetch manga appearances for character ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<CharacterManga[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching manga appearances for character ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: CharacterMangaPageProps): Promise<Metadata> {
    const character = await getCharacterDetails(params.id);
    if (!character) {
      return { title: 'Character not found' };
    }
    return {
      title: `Manga Appearances for ${character.name} - NeonIME`,
      description: `Browse all manga appearances for the character ${character.name}.`,
    };
}

export default async function CharacterMangaPage({ params }: CharacterMangaPageProps) {
  const character = await getCharacterDetails(params.id);
  const appearances = await getCharacterManga(params.id);

  if (!character) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <BookOpen />
                Manga Appearances for {character.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/characters/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Character
                </Link>
            </Button>
        </div>
      {appearances.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {appearances.map(appearance => (
            <MangaAppearanceCard key={appearance.manga.mal_id} appearance={appearance} />
          ))}
        </div>
      ) : (
        <p>No manga appearances found for this character.</p>
      )}
    </section>
  );
}