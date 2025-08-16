import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Person } from '@/lib/types';
import { Badge } from '../ui/badge';

interface PersonVoiceRoleCardProps {
    role: Person['voices'][0];
}

export function PersonVoiceRoleCard({ role }: PersonVoiceRoleCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1">
        <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
                <Link href={`/anime/${role.anime.mal_id}`} className="group/image">
                    <Image 
                        src={role.anime.images.webp.image_url || 'https://placehold.co/60x90.png'} 
                        alt={`Poster for ${role.anime.title}`} 
                        width={60} 
                        height={90} 
                        className="rounded-md shadow-md transition-transform duration-300 group-hover/image:scale-105"
                        data-ai-hint="anime poster"
                    />
                </Link>
                <div>
                    <Link href={`/anime/${role.anime.mal_id}`} className="group/link">
                        <p className="font-bold text-foreground/90 group-hover/link:text-primary">{role.anime.title}</p>
                    </Link>
                    <Badge variant="secondary" className="mt-1">{role.role}</Badge>
                </div>
            </div>
            <div className="flex items-center gap-4 text-right">
                 <div>
                    <Link href={`/characters/${role.character.mal_id}`} className="group/link">
                        <p className="font-bold text-foreground/90 group-hover/link:text-primary text-right">{role.character.name}</p>
                    </Link>
                </div>
                <Link href={`/characters/${role.character.mal_id}`} className="group/image">
                    <Image 
                        src={role.character.images.webp.image_url || 'https://placehold.co/60x90.png'} 
                        alt={`Poster for ${role.character.name}`} 
                        width={60} 
                        height={90} 
                        className="rounded-md shadow-md transition-transform duration-300 group-hover/image:scale-105"
                        data-ai-hint="anime character"
                    />
                 </Link>
            </div>
        </CardContent>
    </Card>
  );
}
