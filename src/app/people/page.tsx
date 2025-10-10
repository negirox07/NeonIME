import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import type { Person } from '@/lib/types';
import { PersonCard } from '@/components/person/person-card';
import RandomAd from '@/components/RandomAd';
import { getTopPeople as getPeople } from '@/services/jikan';

export const metadata: Metadata = {
    title: 'Top People - NeonIME',
    description: 'Browse the most popular people in the anime industry.',
};

async function getTopPeople(): Promise<Person[]> {
    const response = await getPeople();
    return response?.data ?? [];
}

export default async function PeoplePage() {
    const people = await getTopPeople();

    if (!people) {
        notFound();
    }

    return (
        <section>
            <RandomAd />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                    <Users />
                    Top People
                </h1>
            </div>
            {people.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {people.map(person => (
                        <PersonCard key={person.mal_id} person={person} />
                    ))}
                </div>
            ) : (
                <p>No people found.</p>
            )}
        </section>
    );
}
