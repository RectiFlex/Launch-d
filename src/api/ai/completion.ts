```typescript
import { Together } from '@together-ai/sdk';
import { StreamingTextResponse } from 'ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt, projectContext } = await req.json();

  const systemPrompt = `You are an AI assistant specialized in blockchain development, smart contracts, and tokenomics. 
    You help developers create secure and efficient smart contracts, analyze tokenomics, and generate technical documentation.
    ${projectContext ? `Current project context: ${JSON.stringify(projectContext)}` : ''}`;

  const fullPrompt = `<s>[INST] ${systemPrompt}

${prompt} [/INST]</s>`;

  const response = await together.complete({
    prompt: fullPrompt,
    model: 'togethercomputer/llama-2-70b-chat',
    max_tokens: 4000,
    temperature: 0.7,
    top_p: 0.7,
    stream: true,
  });

  return new StreamingTextResponse(response);
}
```