import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Video, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Anime, AnimeVideo } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/anime/video-card';
import { getAnimeById, getAnimeVideos as getVideos } from '@/services/jikan';

interface VideosPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    const response = await getAnimeById(id);
    return response?.data ?? null;
}

async function getAnimeVideos(id: string): Promise<AnimeVideo | null> {
    const response = await getVideos(id);
    return response?.data ?? null;
}

export async function generateMetadata({ params }: VideosPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Videos not found' };
    }
    return {
      title: `Videos for ${anime.title_english || anime.title} - NeonIME`,
      description: `Watch promotional videos and episode clips for ${anime.title_english || anime.title}.`,
    };
}

export default async function VideosPage({ params }: VideosPageProps) {
  const anime = await getAnimeDetails(params.id);
  const videos = await getAnimeVideos(params.id);

  if (!anime) {
    notFound();
  }

  const promoVideos = videos?.promo ?? [];
  const episodeVideos = videos?.episodes ?? [];

  return (
    <section className="space-y-12">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Video />
                Videos for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>

        {promoVideos.length === 0 && episodeVideos.length === 0 && (
             <p>No videos found for this anime.</p>
        )}

        {promoVideos.length > 0 && (
            <div>
                <h2 className="text-2xl font-bold font-headline text-accent mb-4">Promotional Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {promoVideos.map(video => (
                        <VideoCard key={video.title} video={video.trailer} title={video.title} />
                    ))}
                </div>
            </div>
        )}
        
        {episodeVideos.length > 0 && (
             <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold font-headline text-accent">Episode Videos</h2>
                    <Button asChild variant="ghost">
                        <Link href={`/anime/${params.id}/videos/episodes`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {episodeVideos.slice(0, 8).map(video => (
                        <VideoCard key={video.mal_id} video={video} />
                    ))}
                </div>
            </div>
        )}
    </section>
  );
}
