import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [/* googleAI() */], // Temporarily removed for design purposes
  model: 'googleai/gemini-2.5-flash',
});
