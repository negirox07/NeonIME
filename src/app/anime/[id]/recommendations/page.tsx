import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Wand2, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, AnimeRecommendation } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimeGrid } from '@/components/anime/anime-grid';

interface RecommendationsPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch anime ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Anime> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching anime ${id}:`, error);
      return null;
    }
}

async function getAnimeRecommendations(id: string): Promise<AnimeRecommendation[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
    if (!res.ok) {
      console.error(`Failed to fetch recommendations for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<AnimeRecommendation[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching recommendations for ${id}:`, error);
    return [];
  }
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
