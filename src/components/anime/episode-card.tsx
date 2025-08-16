import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import type { AnimeEpisode } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar, Star } from 'lucide-react';

interface EpisodeCardProps {
  episode: AnimeEpisode;
  animeId: string;
}

export function EpisodeCard({ episode, animeId }: EpisodeCardProps) {
  return (
    <Link href={`/anime/${animeId}/episodes/${episode.mal_id}`} className="group block">
        <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
            <CardHeader>
                <CardTitle className="text-base line-clamp-2 font-headline h-12 text-primary group-hover:text-accent">
                    Ep {episode.mal_id}: {episode.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {episode.synopsis ?? 'No synopsis available.'}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {episode.aired ? format(new Date(episode.aired), 'PP') : 'N/A'}
                </span>
                 <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {episode.score?.toFixed(2) ?? 'N/A'}
                </span>
            </CardFooter>
        </Card>
    </Link>
  );
}
