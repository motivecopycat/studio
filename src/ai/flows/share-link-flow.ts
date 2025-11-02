
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

export async function shareLink(input: ShareLinkInput): Promise<ShareLinkOutput> {
  // Temporary fallback without AI
  let message = `Hey ${input.friendName},\n\n`;
  if (input.customMessage) {
    message += `${input.customMessage}\n\n`;
  } else {
    message += `I found this cool link and thought you might like it!\n\n`;
  }
  message += `Check out "${input.linkName}" here: ${input.linkUrl}`;
  
  return { generatedMessage: message };
}
