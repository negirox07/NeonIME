'use server';

import { generateRecommendations as generateRecommendationsFlow, GenerateRecommendationsInput } from '@/ai/flows/generate-recommendations';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const schema = z.object({
  viewingHistory: z.string().min(10, 'Please provide more details about your viewing history.'),
  preferences: z.string().min(10, 'Please describe your preferences in more detail.'),
});

interface FormState {
  success: boolean;
  message: string;
  recommendations?: string;
}

export async function generateRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = schema.safeParse({
    viewingHistory: formData.get('viewingHistory'),
    preferences: formData.get('preferences'),
  });

  if (!validatedFields.success) {
    const error = fromZodError(validatedFields.error);
    return { success: false, message: error.toString() };
  }

  try {
    const input: GenerateRecommendationsInput = validatedFields.data;
    const result = await generateRecommendationsFlow(input);
    
    return {
      success: true,
      message: 'Recommendations generated successfully!',
      recommendations: result.recommendations,
    };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
