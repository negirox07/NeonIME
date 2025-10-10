import Link from 'next/link';
import Image from 'next/image';
import { Users, Group } from 'lucide-react';
import type { Club } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.mal_id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0 items-center pt-4">
            <Image
              src={club.images.jpg.image_url}
              alt={`Logo for ${club.name}`}
              width={80}
              height={80}
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
              data-ai-hint="club logo"
            />
        </CardHeader>
        <CardContent className="p-4 text-center">
          <CardTitle className="text-base line-clamp-2 font-headline h-12">
            {club.name}
          </CardTitle>
           <Badge variant="outline" className="mt-2 capitalize">{club.category}</Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-center items-center">
            <Badge variant="secondary" className="font-bold bg-accent/20 text-accent hover:bg-accent/30">
              <Users className="w-3 h-3 mr-1.5 text-accent" />
              {club.members.toLocaleString()}
            </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
