import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Tv, Calendar, Star, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, AnimeEpisode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RandomAd from '@/components/RandomAd';

interface EpisodePageProps {
  params: {
    id: string;
    episode: string;
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

async function getEpisodeDetails(id: string, episode: string): Promise<AnimeEpisode | null> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes/${episode}`);
        if (!res.ok) {
            if (res.status === 404) return null;
            console.error(`Failed to fetch episode ${episode} for anime ${id}:`, res.status, await res.text());
            return null;
        }
        const data: JikanAPIResponse<AnimeEpisode> = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching episode ${episode} for anime ${id}:`, error);
        return null;
    }
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    const episode = await getEpisodeDetails(params.id, params.episode);

    if (!anime || !episode) {
      return { title: 'Episode not found' };
    }
    return {
      title: `${anime.title_english || anime.title} - Episode ${episode.mal_id}: ${episode.title} - NeonIME`,
      description: `Details for episode ${episode.mal_id} of ${anime.title_english || anime.title}.`,
    };
}


export default async function EpisodePage({ params }: EpisodePageProps) {
  const anime = await getAnimeDetails(params.id);
  const episode = await getEpisodeDetails(params.id, params.episode);

  if (!anime || !episode) {
    notFound();
  }

  return (
    <section>
        <RandomAd />
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Tv />
                {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}/episodes`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Episodes
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-accent">
                    Episode {episode.mal_id}: {episode.title}
                </CardTitle>
                <p className="text-muted-foreground">{episode.title_romanji}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                    {episode.aired && (
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4"/>
                            {format(new Date(episode.aired), 'PPP')}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Star className="w-4 h-4"/>
                        Score: {episode.score?.toFixed(2) ?? 'N/A'}
                    </span>
                    {episode.filler && <span className="text-accent font-bold">[FILLER]</span>}
                    {episode.recap && <span className="text-secondary font-bold">[RECAP]</span>}
                </div>
                <p className='text-foreground/90 font-body'>{episode.synopsis ?? "No synopsis available."}</p>
                {episode.forum_url && (
                    <Button asChild>
                        <Link href={episode.forum_url} target="_blank" rel="noopener noreferrer">
                            Discuss on Forum
                        </Link>
                    </Button>
                )}
            </CardContent>
        </Card>
    </section>
  );
}
