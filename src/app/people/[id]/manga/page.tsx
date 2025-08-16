import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Person, PersonManga } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PersonMangaCard } from '@/components/person/person-manga-card';

interface PersonMangaPageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/people/${id}`);
        if (!res.ok) {
            if (res.status === 404) return null;
            console.error(`Failed to fetch person ${id}:`, res.status, await res.text());
            return null;
        }
        const data: JikanAPIResponse<Person> = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching person ${id}:`, error);
        return null;
    }
}

async function getPersonManga(id: string): Promise<PersonManga[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/people/${id}/manga`);
    if (!res.ok) {
      console.error(`Failed to fetch manga for person ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<PersonManga[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching manga for person ${id}:`, error);
    return [];
  }
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
