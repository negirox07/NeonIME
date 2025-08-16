import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { StaffMember } from '@/lib/types';
import { Badge } from '../ui/badge';

interface StaffCardProps {
  staffMember: StaffMember;
}

export function StaffCard({ staffMember }: StaffCardProps) {
  return (
    <Link href={staffMember.person.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={staffMember.person.images.jpg.image_url || 'https://placehold.co/200x300.png'}
              alt={`Image of ${staffMember.person.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="person photo"
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 text-center flex-grow flex flex-col justify-between">
            <div>
                <p className="text-sm font-semibold truncate font-headline" title={staffMember.person.name}>
                    {staffMember.person.name}
                </p>
            </div>
            <div className="mt-1">
                {staffMember.positions.slice(0, 2).map(position => (
                    <p key={position} className='text-xs text-muted-foreground truncate' title={position}>
                        {position}
                    </p>
                ))}
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
