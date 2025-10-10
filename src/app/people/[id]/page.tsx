import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Person } from '@/lib/types';
import { Heart, Briefcase, ChevronRight, Mic2, BookOpen, Image as ImageIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import RandomAd from '@/components/RandomAd';
import { getPersonById } from '@/services/jikan';

interface PersonPageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    const response = await getPersonById(id);
    return response?.data ?? null;
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
    const person = await getPersonDetails(params.id);
    if (!person) {
      return { title: 'Person not found' };
    }
    return {
      title: `${person.name} - NeonIME`,
      description: person.about?.substring(0, 150) || `Information about ${person.name} on NeonIME.`,
    };
}

export default async function PersonPage({ params }: PersonPageProps) {
    const person = await getPersonDetails(params.id);

    if (!person) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <RandomAd />
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Image
                        src={person.images.jpg.image_url || 'https://placehold.co/300x450.png'}
                        alt={`Portrait of ${person.name}`}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg w-full"
                        priority
                        data-ai-hint="person photo"
                    />
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-headline text-accent flex items-center gap-2">
                                <Heart /> Favorites
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{person.favorites.toLocaleString()}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-3 space-y-4">
                    <h1 className="text-4xl font-bold font-headline text-primary">{person.name}</h1>
                    {person.given_name && <p className="text-xl text-muted-foreground">{person.given_name} {person.family_name}</p>}
                    {person.alternate_names && person.alternate_names.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {person.alternate_names.map((nick) => (
                                <Badge key={nick} variant="secondary">{nick}</Badge>
                            ))}
                        </div>
                    )}
                    <Separator className="my-4"/>
                    <h2 className="text-2xl font-bold font-headline text-accent">About</h2>
                    <div className="prose prose-invert max-w-none prose-p:text-foreground/90">
                        {person.about ? (
                             person.about.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : <p>No biography available.</p>}
                    </div>
                </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <Mic2 /> Voice Acting Roles
                    </h3>
                    <Button asChild>
                        <Link href={`/people/${person.mal_id}/voices`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>

                 <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <Briefcase /> Anime Staff
                    </h3>
                    <Button asChild>
                        <Link href={`/people/${person.mal_id}/anime`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>
                <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <BookOpen /> Manga Works
                    </h3>
                    <Button asChild>
                        <Link href={`/people/${person.mal_id}/manga`}>
                            View All <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>
                 <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                        <ImageIcon /> Pictures
                    </h3>
                    <Button asChild>
                        <Link href={`/people/${person.mal_id}/pictures`}>
                            View Gallery <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </Card>
            </div>
        </div>
    )
}
