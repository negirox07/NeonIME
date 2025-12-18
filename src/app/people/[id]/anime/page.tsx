import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Briefcase, ChevronLeft } from 'lucide-react';
import type { Person } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PersonAnimeCard } from '@/components/person/person-anime-card';
import { getPersonById, getPersonAnime as getAnimeRoles } from '@/services/jikan';

interface PersonAnimePageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    const response = await getPersonById(id);
    return response?.data ?? null;
}

async function getPersonAnime(id: string): Promise<Person['anime']> {
    const response = await getAnimeRoles(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: PersonAnimePageProps): Promise<Metadata> {
    const person = await getPersonDetails(params.id);
    if (!person) {
      return { title: 'Person not found' };
    }
    return {
      title: `Anime Staff Roles for ${person.name} - NeonIME`,
      description: `Browse all anime staff roles for ${person.name}.`,
    };
}

export default async function PersonAnimePage({ params }: PersonAnimePageProps) {
  const person = await getPersonDetails(params.id);
  const animeRoles = await getPersonAnime(params.id);

  if (!person) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Briefcase />
                Anime Staff Roles for {person.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/people/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Person
                </Link>
            </Button>
        </div>
      {animeRoles.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {animeRoles.map(role => (
            <PersonAnimeCard key={`${role.anime.mal_id}-${role.position}`} role={role} />
          ))}
        </div>
      ) : (
        <p>No anime staff roles found for this person.</p>
      )}
    </section>
  );
}
