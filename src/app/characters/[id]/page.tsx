import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { JikanAPIResponse, Character, Manga, Anime, VoiceActor } from '@/lib/types';
import { BookOpen, Clapperboard, Heart, ChevronRight, Mic2 } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RandomAd from '@/components/RandomAd';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

async function getCharacterDetails(id: string): Promise<Character | null> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
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


export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
    const character = await getCharacterDetails(params.id);
    if (!character) {
      return { title: 'Character not found' };
    }
    return {
      title: `${character.name} - NeonIME`,
      description: character.about?.substring(0, 150) || `Information about ${character.name} on NeonIME.`,
    };
}


export default async function CharacterPage({ params }: CharacterPageProps) {
    const character = await getCharacterDetails(params.id);

    if (!character) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <RandomAd />
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Image
                        src={character.images.webp.image_url || character.images.jpg.image_url}
                        alt={`Portrait of ${character.name}`}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg w-full"
                        priority
                        data-ai-hint="anime character"
                    />
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-headline text-accent flex items-center gap-2">
                                <Heart /> Favorites
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{character.favorites.toLocaleString()}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-3 space-y-4">
                    <h1 className="text-4xl font-bold font-headline text-primary">{character.name}</h1>
                    {character.name_kanji && <p className="text-xl text-muted-foreground">{character.name_kanji}</p>}
                    {character.nicknames && character.nicknames.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {character.nicknames.map((nick) => (
                                <Badge key={nick} variant="secondary">{nick}</Badge>
                            ))}
                        </div>
                    )}
                    <Separator className="my-4"/>
                    <h2 className="text-2xl font-bold font-headline text-accent">About</h2>
                    <div className="prose prose-invert max-w-none prose-p:text-foreground/90">
                        {character.about ? (
                             character.about.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : <p>No biography available.</p>}
                    </div>
                </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <Clapperboard /> Anime Appearances
                    </h3>
                    <Button asChild>
                        <Link href={`/characters/${character.mal_id}/anime`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>

                <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <BookOpen /> Manga Appearances
                    </h3>
                    <Button asChild>
                        <Link href={`/characters/${character.mal_id}/manga`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>
                
                <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <Mic2 /> Voice Actors
                    </h3>
                    <Button asChild>
                        <Link href={`/characters/${character.mal_id}/voices`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>
            </div>
        </div>
    )
}
