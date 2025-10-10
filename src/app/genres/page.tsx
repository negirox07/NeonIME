
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Tag, Book, Tv } from 'lucide-react';
import type { Genre } from '@/lib/types';
import { getAnimeGenres, getMangaGenres } from '@/services/jikan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: 'Genres - NeonIME',
    description: 'Browse anime and manga by genres, themes, and demographics.',
};

async function getGenres(): Promise<{ anime: Genre[], manga: Genre[] }> {
    const animeGenresResponse = await getAnimeGenres();
    const mangaGenresResponse = await getMangaGenres();
    return {
        anime: animeGenresResponse?.data ?? [],
        manga: mangaGenresResponse?.data ?? [],
    };
}

function GenreList({ genres }: { genres: Genre[] }) {
    if (!genres || genres.length === 0) {
        return <p>No genres found.</p>;
    }
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
                <Link key={genre.mal_id} href={`/search?genres=${genre.mal_id}`}>
                    <Badge variant="secondary" className="text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105">
                        {genre.name} ({genre.count.toLocaleString()})
                    </Badge>
                </Link>
            ))}
        </div>
    );
}

export default async function GenresPage() {
    const { anime: animeGenres, manga: mangaGenres } = await getGenres();

    if (!animeGenres.length && !mangaGenres.length) {
        notFound();
    }
    
    const filterGenres = (genres: Genre[], type: 'genres' | 'themes' | 'demographics' | 'explicit_genres') => {
        return genres.filter(g => g.type === type);
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                    <Tag />
                    Genres
                </h1>
            </div>
            
            <Tabs defaultValue="anime" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="anime" className="gap-2"><Tv /> Anime Genres</TabsTrigger>
                    <TabsTrigger value="manga" className="gap-2"><Book /> Manga Genres</TabsTrigger>
                </TabsList>
                <TabsContent value="anime" className="mt-6 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Genres</h2>
                        <GenreList genres={filterGenres(animeGenres, 'genres')} />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Themes</h2>
                        <GenreList genres={filterGenres(animeGenres, 'themes')} />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Demographics</h2>
                        <GenreList genres={filterGenres(animeGenres, 'demographics')} />
                    </div>
                </TabsContent>
                <TabsContent value="manga" className="mt-6 space-y-8">
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Genres</h2>
                        <GenreList genres={filterGenres(mangaGenres, 'genres')} />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Themes</h2>
                        <GenreList genres={filterGenres(mangaGenres, 'themes')} />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Demographics</h2>
                        <GenreList genres={filterGenres(mangaGenres, 'demographics')} />
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}

