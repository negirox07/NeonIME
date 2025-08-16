'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateRecommendationsAction } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const initialState = {
  success: false,
  message: '',
  recommendations: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <> <Wand2 className="mr-2 h-4 w-4" /> Generate Recommendations</>}
    </Button>
  );
}

export function RecommendationsForm() {
  const [state, formAction] = useFormState(generateRecommendationsAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline text-primary">Find Your Next Favorite Anime</CardTitle>
            <CardDescription>
              Tell us what you've watched and what you like, and our AI will suggest something new for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="viewingHistory" className="font-semibold">Viewing History</label>
              <Textarea
                id="viewingHistory"
                name="viewingHistory"
                placeholder="e.g., I've watched Naruto, Bleach, and One Piece. I enjoyed the long-running shonen series with lots of action and character development."
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="preferences" className="font-semibold">Preferences</label>
              <Textarea
                id="preferences"
                name="preferences"
                placeholder="e.g., I'm looking for something with a complex plot, maybe in a sci-fi or fantasy setting. I prefer series over movies. I dislike romance-focused stories."
                rows={5}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        {state.message && !state.success && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        
        {state.recommendations ? (
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-headline text-accent">Here are your recommendations!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert prose-p:text-foreground/90 prose-headings:text-accent prose-strong:text-primary">
                {state.recommendations.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
           <Card className="flex items-center justify-center h-full border-dashed">
            <div className="text-center text-muted-foreground p-8">
              <Wand2 className="mx-auto h-12 w-12 mb-4" />
              <p>Your recommendations will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
