import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { PersonManga } from '@/lib/types';
import { Badge } from '../ui/badge';

interface PersonMangaCardProps {
  role: PersonManga;
}

export function PersonMangaCard({ role }: PersonMangaCardProps) {
  return (
    <Link href={`https://myanimelist.net/manga/${role.manga.mal_id}`} target='_blank' rel='noopener noreferrer' className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={role.manga.images.webp.large_image_url || role.manga.images.jpg.large_image_url || 'https://placehold.co/200x300.png'}
              alt={`Cover for ${role.manga.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="manga cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 text-center flex-grow flex flex-col justify-between">
            <div>
                <p className="text-sm font-semibold truncate font-headline group-hover:text-primary" title={role.manga.title}>
                    {role.manga.title}
                </p>
            </div>
            <div className="mt-1">
                <Badge variant="secondary" className='text-xs' title={role.position}>
                    {role.position}
                </Badge>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
