
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

function GenreList({ genres, type }: { genres: Genre[], type: 'anime' | 'manga' }) {
    if (!genres || genres.length === 0) {
        return <p>No genres found.</p>;
    }
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
                <Link key={genre.mal_id} href={`/search?genres=${genre.mal_id}${type === 'manga' ? '&type=manga' : ''}`}>
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
    
    const filterAndCategorizeGenres = (genres: Genre[]): { [key: string]: Genre[] } => {
        const categorized: { [key: string]: Genre[] } = {
            genres: [],
            themes: [],
            demographics: [],
            explicit_genres: [],
            other: [],
        };
        const knownTypes = new Set(Object.keys(categorized));

        genres.forEach(g => {
            let type = g.type || 'other';
            if (type === 'explicit') type = 'explicit_genres';

            if (knownTypes.has(type)) {
                categorized[type].push(g);
            } else {
                categorized.other.push(g);
            }
        });

        return categorized;
    };
    
    const categorizedAnimeGenres = filterAndCategorizeGenres(animeGenres);
    const categorizedMangaGenres = filterAndCategorizeGenres(mangaGenres);

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
                        <GenreList genres={categorizedAnimeGenres.genres} type="anime" />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Themes</h2>
                        <GenreList genres={categorizedAnimeGenres.themes} type="anime" />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Demographics</h2>
                        <GenreList genres={categorizedAnimeGenres.demographics} type="anime" />
                    </div>
                    {categorizedAnimeGenres.explicit_genres.length > 0 && <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Explicit Genres</h2>
                        <GenreList genres={categorizedAnimeGenres.explicit_genres} type="anime" />
                    </div>}
                     {categorizedAnimeGenres.other.length > 0 && <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Other</h2>
                        <GenreList genres={categorizedAnimeGenres.other} type="anime" />
                    </div>}
                </TabsContent>
                <TabsContent value="manga" className="mt-6 space-y-8">
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Genres</h2>
                        <GenreList genres={categorizedMangaGenres.genres} type="manga" />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Themes</h2>
                        <GenreList genres={categorizedMangaGenres.themes} type="manga" />
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Demographics</h2>
                        <GenreList genres={categorizedMangaGenres.demographics} type="manga" />
                    </div>
                    {categorizedMangaGenres.explicit_genres.length > 0 && <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Explicit Genres</h2>
                        <GenreList genres={categorizedMangaGenres.explicit_genres} type="manga" />
                    </div>}
                    {categorizedMangaGenres.other.length > 0 && <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Other</h2>
                        <GenreList genres={categorizedMangaGenres.other} type="manga" />
                    </div>}
                </TabsContent>
            </Tabs>
        </section>
    );
}
