import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Club, ClubMember } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/user/user-card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { getClubById, getClubMembers as getMembers } from '@/services/jikan';

interface ClubMembersPageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
}

async function getClubDetails(id: string): Promise<Club | null> {
    const response = await getClubById(id);
    return response?.data ?? null;
}

async function getClubMembers(id: string, page: number): Promise<JikanAPIResponse<ClubMember[]> | null> {
    return getMembers(id, page);
}

export async function generateMetadata({ params }: ClubMembersPageProps): Promise<Metadata> {
    const club = await getClubDetails(params.id);
    if (!club) {
      return { title: 'Club not found' };
    }
    return {
      title: `Members of ${club.name} - NeonIME`,
      description: `Browse members of the club ${club.name}.`,
    };
}

export default async function ClubMembersPage({ params, searchParams }: ClubMembersPageProps) {
  const page = Number(searchParams.page) || 1;
  const club = await getClubDetails(params.id);
  const membersResponse = await getClubMembers(params.id, page);

  if (!club) {
    notFound();
  }

  const members = membersResponse?.data ?? [];
  const pagination = membersResponse?.pagination;

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Users />
                Members of {club.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/clubs/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Club
                </Link>
            </Button>
        </div>
        {members.length > 0 ? (
            <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {members.map(member => (
                       <UserCard key={member.username} user={member} />
                    ))}
                </div>
                 {pagination && pagination.last_visible_page > 1 && (
                    <Pagination className="mt-8">
                        <PaginationContent>
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={`/clubs/${params.id}/members?page=${page - 1}`} />
                                </PaginationItem>
                            )}
                            {/* To avoid huge pagination bars, we can show a limited set of pages */}
                            {Array.from({ length: Math.min(pagination.last_visible_page, 10) }, (_, i) => page - 5 + i).filter(p => p > 0).map(p => (
                                <PaginationItem key={p}>
                                    <PaginationLink href={`/clubs/${params.id}/members?page=${p}`} isActive={p === page}>
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {pagination.has_next_page && (
                                <PaginationItem>
                                    <PaginationNext href={`/clubs/${params.id}/members?page=${page + 1}`} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </>
        ) : (
            <p>No members found for this club.</p>
        )}
    </section>
  );
}
