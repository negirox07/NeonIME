import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { PromoVideo, VideoEpisode } from '@/lib/types';
import { PlayCircle } from 'lucide-react';

interface VideoCardProps {
  video: PromoVideo['trailer'] | VideoEpisode;
  title?: string;
}

export function VideoCard({ video, title }: VideoCardProps) {
    const videoUrl = 'url' in video ? video.url : '';
    const imageUrl = video.images?.large_image_url || video.images?.image_url || video.images?.medium_image_url || video.images?.small_image_url || 'https://placehold.co/320x180.png';
    const displayTitle = title || ('title' in video ? video.title : 'Video');
    const episode = 'episode' in video ? video.episode : undefined;
  
    return (
    <Link href={videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={imageUrl}
              alt={`Thumbnail for ${displayTitle}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint="video thumbnail"
            />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-12 h-12 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
            <p className="font-semibold line-clamp-2 font-headline text-foreground/90 group-hover:text-primary" title={displayTitle}>
                {episode && <span className="font-bold text-accent">{episode} - </span>}
                {displayTitle}
            </p>
        </CardContent>
      </Card>
    </Link>
  );
}