import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Tv, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, AnimeEpisode } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EpisodeCard } from '@/components/anime/episode-card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import RandomAd from '@/components/RandomAd';


interface EpisodesPageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  }
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

async function getAnimeEpisodes(id: string, page: number = 1): Promise<JikanAPIResponse<AnimeEpisode[]> | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${page}`);
    if (!res.ok) {
      console.error(`Failed to fetch episodes for ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<AnimeEpisode[]> = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching episodes for ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: EpisodesPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Episodes not found' };
    }
    return {
      title: `Episodes for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse episodes for ${anime.title_english || anime.title}.`,
    };
  }

export default async function EpisodesPage({ params, searchParams }: EpisodesPageProps) {
  const page = Number(searchParams.page) || 1;
  const anime = await getAnimeDetails(params.id);
  const episodesResponse = await getAnimeEpisodes(params.id, page);

  if (!anime) {
    notFound();
  }

  const episodes = episodesResponse?.data ?? [];
  const pagination = episodesResponse?.pagination;

  return (
    <section>
        <RandomAd />
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Tv />
                Episodes for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {episodes.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodes.map(episode => (
                    <EpisodeCard key={episode.mal_id} episode={episode} animeId={params.id} />
                ))}
            </div>
            {pagination && pagination.last_visible_page > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        {page > 1 && (
                            <PaginationItem>
                                <PaginationPrevious href={`/anime/${params.id}/episodes?page=${page - 1}`} />
                            </PaginationItem>
                        )}
                        {Array.from({ length: pagination.last_visible_page }, (_, i) => i + 1).map(p => (
                            <PaginationItem key={p}>
                                <PaginationLink href={`/anime/${params.id}/episodes?page=${p}`} isActive={p === page}>
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {pagination.has_next_page && (
                             <PaginationItem>
                                <PaginationNext href={`/anime/${params.id}/episodes?page=${page + 1}`} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
      ) : (
        <p>No episodes found for this anime.</p>
      )}
    </section>
  );
}
