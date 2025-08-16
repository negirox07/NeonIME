import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Video, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, VideoEpisode } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/anime/video-card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface VideoEpisodesPageProps {
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

async function getAnimeVideoEpisodes(id: string, page: number = 1): Promise<JikanAPIResponse<VideoEpisode[]> | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos/episodes?page=${page}`);
    if (!res.ok) {
      console.error(`Failed to fetch video episodes for ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<VideoEpisode[]> = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching video episodes for ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: VideoEpisodesPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Videos not found' };
    }
    return {
      title: `Episode Videos for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse episode videos for ${anime.title_english || anime.title}.`,
    };
}

export default async function VideoEpisodesPage({ params, searchParams }: VideoEpisodesPageProps) {
  const page = Number(searchParams.page) || 1;
  const anime = await getAnimeDetails(params.id);
  const videoResponse = await getAnimeVideoEpisodes(params.id, page);

  if (!anime) {
    notFound();
  }

  const videos = videoResponse?.data ?? [];
  const pagination = videoResponse?.pagination;

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Video />
                Episode Videos for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}/videos`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Videos
                </Link>
            </Button>
        </div>
        {videos.length > 0 ? (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map(video => (
                        <VideoCard key={video.mal_id} video={video} />
                    ))}
                </div>
                {pagination && pagination.last_visible_page > 1 && (
                    <Pagination className="mt-8">
                        <PaginationContent>
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={`/anime/${params.id}/videos/episodes?page=${page - 1}`} />
                                </PaginationItem>
                            )}
                            {Array.from({ length: Math.min(pagination.last_visible_page, 10) }, (_, i) => i + 1).map(p => (
                                <PaginationItem key={p}>
                                    <PaginationLink href={`/anime/${params.id}/videos/episodes?page=${p}`} isActive={p === page}>
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {pagination.has_next_page && (
                                <PaginationItem>
                                    <PaginationNext href={`/anime/${params.id}/videos/episodes?page=${page + 1}`} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </>
        ) : (
            <p>No episode videos found for this anime.</p>
        )}
    </section>
  );
}