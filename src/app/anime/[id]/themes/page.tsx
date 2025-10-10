import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Music, ChevronLeft } from 'lucide-react';
import type { Anime, AnimeTheme } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnimeById, getAnimeThemes as getThemes } from '@/services/jikan';


interface ThemesPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    const response = await getAnimeById(id);
    return response?.data ?? null;
}

async function getAnimeThemes(id: string): Promise<AnimeTheme | null> {
    const response = await getThemes(id);
    return response?.data ?? null;
}

export async function generateMetadata({ params }: ThemesPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Themes not found' };
    }
    return {
      title: `Themes for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse opening and ending themes for ${anime.title_english || anime.title}.`,
    };
}

export default async function ThemesPage({ params }: ThemesPageProps) {
  const anime = await getAnimeDetails(params.id);
  const themes = await getAnimeThemes(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Music />
                Themes for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {themes && (themes.openings.length > 0 || themes.endings.length > 0) ? (
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline text-accent'>Opening Themes</CardTitle>
                </CardHeader>
                <CardContent>
                    {themes.openings.length > 0 ? (
                        <ul className="space-y-2 list-inside list-decimal">
                            {themes.openings.map((op, index) => (
                                <li key={index} className="text-foreground/90">{op}</li>
                            ))}
                        </ul>
                    ) : <p>No opening themes found.</p>}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline text-accent'>Ending Themes</CardTitle>
                </CardHeader>
                <CardContent>
                     {themes.endings.length > 0 ? (
                        <ul className="space-y-2 list-inside list-decimal">
                            {themes.endings.map((ed, index) => (
                                <li key={index} className="text-foreground/90">{ed}</li>
                            ))}
                        </ul>
                    ) : <p>No ending themes found.</p>}
                </CardContent>
            </Card>
        </div>
      ) : (
        <p>No themes found for this anime.</p>
      )}
    </section>
  );
}
