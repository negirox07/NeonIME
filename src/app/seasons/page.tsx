import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, ChevronRight } from 'lucide-react';
import type { JikanAPIResponse, Season } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Anime Seasons - NeonIME',
  description: 'Browse anime by seasons and years.',
};

async function getSeasons(): Promise<Season[]> {
  try {
    const res = await fetch('https://api.jikan.moe/v4/seasons', {
      next: { revalidate: 86400 }, // Revalidate once a day
    });
    if (!res.ok) {
      console.error('Failed to fetch seasons:', res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Season[]> = await res.json();
    // sort seasons descending by year
    return data.data.sort((a, b) => b.year - a.year);
  } catch (error) {
    console.error('Error fetching seasons:', error);
    return [];
  }
}

export default async function SeasonsPage() {
  const seasons = await getSeasons();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
        <Calendar />
        Browse by Season
      </h1>
      <div className="space-y-8">
        {seasons.map(({ year, seasons }) => (
          <Card key={year}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">{year}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {seasons.map((season) => (
                <Button key={season} asChild variant="outline" className="capitalize justify-between">
                  <Link href={`/seasons/${year}/${season}`}>
                    {season}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
