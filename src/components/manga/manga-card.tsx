import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Manga } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MangaCardProps {
  manga: Manga;
}

export function MangaCard({ manga }: MangaCardProps) {
  return (
    <Link href={`/manga/${manga.mal_id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={manga.images?.webp?.large_image_url || manga.images?.jpg?.large_image_url || 'https://placehold.co/300x450.png'}
              alt={`Cover for ${manga.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              data-ai-hint="manga cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base line-clamp-2 font-headline h-12">
            {manga.title_english || manga.title}
          </CardTitle>
        </CardContent>
        {manga.score && (
           <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <Badge variant="secondary" className="font-bold bg-accent/20 text-accent hover:bg-accent/30">
              <Star className="w-3 h-3 mr-1.5 text-accent fill-current" />
              {manga.score.toFixed(2)}
            </Badge>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
