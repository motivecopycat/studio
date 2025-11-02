
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ShareLinkInputSchema = z.object({
  linkName: z.string().describe('The name of the affiliate link.'),
  linkUrl: z.string().url().describe('The URL of the affiliate link.'),
  friendName: z.string().describe("The name of the friend to share the link with."),
  customMessage: z.string().optional().describe('An optional custom message from the user.'),
});

export type ShareLinkInput = z.infer<typeof ShareLinkInputSchema>;

export const ShareLinkOutputSchema = z.object({
  generatedMessage: z.string().describe('The AI-generated message to be shared.'),
});

export type ShareLinkOutput = z.infer<typeof ShareLinkOutputSchema>;

const sharePrompt = ai.definePrompt({
    name: 'sharePrompt',
    input: { schema: ShareLinkInputSchema },
    output: { schema: ShareLinkOutputSchema },
    prompt: `You are a friendly and helpful assistant. A user wants to share an affiliate link with their friend, {{friendName}}.

    Link Details:
    - Name: {{linkName}}
    - URL: {{linkUrl}}
    
    User's custom message: "{{customMessage}}"
    
    Your task is to generate a friendly and engaging message that the user can send to their friend.
    - Start by greeting the friend by their name.
    - Naturally incorporate the user's custom message if they provided one. If not, create a warm opening.
    - Briefly explain what the link is about and why it might be interesting for them.
    - Make sure to include the affiliate link in the message.
    - Keep the tone casual and persuasive, like a real recommendation from a friend.
    
    Return only the generated message in the 'generatedMessage' field.`,
});

const shareLinkFlow = ai.defineFlow(
  {
    name: 'shareLinkFlow',
    inputSchema: ShareLinkInputSchema,
    outputSchema: ShareLinkOutputSchema,
  },
  async (input) => {
    const { output } = await sharePrompt(input);
    return output!;
  }
);

export async function shareLink(input: ShareLinkInput): Promise<ShareLinkOutput> {
  return shareLinkFlow(input);
}
