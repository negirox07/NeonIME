import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Users, Calendar, Shield, Info, ChevronRight, Group } from 'lucide-react';
import { format } from 'date-fns';

import type { Club } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getClubById } from '@/services/jikan';
import RandomAd from '@/components/RandomAd';


interface ClubPageProps {
  params: {
    id: string;
  };
}

async function getClubDetails(id: string): Promise<Club | null> {
    const response = await getClubById(id);
    return response?.data ?? null;
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const club = await getClubDetails(params.id);
  if (!club) {
    return { title: 'Club not found' };
  }
  return {
    title: `${club.name} - NeonIME`,
    description: `Details for the club ${club.name} on NeonIME.`,
  };
}

const InfoCard = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string | number | null | undefined }) => {
    if (!value) return null;
    const Icon = icon;
    return (
        <Card className="flex flex-col items-center justify-center p-4 rounded-lg bg-card text-center">
            <Icon className="w-8 h-8 mb-2 text-accent" />
            <p className="font-bold font-headline text-lg">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </Card>
    );
};

export default async function ClubPage({ params }: ClubPageProps) {
  const club = await getClubDetails(params.id);

  if (!club) {
    notFound();
  }
  
  return (
    <div className="space-y-12">
        <RandomAd />
        <section className="flex flex-col items-center text-center">
            <Image
                src={club.images.jpg.image_url}
                alt={`Logo for ${club.name}`}
                width={150}
                height={150}
                className="rounded-lg shadow-lg mb-6"
                priority
                data-ai-hint="club logo"
            />
            <h1 className="text-4xl font-bold font-headline text-primary">{club.name}</h1>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Badge variant="secondary" className="capitalize">{club.category}</Badge>
                <Badge variant="outline" className="capitalize">{club.access}</Badge>
            </div>
        </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <InfoCard icon={Users} label="Members" value={club.members.toLocaleString()} />
        <InfoCard icon={Calendar} label="Created" value={format(new Date(club.created), 'PPP')} />
        <InfoCard icon={Group} label="Category" value={club.category} />
      </section>

      <section className="max-w-4xl mx-auto">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
                <Users /> Club Members
            </h3>
            <p className="text-muted-foreground mb-4">See who is part of the {club.name} community.</p>
            <Button asChild>
                <Link href={`/clubs/${club.mal_id}/members`}>
                    View All Members <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
        </Card>
      </section>
    </div>
  );
}
