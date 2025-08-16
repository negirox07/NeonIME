import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link as LinkIcon, ChevronLeft, ArrowUpRight } from 'lucide-react';
import type { JikanAPIResponse, Anime, ExternalLink } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ExternalPageProps {
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

async function getExternalLinks(id: string): Promise<ExternalLink[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/external`);
    if (!res.ok) {
      console.error(`Failed to fetch external links for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<ExternalLink[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching external links for ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: ExternalPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'External Links not found' };
    }
    return {
      title: `External Links for ${anime.title_english || anime.title} - NeonIME`,
      description: `Find external links for ${anime.title_english || anime.title}.`,
    };
}

export default async function ExternalPage({ params }: ExternalPageProps) {
  const anime = await getAnimeDetails(params.id);
  const links = await getExternalLinks(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <LinkIcon />
                External Links for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
        {links.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {links.map((link) => (
                    <a href={link.url} key={link.name} target="_blank" rel="noopener noreferrer" className="group block">
                        <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                            <CardContent className="p-4 flex items-center justify-between">
                                <span className="font-bold text-foreground/90 group-hover:text-primary">{link.name}</span>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform duration-300 group-hover:rotate-45" />
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        ) : (
            <p>No external links found for this anime.</p>
        )}
    </section>
  );
}
