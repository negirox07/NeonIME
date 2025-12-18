import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Image as ImageIcon, ChevronLeft } from 'lucide-react';
import type { Person, Picture } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getPersonById, getPersonPictures as getPictures } from '@/services/jikan';

interface PicturesPageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    const response = await getPersonById(id);
    return response?.data ?? null;
}

async function getPersonPictures(id: string): Promise<Picture[]> {
    const response = await getPictures(id);
    return response?.data ?? [];
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
