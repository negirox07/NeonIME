import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Group } from 'lucide-react';
import type { Club } from '@/lib/types';
import { ClubCard } from '@/components/club/club-card';
import { getTopClubs } from '@/services/jikan';
import RandomAd from '@/components/RandomAd';

export const metadata: Metadata = {
    title: 'Top Clubs - NeonIME',
    description: 'Browse the most popular anime and manga clubs.',
};

async function getClubs(): Promise<Club[]> {
    const response = await getTopClubs();
    return response?.data ?? [];
}

export default async function ClubsPage() {
    const clubs = await getClubs();

    if (!clubs) {
        notFound();
    }

    return (
        <section>
            <RandomAd />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                    <Group />
                    Top Clubs
                </h1>
            </div>
            {clubs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {clubs.map(club => (
                        <ClubCard key={club.mal_id} club={club} />
                    ))}
                </div>
            ) : (
                <p>No clubs found.</p>
            )}
        </section>
    );
}
