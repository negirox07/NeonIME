import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { Person } from '@/lib/types';
import { Badge } from '../ui/badge';

interface PersonAnimeCardProps {
  role: Person['anime'][0];
}

export function PersonAnimeCard({ role }: PersonAnimeCardProps) {
  return (
    <Link href={`/anime/${role.anime.mal_id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={role.anime.images.webp.image_url || role.anime.images.jpg.image_url || 'https://placehold.co/200x300.png'}
              alt={`Poster for ${role.anime.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="anime poster"
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 text-center flex-grow flex flex-col justify-between">
            <div>
                <p className="text-sm font-semibold truncate font-headline group-hover:text-primary" title={role.anime.title}>
                    {role.anime.title}
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
