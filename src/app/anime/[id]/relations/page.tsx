import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link as LinkIcon, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, AnimeRelation } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimeGrid } from '@/components/anime/anime-grid';

interface RelationsPageProps {
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

async function getAnimeRelations(id: string): Promise<AnimeRelation[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/relations`);
    if (!res.ok) {
      console.error(`Failed to fetch relations for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<AnimeRelation[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching relations for ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: RelationsPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Relations not found' };
    }
    return {
      title: `Relations for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse relations for ${anime.title_english || anime.title}.`,
    };
}

export default async function RelationsPage({ params }: RelationsPageProps) {
  const anime = await getAnimeDetails(params.id);
  const relations = await getAnimeRelations(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <LinkIcon />
                Relations for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {relations.length > 0 ? (
        <div className="space-y-8">
          {relations.map(relation => (
            <div key={relation.relation}>
                <h2 className="text-2xl font-bold font-headline text-accent mb-4">{relation.relation}</h2>
                <AnimeGrid animeList={relation.entry.map(e => ({ mal_id: e.mal_id, title: e.name, images: { webp: { large_image_url: '' }, jpg: { large_image_url: '' } }, score: undefined }))} />
            </div>
          ))}
        </div>
      ) : (
        <p>No relations found for this anime.</p>
      )}
    </section>
  );
}
