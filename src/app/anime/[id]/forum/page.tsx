import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageSquare, ChevronLeft, ArrowRight } from 'lucide-react';
import type { JikanAPIResponse, Anime, ForumTopic } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface ForumPageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        console.error(`Failed to fetch anime ${id}:`, res.status, await res.text());
        return null;
      }
      const data: JikanAPIResponse<Anime> = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching anime ${id}:`, error);
      return null;
    }
}

async function getForumTopics(id: string): Promise<ForumTopic[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/forum`);
    if (!res.ok) {
      console.error(`Failed to fetch forum topics for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<ForumTopic[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching forum topics for ${id}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: ForumPageProps): Promise<Metadata> {
    const anime = await getAnimeDetails(params.id);
    if (!anime) {
      return { title: 'Forum not found' };
    }
    return {
      title: `Forum for ${anime.title_english || anime.title} - NeonIME`,
      description: `Browse forum topics for ${anime.title_english || anime.title}.`,
    };
}

export default async function ForumPage({ params }: ForumPageProps) {
  const anime = await getAnimeDetails(params.id);
  const topics = await getForumTopics(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <MessageSquare />
                Forum Topics for {anime.title_english || anime.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/anime/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Anime
                </Link>
            </Button>
        </div>
        {topics.length > 0 ? (
            <div className="space-y-4">
                {topics.map((topic) => (
                    <Link href={topic.url} key={topic.mal_id} target="_blank" rel="noopener noreferrer" className="group block">
                        <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-foreground/90 group-hover:text-primary">{topic.title}</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        by {topic.author_username} on {format(new Date(topic.date), 'PPP')} | {topic.comments} comments
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1" />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        ) : (
            <p>No forum topics found for this anime.</p>
        )}
    </section>
  );
}
