import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { JikanAPIResponse, Person } from '@/lib/types';
import { Heart, Clapperboard, Briefcase } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PersonPageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/people/${id}/full`);
        if (!res.ok) {
            if (res.status === 404) return null;
            console.error(`Failed to fetch person ${id}:`, res.status, await res.text());
            return null;
        }
        const data: JikanAPIResponse<Person> = await res.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching person ${id}:`, error);
        return null;
    }
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

    const voiceRoles = person.voices || [];
    const animeStaff = person.anime || [];
    const mangaStaff = person.manga || [];

    return (
        <div className="space-y-12">
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
            
            {voiceRoles.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
                        <Clapperboard /> Voice Acting Roles
                    </h2>
                    <div className="space-y-4">
                        {voiceRoles.slice(0, 10).map(role => (
                            <Link href={`/anime/${role.anime.mal_id}`} key={`${role.anime.mal_id}-${role.character.mal_id}`} className="group block">
                                <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <Image src={role.anime.images.webp.image_url} alt={role.anime.title} width={40} height={60} className="rounded-md" data-ai-hint="anime poster" />
                                        <div className='flex-1'>
                                            <p className="font-bold text-foreground/90 group-hover:text-primary">{role.anime.title}</p>
                                            <p className="text-sm text-muted-foreground">{role.character.name} ({role.role})</p>
                                        </div>
                                         <Image src={role.character.images.webp.image_url} alt={role.character.name} width={40} height={60} className="rounded-md" data-ai-hint="anime character" />
                                    </CardContent>
                                </Card>
                             </Link>
                        ))}
                    </div>
                </section>
            )}

            {animeStaff.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
                        <Briefcase /> Anime Staff Positions
                    </h2>
                    <div className="space-y-4">
                        {animeStaff.slice(0,10).map(staff => (
                             <Link href={`/anime/${staff.anime.mal_id}`} key={`${staff.anime.mal_id}-${staff.position}`} className="group block">
                                <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <Image src={staff.anime.images.webp.image_url} alt={staff.anime.title} width={40} height={60} className="rounded-md" data-ai-hint="anime poster" />
                                        <div className='flex-1'>
                                            <p className="font-bold text-foreground/90 group-hover:text-primary">{staff.anime.title}</p>
                                            <p className="text-sm text-muted-foreground">{staff.position}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

             {mangaStaff.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
                        <Briefcase /> Manga Staff Positions
                    </h2>
                    <div className="space-y-4">
                        {mangaStaff.slice(0,10).map(staff => (
                             <a href={staff.manga.url} target="_blank" rel="noopener noreferrer" key={`${staff.manga.mal_id}-${staff.position}`} className="group block">
                                <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <Image src={staff.manga.images.webp.image_url} alt={staff.manga.title} width={40} height={60} className="rounded-md" data-ai-hint="manga cover" />
                                        <div className='flex-1'>
                                            <p className="font-bold text-foreground/90 group-hover:text-primary">{staff.manga.title}</p>
                                            <p className="text-sm text-muted-foreground">{staff.position}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
