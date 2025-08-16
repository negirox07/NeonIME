import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Star, Tv, Film, Calendar, BarChart as BarChartIcon, BookOpen, ThumbsUp, Users, Newspaper, Info } from 'lucide-react';
import { format } from 'date-fns';

import type { JikanAPIResponse, Anime, AnimeRecommendation, Character, News, AnimeStatistics } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnimeGrid } from '@/components/anime/anime-grid';
import { CharacterCard } from '@/components/anime/character-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { StatisticsChart } from '@/components/anime/statistics-chart';

interface AnimePageProps {
  params: {
    id: string;
  };
}

async function getAnimeDetails(id: string): Promise<Anime | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
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

async function getAnimeRecommendations(id: string): Promise<AnimeRecommendation[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
    if (!res.ok) {
      console.error(`Failed to fetch recommendations for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<AnimeRecommendation[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching recommendations for ${id}:`, error);
    return [];
  }
}

async function getAnimeCharacters(id: string): Promise<Character[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
    if (!res.ok) {
      console.error(`Failed to fetch characters for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<Character[]> = await res.json();
    // Only show main characters
    return data.data.filter(c => c.role === 'Main').slice(0, 12);
  } catch (error) {
    console.error(`Error fetching characters for ${id}:`, error);
    return [];
  }
}

async function getAnimeNews(id: string): Promise<News[]> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`);
    if (!res.ok) {
      console.error(`Failed to fetch news for ${id}:`, res.status, await res.text());
      return [];
    }
    const data: JikanAPIResponse<News[]> = await res.json();
    return data.data.slice(0, 6); // Get latest 6 news
  } catch (error) {
    console.error(`Error fetching news for ${id}:`, error);
    return [];
  }
}

async function getAnimeStatistics(id: string): Promise<AnimeStatistics | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/statistics`);
    if (!res.ok) {
      console.error(`Failed to fetch statistics for ${id}:`, res.status, await res.text());
      return null;
    }
    const data: JikanAPIResponse<AnimeStatistics> = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching statistics for ${id}:`, error);
    return null;
  }
}


export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const anime = await getAnimeDetails(params.id);
  if (!anime) {
    return { title: 'Anime not found' };
  }
  return {
    title: `${anime.title_english || anime.title} - NeonIME`,
    description: anime.synopsis?.substring(0, 150) || 'Anime details on NeonIME',
  };
}

const InfoBadge = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string | number | null | undefined }) => {
    if (!value) return null;
    const Icon = icon;
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card text-center">
            <Icon className="w-6 h-6 mb-2 text-accent" />
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-bold font-headline text-lg">{value}</p>
        </div>
    );
};

export default async function AnimePage({ params }: AnimePageProps) {
  const [anime, recommendations, characters, news, statistics] = await Promise.all([
    getAnimeDetails(params.id),
    getAnimeRecommendations(params.id),
    getAnimeCharacters(params.id),
    getAnimeNews(params.id),
    getAnimeStatistics(params.id),
  ]);

  if (!anime) {
    notFound();
  }

  const recommendationList = recommendations.map(rec => ({
    mal_id: rec.entry.mal_id,
    title: rec.entry.title,
    images: rec.entry.images,
  }));
  
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Image
            src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
            alt={`Poster for ${anime.title}`}
            width={300}
            height={450}
            className="rounded-lg shadow-lg w-full"
            priority
            data-ai-hint="anime poster"
          />
        </div>
        <div className="md:col-span-3 space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">{anime.title_english || anime.title}</h1>
          <p className="text-xl text-muted-foreground">{anime.title_japanese}</p>
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>
            ))}
            {anime.themes.map((theme) => (
              <Badge key={theme.mal_id} variant="outline">{theme.name}</Badge>
            ))}
          </div>
          <Separator className="my-4"/>
          <p className="text-foreground/90 leading-relaxed font-body">{anime.synopsis}</p>
        </div>
      </section>
      
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <InfoBadge icon={Star} label="Score" value={anime.score ? `${anime.score} / 10` : 'N/A'} />
        <InfoBadge icon={BarChartIcon} label="Rank" value={anime.rank ? `#${anime.rank}` : 'N/A'} />
        <InfoBadge icon={ThumbsUp} label="Popularity" value={anime.popularity ? `#${anime.popularity}` : 'N/A'} />
        <InfoBadge icon={anime.type === 'TV' ? Tv : Film} label="Type" value={anime.type} />
        <InfoBadge icon={BookOpen} label="Episodes" value={anime.episodes || 'N/A'} />
        <InfoBadge icon={Calendar} label="Aired" value={anime.aired.string} />
      </section>

      {statistics && (
        <section>
          <StatisticsChart statistics={statistics} />
        </section>
      )}

      {characters.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
            <Users />
            Main Characters
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {characters.map(character => (
              <CharacterCard key={character.character.mal_id} character={character} />
            ))}
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline text-primary flex items-center gap-2">
            <Newspaper />
            Recent News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(article => (
              <Link href={article.url} key={article.mal_id} target="_blank" rel="noopener noreferrer" className="group block">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1">
                  <div className="aspect-video relative">
                     <Image
                        src={article.images.jpg.image_url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        data-ai-hint="news article"
                      />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{format(new Date(article.date), 'PPP')}</p>
                    <h3 className="font-bold font-headline line-clamp-2 text-lg text-foreground/90 group-hover:text-primary">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {anime.trailer?.embed_url && (
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline text-primary">Trailer</h2>
          <div className="aspect-video">
            <iframe
              src={anime.trailer.embed_url.replace('autoplay=1', 'autoplay=0')}
              title="Anime Trailer"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </section>
      )}

      {recommendationList.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline text-primary">You Might Also Like</h2>
          <AnimeGrid animeList={recommendationList} />
        </section>
      )}
    </div>
  );
}
