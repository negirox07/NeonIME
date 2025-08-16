import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StarHalf, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, AnimeReview } from '@/lib/types';
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

async function getAnimeReviews(id: string, page: number): Promise<JikanAPIResponse<AnimeReview[]> | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews?page=${page}&preliminary=true&spoilers=true`);
    if (!res.ok) {
      console.error(`Failed to fetch reviews for anime ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<AnimeReview[]> = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching reviews for anime ${id}:`, error);
    return null;
  }
}


export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Reviews not found' };
    }
    return {
      title: `Reviews for ${anime.title_english || anime.title} - NeonIME`,
      description: `Read user reviews for ${anime.title_english || anime.title}.`,
    };
}


export default async function ReviewsPage({ params, searchParams }: ReviewsPageProps) {
  const page = Number(searchParams.page) || 1;
  const anime = await getAnimeDetails(params.id);
  const reviewsResponse = await getAnimeReviews(params.id, page);
  
  if (!anime) {
    notFound();
  }
  
  const reviews = reviewsResponse?.data ?? [];
  const pagination = reviewsResponse?.pagination;

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <StarHalf />
                Reviews for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
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
                                    <PaginationPrevious href={`/anime/${params.id}/reviews?page=${page - 1}`} />
                                </PaginationItem>
                            )}
                            {/* Jikan API pagination for reviews can be very large, so we limit the visible pages */}
                            {Array.from({ length: Math.min(pagination.last_visible_page, 10) }, (_, i) => i + 1).map(p => (
                                <PaginationItem key={p}>
                                    <PaginationLink href={`/anime/${params.id}/reviews?page=${p}`} isActive={p === page}>
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {pagination.has_next_page && (
                                <PaginationItem>
                                    <PaginationNext href={`/anime/${params.id}/reviews?page=${page + 1}`} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </>
        ) : (
            <p>No reviews found for this anime.</p>
        )}
    </section>
  );
}
