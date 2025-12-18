import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen, ChevronLeft } from 'lucide-react';
import type { Person, PersonManga } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PersonMangaCard } from '@/components/person/person-manga-card';
import { getPersonById, getPersonManga as getMangaWorks } from '@/services/jikan';

interface PersonMangaPageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    const response = await getPersonById(id);
    return response?.data ?? null;
}

async function getPersonManga(id: string): Promise<PersonManga[]> {
    const response = await getMangaWorks(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: PersonMangaPageProps): Promise<Metadata> {
    const person = await getPersonDetails(params.id);
    if (!person) {
      return { title: 'Person not found' };
    }
    return {
      title: `Manga Works by ${person.name} - NeonIME`,
      description: `Browse all manga works by ${person.name}.`,
    };
}

export default async function PersonMangaPage({ params }: PersonMangaPageProps) {
  const person = await getPersonDetails(params.id);
  const mangaWorks = await getPersonManga(params.id);

  if (!person) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <BookOpen />
                Manga Works by {person.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/people/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Person
                </Link>
            </Button>
        </div>
      {mangaWorks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {mangaWorks.map(role => (
            <PersonMangaCard key={`${role.manga.mal_id}-${role.position}`} role={role} />
          ))}
        </div>
      ) : (
        <p>No manga works found for this person.</p>
      )}
    </section>
  );
}
