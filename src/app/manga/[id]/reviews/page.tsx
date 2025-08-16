import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StarHalf, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Manga, AnimeReview } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/anime/review-card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ReviewsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
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

async function getMangaReviews(id: string, page: number): Promise<JikanAPIResponse<AnimeReview[]> | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/reviews?page=${page}&preliminary=true&spoilers=true`);
    if (!res.ok) {
      console.error(`Failed to fetch reviews for manga ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<AnimeReview[]> = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching reviews for manga ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
    const manga = await getMangaDetails(params.id);
    if (!manga) {
      return { title: 'Reviews not found' };
    }
    return {
      title: `Reviews for ${manga.title_english || manga.title} - NeonIME`,
      description: `Read user reviews for ${manga.title_english || manga.title}.`,
    };
}

export default async function ReviewsPage({ params, searchParams }: ReviewsPageProps) {
  const page = Number(searchParams.page) || 1;
  const manga = await getMangaDetails(params.id);
  const reviewsResponse = await getMangaReviews(params.id, page);
  
  if (!manga) {
    notFound();
  }
  
  const reviews = reviewsResponse?.data ?? [];
  const pagination = reviewsResponse?.pagination;

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <StarHalf />
                Reviews for {manga.title_english || manga.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/manga/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Manga
                </Link>
            </Button>
        </div>
        {reviews.length > 0 ? (
            <>
                <div className="space-y-6">
                    {reviews.map(review => (
                        <ReviewCard key={review.mal_id} review={review} />
                    ))}
                </div>

                {pagination && pagination.last_visible_page > 1 && (
                    <Pagination className="mt-8">
                        <PaginationContent>
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={`/manga/${params.id}/reviews?page=${page - 1}`} />
                                </PaginationItem>
                            )}
                            {Array.from({ length: Math.min(pagination.last_visible_page, 10) }, (_, i) => i + 1).map(p => (
                                <PaginationItem key={p}>
                                    <PaginationLink href={`/manga/${params.id}/reviews?page=${p}`} isActive={p === page}>
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {pagination.has_next_page && (
                                <PaginationItem>
                                    <PaginationNext href={`/manga/${params.id}/reviews?page=${page + 1}`} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </>
        ) : (
            <p>No reviews found for this manga.</p>
        )}
    </section>
  );
}
