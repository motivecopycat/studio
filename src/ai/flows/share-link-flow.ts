
'use server';

import type { ShareLinkInput, ShareLinkOutput } from './share-link-types';

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
