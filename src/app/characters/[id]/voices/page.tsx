import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mic2, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Character, VoiceActor } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VoiceActorCard } from '@/components/character/voice-actor-card';

interface CharacterVoicesPageProps {
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

async function getCharacterVoices(id: string): Promise<VoiceActor[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/voices`);
    if (!res.ok) {
      console.error(`Failed to fetch voice actors for character ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<VoiceActor[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching voice actors for character ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: CharacterVoicesPageProps): Promise<Metadata> {
    const character = await getCharacterDetails(params.id);
    if (!character) {
      return { title: 'Character not found' };
    }
    return {
      title: `Voice Actors for ${character.name} - NeonIME`,
      description: `Browse all voice actors for the character ${character.name}.`,
    };
}

export default async function CharacterVoicesPage({ params }: CharacterVoicesPageProps) {
  const character = await getCharacterDetails(params.id);
  const voices = await getCharacterVoices(params.id);

  if (!character) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Mic2 />
                Voice Actors for {character.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/characters/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Character
                </Link>
            </Button>
        </div>
      {voices.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {voices.map(voiceActor => (
            <VoiceActorCard key={`${voiceActor.person.mal_id}-${voiceActor.language}`} voiceActor={voiceActor} />
          ))}
        </div>
      ) : (
        <p>No voice actor information found for this character.</p>
      )}
    </section>
  );
}