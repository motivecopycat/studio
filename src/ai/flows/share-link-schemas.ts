
import { z } from 'zod';

export const shareLinkSchemas = {
  input: z.object({
    linkName: z.string().describe('The name of the link to share.'),
    friendName: z.string().describe("The name of the friend to share the link with."),
    customMessage: z.string().optional().describe('An optional custom message to include.'),
  }),
  output: z.object({
    generatedMessage: z.string().describe('The AI-generated message to be shared.'),
  }),
};

export type ShareLinkInput = z.infer<typeof shareLinkSchemas.input>;
export type ShareLinkOutput = z.infer<typeof shareLinkSchemas.output>;


    