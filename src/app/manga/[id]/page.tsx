import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Star, BookOpen, ThumbsUp, Library, Calendar, BarChart as BarChartIcon, Newspaper, MessageSquare, ChevronRight, Users, ImageIcon, Wand2, StarHalf } from 'lucide-react';

import type { JikanAPIResponse, Manga } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MangaPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
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

export async function generateMetadata({ params }: MangaPageProps): Promise<Metadata> {
  const manga = await getMangaDetails(params.id);
  if (!manga) {
    return { title: 'Manga not found' };
  }
  return {
    title: `${manga.title_english || manga.title} - NeonIME`,
    description: manga.synopsis?.substring(0, 150) || 'Manga details on NeonIME',
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

export default async function MangaPage({ params }: MangaPageProps) {
  const manga = await getMangaDetails(params.id);

  if (!manga) {
    notFound();
  }
  
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Image
            src={manga.images.webp.large_image_url || manga.images.jpg.large_image_url}
            alt={`Cover for ${manga.title}`}
            width={300}
            height={450}
            className="rounded-lg shadow-lg w-full"
            priority
            data-ai-hint="manga cover"
          />
        </div>
        <div className="md:col-span-3 space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">{manga.title_english || manga.title}</h1>
          <p className="text-xl text-muted-foreground">{manga.title_japanese}</p>
          <div className="flex flex-wrap gap-2">
            {manga.genres.map((genre) => (
              <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>
            ))}
            {manga.themes.map((theme) => (
              <Badge key={theme.mal_id} variant="outline">{theme.name}</Badge>
            ))}
          </div>
          <Separator className="my-4"/>
          <p className="text-foreground/90 leading-relaxed font-body">{manga.synopsis}</p>
        </div>
      </section>
      
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <InfoBadge icon={Star} label="Score" value={manga.score ? `${manga.score} / 10` : 'N/A'} />
        <InfoBadge icon={BarChartIcon} label="Rank" value={manga.rank ? `#${manga.rank}` : 'N/A'} />
        <InfoBadge icon={ThumbsUp} label="Popularity" value={manga.popularity ? `#${manga.popularity}` : 'N/A'} />
        <InfoBadge icon={Library} label="Type" value={manga.type} />
        <InfoBadge icon={BookOpen} label="Chapters" value={manga.chapters || 'N/A'} />
        <InfoBadge icon={Calendar} label="Published" value={manga.published.string} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Users /> Characters
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/characters`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Newspaper /> News
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/news`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <MessageSquare /> Forum
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/forum`}>
                    View Topics <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <BarChartIcon /> Statistics
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/statistics`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <ImageIcon /> Pictures
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/pictures`}>
                    View Gallery <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Wand2 /> Recommendations
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/recommendations`}>
                    View All <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <StarHalf /> Reviews
            </h3>
            <Button asChild>
                <Link href={`/manga/${manga.mal_id}/reviews`}>
                    Read Reviews <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
      </div>
    </div>
  );
}
