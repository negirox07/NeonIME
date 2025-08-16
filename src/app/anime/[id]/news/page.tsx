import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Newspaper, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, News } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface NewsPageProps {
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

async function getAnimeNews(id: string, page: number = 1): Promise<JikanAPIResponse<News[]> | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/news?page=${page}`);
    if (!res.ok) {
      console.error(`Failed to fetch news for ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<News[]> = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching news for ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'News not found' };
    }
    return {
      title: `News for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse news for ${anime.title_english || anime.title}.`,
    };
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const page = Number(searchParams.page) || 1;
  const anime = await getAnimeDetails(params.id);
  const newsResponse = await getAnimeNews(params.id, page);

  if (!anime) {
    notFound();
  }
  
  const news = newsResponse?.data ?? [];
  const pagination = newsResponse?.pagination;

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Newspaper />
                News for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {news.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(article => (
                <Link href={article.url} key={article.mal_id} target="_blank" rel="noopener noreferrer" className="group block">
                    <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                    <div className="aspect-video relative">
                        <Image
                            src={article.images.jpg.image_url}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            data-ai-hint="news article"
                        />
                    </div>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">{format(new Date(article.date), 'PPP')}</p>
                        <h3 className="font-bold font-headline line-clamp-2 text-lg text-foreground/90 group-hover:text-primary">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    </Card>
                </Link>
                ))}
            </div>

            {pagination && pagination.last_visible_page > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        {page > 1 && (
                            <PaginationItem>
                                <PaginationPrevious href={`/anime/${params.id}/news?page=${page - 1}`} />
                            </PaginationItem>
                        )}
                        {Array.from({ length: pagination.last_visible_page }, (_, i) => i + 1).slice(0, 10).map(p => (
                            <PaginationItem key={p}>
                                <PaginationLink href={`/anime/${params.id}/news?page=${p}`} isActive={p === page}>
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {pagination.has_next_page && (
                             <PaginationItem>
                                <PaginationNext href={`/anime/${params.id}/news?page=${page + 1}`} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
      ) : (
        <p>No news found for this anime.</p>
      )}
    </section>
  );
}
