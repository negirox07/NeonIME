import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import type { JikanAPIResponse, Character } from '@/lib/types';
import { CharacterCard } from '@/components/character/character-card';
import RandomAd from '@/components/RandomAd';

export const metadata: Metadata = {
    title: 'Top Characters - NeonIME',
    description: 'Browse the most popular anime characters.',
};

async function getTopCharacters(): Promise<Character[]> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/top/characters`);
        if (!res.ok) {
            console.error(`Failed to fetch top characters:`, res.status, await res.text());
            return [];
        }
        const data: JikanAPIResponse<Character[]> = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching top characters:`, error);
        return [];
    }
}

export default async function CharactersPage() {
    const characters = await getTopCharacters();

    if (!characters) {
        notFound();
    }

    return (
        <section>
            <RandomAd />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                    <Users />
                    Top Characters
                </h1>
            </div>
            {characters.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {characters.map(character => (
                        <CharacterCard key={character.mal_id} character={character} />
                    ))}
                </div>
            ) : (
                <p>No characters found.</p>
            )}
        </section>
    );
}
