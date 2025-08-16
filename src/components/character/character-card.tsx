import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Character } from '@/lib/types';
import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.mal_id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={character.images.webp.image_url || character.images.jpg.image_url || 'https://placehold.co/200x300.png'}
              alt={`Image of ${character.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="anime character"
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 text-center">
            <p className="text-sm font-semibold truncate font-headline" title={character.name}>
                {character.name}
            </p>
        </CardContent>
         <CardFooter className="p-2 pt-0 flex justify-center">
            <Badge variant="secondary" className="font-bold bg-accent/20 text-accent hover:bg-accent/30">
              <Star className="w-3 h-3 mr-1.5 text-accent fill-current" />
              {character.favorites.toLocaleString()}
            </Badge>
          </CardFooter>
      </Card>
    </Link>
  );
}
