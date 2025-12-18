import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link as LinkIcon, ChevronLeft } from 'lucide-react';
import type { Manga, MangaRelation, RelationEntry } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMangaById, getMangaRelations as getRelations } from '@/services/jikan';

interface RelationsPageProps {
  params: {
    id: string;
  };
}

async function getMangaDetails(id: string): Promise<Manga | null> {
    const response = await getMangaById(id);
    return response?.data ?? null;
}

async function getMangaRelations(id: string): Promise<MangaRelation[]> {
    const response = await getRelations(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: RelationsPageProps): Promise<Metadata> {
    const manga = await getMangaDetails(params.id);
    if (!manga) {
      return { title: 'Relations not found' };
    }
    return {
      title: `Relations for ${manga.title_english || manga.title} - NeonIME`,
      description: `Browse relations for ${manga.title_english || manga.title}.`,
    };
}

function RelationEntryCard({ entry }: { entry: RelationEntry }) {
    const link = entry.type === 'anime' ? `/anime/${entry.mal_id}` : `/manga/${entry.mal_id}`;
    return (
        <Link href={link} className="group block">
             <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                <CardContent className="p-3">
                    <p className="font-semibold text-foreground/90 group-hover:text-primary truncate">{entry.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{entry.type}</p>
                </CardContent>
            </Card>
        </Link>
    );
}

export default async function RelationsPage({ params }: RelationsPageProps) {
  const manga = await getMangaDetails(params.id);
  const relations = await getMangaRelations(params.id);

  if (!manga) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <LinkIcon />
                Relations for {manga.title_english || manga.title}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/manga/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Manga
                </Link>
            </Button>
        </div>
      {relations.length > 0 ? (
        <div className="space-y-8">
          {relations.map(relation => (
            <div key={relation.relation}>
                <h2 className="text-2xl font-bold font-headline text-accent mb-4">{relation.relation}</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {relation.entry.map(entry => (
                        <RelationEntryCard key={entry.mal_id} entry={entry} />
                    ))}
                </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No relations found for this manga.</p>
      )}
    </section>
  );
}
