import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnimeCharacter } from '@/lib/types';

interface CharacterCardProps {
  character: AnimeCharacter;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={character.character.url} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={character.character.images.webp.image_url || character.character.images.jpg.image_url || 'https://placehold.co/200x300.png'}
              alt={`Image of ${character.character.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="anime character"
            />
          </div>
        </CardHeader>
        <div className="p-2 text-center">
            <p className="text-sm font-semibold truncate font-headline" title={character.character.name}>
                {character.character.name}
            </p>
            <p className="text-xs text-muted-foreground">{character.role}</p>
        </div>
      </Card>
    </Link>
  );
}
