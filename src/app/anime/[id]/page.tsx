import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Star, Tv, Film, Calendar, BarChart as BarChartIcon, BookOpen, ThumbsUp, Users, Newspaper, Briefcase, Wand2, Link as LinkIcon, Music, Clapperboard, MessageSquare, Video, PlayCircle, Image as ImageIcon, StarHalf } from 'lucide-react';
import { format } from 'date-fns';

import type { JikanAPIResponse, Anime } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface AnimePageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
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

export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const anime = await getAnimeDetails(params.id);
  if (!anime) {
    return { title: 'Anime not found' };
  }
  return {
    title: `${anime.title_english || anime.title} - NeonIME`,
    description: anime.synopsis?.substring(0, 150) || 'Anime details on NeonIME',
  };
}

const InfoBadge = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string | number | null | undefined }) => {
    if (!value) return null;
    const Icon = icon;
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card text-center">
            <Icon className="w-6 h-6 mb-2 text-accent" />
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-bold font-headline text-lg">{value}</p>
        </div>
    );
};

export default async function AnimePage({ params }: AnimePageProps) {
  const anime = await getAnimeDetails(params.id);

  if (!anime) {
    notFound();
  }
  
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Image
            src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
            alt={`Poster for ${anime.title}`}
            width={300}
            height={450}
            className="rounded-lg shadow-lg w-full"
            priority
            data-ai-hint="anime poster"
          />
        </div>
        <div className="md:col-span-3 space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">{anime.title_english || anime.title}</h1>
          <p className="text-xl text-muted-foreground">{anime.title_japanese}</p>
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>
            ))}
            {anime.themes.map((theme) => (
              <Badge key={theme.mal_id} variant="outline">{theme.name}</Badge>
            ))}
          </div>
          <Separator className="my-4"/>
          <p className="text-foreground/90 leading-relaxed font-body">{anime.synopsis}</p>
        </div>
      </section>
      
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <InfoBadge icon={Star} label="Score" value={anime.score ? `${anime.score} / 10` : 'N/A'} />
        <InfoBadge icon={BarChartIcon} label="Rank" value={anime.rank ? `#${anime.rank}` : 'N/A'} />
        <InfoBadge icon={ThumbsUp} label="Popularity" value={anime.popularity ? `#${anime.popularity}` : 'N/A'} />
        <InfoBadge icon={anime.type === 'TV' ? Tv : Film} label="Type" value={anime.type} />
        <InfoBadge icon={BookOpen} label="Episodes" value={anime.episodes || 'N/A'} />
        <InfoBadge icon={Calendar} label="Aired" value={anime.aired.string} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Users /> Characters
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/characters`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Briefcase /> Staff
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/staff`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Tv /> Episodes
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/episodes`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <BarChartIcon /> Statistics
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/statistics`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Wand2 /> Recommendations
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/recommendations`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <StarHalf /> Reviews
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/reviews`}>
                    Read Reviews <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <LinkIcon /> Relations
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/relations`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Music /> Themes
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/themes`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Newspaper /> News
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/news`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Video /> Videos
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/videos`}>
                    Watch Videos <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <MessageSquare /> Forum
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/forum`}>
                    View Topics <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <LinkIcon /> External
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/external`}>
                    View Links <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <PlayCircle /> Streaming
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/streaming`}>
                    View Services <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <ImageIcon /> Pictures
            </h3>
            <Button asChild>
                <Link href={`/anime/${anime.mal_id}/pictures`}>
                    View Gallery <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
      </div>

      {anime.trailer?.embed_url && (
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
            <Clapperboard />
            Trailer
          </h2>
          <div className="aspect-video">
            <iframe
              src={anime.trailer.embed_url.replace('autoplay=1', 'autoplay=0')}
              title="Anime Trailer"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </section>
      )}
    </div>
  );
}
