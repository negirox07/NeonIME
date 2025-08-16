import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Image as ImageIcon, ChevronLeft } from 'lucide-react';
import type { JikanAPIResponse, Anime, Picture } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PicturesPageProps {
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

async function getAnimePictures(id: string): Promise<Picture[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`);
    if (!res.ok) {
      console.error(`Failed to fetch pictures for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Picture[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching pictures for ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: PicturesPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Pictures not found' };
    }
    return {
      title: `Pictures for ${anime.title_english || anime.title} - NeonIME`,
      description: `View pictures for ${anime.title_english || anime.title}.`,
    };
}

export default async function PicturesPage({ params }: PicturesPageProps) {
  const anime = await getAnimeDetails(params.id);
  const pictures = await getAnimePictures(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <ImageIcon />
                Pictures for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
      {pictures.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pictures.map((pic, index) => (
            <div key={index} className="aspect-w-9 aspect-h-16 relative rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src={pic.webp.large_image_url || pic.jpg.large_image_url}
                    alt={`Picture ${index + 1} for ${anime.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    data-ai-hint="anime screenshot"
                />
            </div>
          ))}
        </div>
      ) : (
        <p>No pictures found for this anime.</p>
      )}
    </section>
  );
}
