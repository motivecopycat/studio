
'use server';

import { shareLinkSchemas } from './share-link-schemas';

export async function shareLink(input: (typeof shareLinkSchemas.input)) {
  const { linkName, friendName, customMessage } = input;
  
  // This is a temporary design that returns a hardcoded message
  // without calling the Gemini API.
  let message = `Hey ${friendName}, check out this link: ${linkName}`;
  if (customMessage) {
    message = `${customMessage}\n\n${message}`;
  }

  return { generatedMessage: message };
}


    