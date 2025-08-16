import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, ChevronRight, Snowflake, Sun, Leaf, Flower } from 'lucide-react';
import type { JikanAPIResponse, Season } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

const seasonStyles: { [key: string]: { icon: React.ElementType, style: string } } = {
    winter: { icon: Snowflake, style: 'from-blue-400/20 to-blue-500/20 border-blue-400/50 hover:border-blue-400' },
    spring: { icon: Flower, style: 'from-pink-400/20 to-pink-500/20 border-pink-400/50 hover:border-pink-400' },
    summer: { icon: Sun, style: 'from-yellow-400/20 to-yellow-500/20 border-yellow-400/50 hover:border-yellow-400' },
    fall: { icon: Leaf, style: 'from-orange-400/20 to-orange-500/20 border-orange-400/50 hover:border-orange-400' },
};

export default async function SeasonsPage() {
  const seasons = await getSeasons();

  return (
    <section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-primary tracking-tight">
            Browse Anime by Season
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore a vast collection of anime, organized by year and season. Your next favorite show is just a click away.
        </p>
      </div>
      <div className="space-y-12">
        {seasons.map(({ year, seasons }) => (
          <div key={year}>
            <h2 className="text-3xl font-bold font-headline text-accent mb-6 text-center">{year}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasons.map((season) => {
                const { icon: Icon, style } = seasonStyles[season] || { icon: Calendar, style: '' };
                return (
                    <Link href={`/seasons/${year}/${season}`} key={season}>
                        <div className={cn(
                            'group p-6 rounded-lg bg-card border-2 border-transparent transition-all duration-300 h-full flex flex-col justify-between items-center text-center',
                            'bg-gradient-to-br',
                            style
                        )}>
                            <Icon className="w-12 h-12 text-foreground/80 mb-4 transition-transform duration-300 group-hover:scale-110" />
                            <div>
                                <h3 className="text-2xl font-bold capitalize font-headline text-foreground/90">{season}</h3>
                                <p className="text-muted-foreground flex items-center justify-center gap-2 transition-all duration-300 group-hover:text-primary">
                                    View Season <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </p>
                            </div>
                        </div>
                    </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
