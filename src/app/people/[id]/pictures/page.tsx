import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Image as ImageIcon, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Person, Picture } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PicturesPageProps {
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

async function getPersonPictures(id: string): Promise<Picture[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/people/${id}/pictures`);
    if (!res.ok) {
      console.error(`Failed to fetch pictures for person ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Picture[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching pictures for person ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: PicturesPageProps): Promise<Metadata> {
    const person = await getPersonDetails(params.id);
    if (!person) {
      return { title: 'Person not found' };
    }
    return {
      title: `Pictures of ${person.name} - NeonIME`,
      description: `View pictures of ${person.name}.`,
    };
}

export default async function PicturesPage({ params }: PicturesPageProps) {
  const person = await getPersonDetails(params.id);
  const pictures = await getPersonPictures(params.id);

  if (!person) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <ImageIcon />
                Pictures of {person.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/people/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Person
                </Link>
            </Button>
        </div>
      {pictures.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pictures.map((pic, index) => (
            <div key={index} className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src={pic.jpg.image_url}
                    alt={`Picture ${index + 1} for ${person.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    data-ai-hint="person photo"
                />
            </div>
          ))}
        </div>
      ) : (
        <p>No pictures found for this person.</p>
      )}
    </section>
  );
}
