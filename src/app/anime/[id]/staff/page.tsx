import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Briefcase, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, StaffMember, Anime } from '@/lib/types';
import { StaffCard } from '@/components/anime/staff-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StaffPageProps {
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

async function getAnimeStaff(id: string): Promise<StaffMember[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/staff`);
    if (!res.ok) {
      console.error(`Failed to fetch staff for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<StaffMember[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching staff for ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: StaffPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Staff not found' };
    }
    return {
      title: `Staff for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse staff from ${anime.title_english || anime.title}.`,
    };
  }

export default async function StaffPage({ params }: StaffPageProps) {
  const anime = await getAnimeDetails(params.id);
  const staff = await getAnimeStaff(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Briefcase />
                Staff for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {staff.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {staff.map(staffMember => (
            <StaffCard key={staffMember.person.mal_id} staffMember={staffMember} />
          ))}
        </div>
      ) : (
        <p>No staff found for this anime.</p>
      )}
    </section>
  );
}
