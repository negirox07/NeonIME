import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Image as ImageIcon, ChevronLeft } from 'lucide-react';
import type { Manga, Picture } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getMangaById, getMangaPictures as getPictures } from '@/services/jikan';

interface PicturesPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    const response = await getMangaById(id);
    return response?.data ?? null;
}

async function getMangaPictures(id: string): Promise<Picture[]> {
    const response = await getPictures(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: PicturesPageProps): Promise<Metadata> {
    const manga = await getMangaDetails(params.id);
    if (!manga) {
      return { title: 'Pictures not found' };
    }
    return {
      title: `Pictures for ${manga.title_english || manga.title} - NeonIME`,
      description: `View pictures for ${manga.title_english || manga.title}.`,
    };
}

export default async function PicturesPage({ params }: PicturesPageProps) {
  const manga = await getMangaDetails(params.id);
  const pictures = await getMangaPictures(params.id);

  if (!manga) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <ImageIcon />
                Pictures for {manga.title_english || manga.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/manga/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Manga
                </Link>
            </Button>
        </div>
      {pictures.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pictures.map((pic, index) => (
            <div key={index} className="aspect-w-9 aspect-h-16 relative rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src={pic.webp.large_image_url || pic.jpg.large_image_url}
                    alt={`Picture ${index + 1} for ${manga.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    data-ai-hint="manga page"
                />
            </div>
          ))}
        </div>
      ) : (
        <p>No pictures found for this manga.</p>
      )}
    </section>
  );
}
