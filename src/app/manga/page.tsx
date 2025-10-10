import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import type { JikanAPIResponse, Manga } from '@/lib/types';
import { MangaGrid } from '@/components/manga/manga-grid';
import RandomAd from '@/components/RandomAd';

export const metadata: Metadata = {
    title: 'Top Manga - NeonIME',
    description: 'Browse the most popular manga series.',
};

async function getTopManga(): Promise<Manga[]> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/top/manga`);
        if (!res.ok) {
            console.error(`Failed to fetch top manga:`, res.status, await res.text());
            return [];
        }
        const data: JikanAPIResponse<Manga[]> = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching top manga:`, error);
        return [];
    }
}

export default async function MangaPage() {
    const manga = await getTopManga();

    if (!manga) {
        notFound();
    }

    return (
        <section>
            <RandomAd />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                    <BookOpen />
                    Top Manga
                </h1>
            </div>
            {manga.length > 0 ? (
                <MangaGrid mangaList={manga} />
            ) : (
                <p>No manga found.</p>
            )}
        </section>
    );
}
