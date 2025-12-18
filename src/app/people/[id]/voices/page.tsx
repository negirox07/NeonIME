import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mic2, ChevronLeft } from 'lucide-react';
import type { Person } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PersonVoiceRoleCard } from '@/components/person/person-voice-role-card';
import { getPersonById, getPersonVoices as getVoices } from '@/services/jikan';

interface PersonVoicesPageProps {
  params: {
    id: string;
  };
}

async function getPersonDetails(id: string): Promise<Person | null> {
    const response = await getPersonById(id);
    return response?.data ?? null;
}

async function getPersonVoices(id: string): Promise<Person['voices']> {
    const response = await getVoices(id);
    return response?.data ?? [];
}

export async function generateMetadata({ params }: PersonVoicesPageProps): Promise<Metadata> {
    const person = await getPersonDetails(params.id);
    if (!person) {
      return { title: 'Person not found' };
    }
    return {
      title: `Voice Acting Roles for ${person.name} - NeonIME`,
      description: `Browse all voice acting roles for ${person.name}.`,
    };
}

export default async function PersonVoicesPage({ params }: PersonVoicesPageProps) {
  const person = await getPersonDetails(params.id);
  const voiceRoles = await getPersonVoices(params.id);

  if (!person) {
    notFound();
  }

  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary flex items-center gap-2">
                <Mic2 />
                Voice Acting Roles for {person.name}
            </h1>
            <Button asChild variant="outline">
                <Link href={`/people/${params.id}`}>
                    <ChevronLeft className="w-4 h-4 mr-2"/>
                    Back to Person
                </Link>
            </Button>
        </div>
      {voiceRoles.length > 0 ? (
        <div className="space-y-4">
          {voiceRoles.map(role => (
            <PersonVoiceRoleCard key={`${role.anime.mal_id}-${role.character.mal_id}`} role={role} />
          ))}
        </div>
      ) : (
        <p>No voice acting roles found for this person.</p>
      )}
    </section>
  );
}
