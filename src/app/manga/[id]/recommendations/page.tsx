import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Wand2, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Manga, MangaRecommendation } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MangaGrid } from '@/components/manga/manga-grid';

interface RecommendationsPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch manga ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Manga> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching manga ${id}:`, error);
      return null;
    }
}

async function getMangaRecommendations(id: string): Promise<MangaRecommendation[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/recommendations`);
    if (!res.ok) {
      console.error(`Failed to fetch recommendations for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<MangaRecommendation[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching recommendations for ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: RecommendationsPageProps): Promise<Metadata> {
    const manga = await getMangaDetails(params.id);
    if (!manga) {
      return { title: 'Recommendations not found' };
    }
    return {
      title: `Recommendations for ${manga.title_english || manga.title} - NeonIME`,
      description: `Browse recommendations for ${manga.title_english || manga.title}.`,
    };
}

export default async function RecommendationsPage({ params }: RecommendationsPageProps) {
  const manga = await getMangaDetails(params.id);
  const recommendations = await getMangaRecommendations(params.id);

  if (!manga) {
    notFound();
  }

  const recommendationList = recommendations.map(rec => ({
    ...rec.entry,
    score: undefined,
  })) as Manga[];

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Wand2 />
                Recommendations for {manga.title_english || manga.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/manga/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Manga
                </Link>
            </Button>
        </div>
      {recommendationList.length > 0 ? (
        <MangaGrid mangaList={recommendationList} />
      ) : (
        <p>No recommendations found for this manga.</p>
      )}
    </section>
  );
}
