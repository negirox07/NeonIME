import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader } from '@/components/ui/card';
import type { ClubMember, UserMeta } from '@/lib/types';

interface UserCardProps {
  user: ClubMember | UserMeta;
}

export function UserCard({ user }: UserCardProps) {
    const imageUrl = 'image_url' in user ? user.image_url : user.images.jpg.image_url;
    
  return (
    <Link href={user.url} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[1/1] relative">
            <Image
              src={imageUrl || 'https://placehold.co/200x200.png'}
              alt={`Image of ${user.username}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              data-ai-hint="user avatar"
            />
          </div>
        </CardHeader>
        <div className="p-2 text-center">
            <p className="text-sm font-semibold truncate font-headline" title={user.username}>
                {user.username}
            </p>
        </div>
      </Card>
    </Link>
  );
}
