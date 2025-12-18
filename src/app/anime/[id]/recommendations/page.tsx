import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Wand2, ChevronLeft } from 'lucide-react';
import type { Anime, AnimeRecommendation } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimeGrid } from '@/components/anime/anime-grid';
import { getAnimeById, getAnimeRecommendations as getRecommendations } from '@/services/jikan';

interface RecommendationsPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    const response = await getAnimeById(id);
    return response?.data ?? null;
}

async function getAnimeRecommendations(id: string): Promise<AnimeRecommendation[]> {
    const response = await getRecommendations(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: RecommendationsPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Recommendations not found' };
    }
    return {
      title: `Recommendations for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse recommendations for ${anime.title_english || anime.title}.`,
    };
}

export default async function RecommendationsPage({ params }: RecommendationsPageProps) {
  const anime = await getAnimeDetails(params.id);
  const recommendations = await getAnimeRecommendations(params.id);

  if (!anime) {
    notFound();
  }

  const recommendationList = recommendations.map(rec => ({
    mal_id: rec.entry.mal_id,
    title: rec.entry.title,
    images: rec.entry.images,
    score: undefined,
  }));

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Wand2 />
                Recommendations for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {recommendationList.length > 0 ? (
        <AnimeGrid animeList={recommendationList} />
      ) : (
        <p>No recommendations found for this anime.</p>
      )}
    </section>
  );
}
