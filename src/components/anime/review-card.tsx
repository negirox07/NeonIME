import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { AnimeReview } from '@/lib/types';
import { format, formatDistanceToNow } from 'date-fns';
import { Star, ThumbsUp, MessageSquareWarning, ShieldAlert } from 'lucide-react';

interface ReviewCardProps {
  review: AnimeReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50">
        <CardHeader className="flex flex-row items-center gap-4 bg-card/50 p-4">
            <Avatar>
                <AvatarImage src={review.user.images.webp.image_url} alt={review.user.username} />
                <AvatarFallback>{review.user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <a href={review.user.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary">
                    {review.user.username}
                </a>
                <p className="text-xs text-muted-foreground" title={format(new Date(review.date), 'PPpp')}>
                    {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-base font-bold">
                    <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                    {review.score}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <div className="prose prose-sm prose-invert max-w-none text-foreground/90">
                {review.review.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
        </CardContent>
        <CardFooter className="p-4 bg-card/50 flex items-center justify-between gap-4">
             <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> 
                    {review.reactions.nice.toLocaleString()}
                </span>
                {review.is_spoiler && (
                    <Badge variant="destructive" className="gap-1">
                        <MessageSquareWarning className="w-3 h-3"/> Spoiler
                    </Badge>
                )}
                 {review.is_preliminary && (
                    <Badge variant="secondary" className="gap-1 bg-accent/30 text-accent">
                        <ShieldAlert className="w-3 h-3"/> Preliminary
                    </Badge>
                )}
            </div>
            <div className="flex items-center gap-2">
                {review.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
            </div>
        </CardFooter>
    </Card>
  );
}
