import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader } from '@/components/ui/card';
import type { VoiceActor } from '@/lib/types';

interface VoiceActorCardProps {
  voiceActor: VoiceActor;
}

export function VoiceActorCard({ voiceActor }: VoiceActorCardProps) {
  return (
    <Link href={voiceActor.person.url} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={voiceActor.person.images.jpg.image_url || 'https://placehold.co/200x300.png'}
              alt={`Image of ${voiceActor.person.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="person photo"
            />
          </div>
        </CardHeader>
        <div className="p-2 text-center">
            <p className="text-sm font-semibold truncate font-headline" title={voiceActor.person.name}>
                {voiceActor.person.name}
            </p>
            <p className="text-xs text-muted-foreground">{voiceActor.language}</p>
        </div>
      </Card>
    </Link>
  );
}