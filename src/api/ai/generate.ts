```typescript
import { Together } from '@together-ai/sdk';
import { StreamingTextResponse } from 'ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { type, requirements, projectContext } = await req.json();

  const systemPrompts = {
    contract: `Generate a secure and optimized smart contract based on the following requirements.
      Include:
      1. Full implementation
      2. Security features
      3. Gas optimization
      4. Events and modifiers
      5. Detailed comments`,
    whitepaper: `Generate a comprehensive whitepaper for this blockchain project.
      Include:
      1. Executive Summary
      2. Problem Statement
      3. Technical Architecture
      4. Tokenomics
      5. Roadmap`,
    tokenomics: `Create a detailed tokenomics model based on the requirements.
      Include:
      1. Token distribution
      2. Vesting schedules
      3. Token utility
      4. Economic analysis`
  };

  const fullPrompt = `<s>[INST] ${systemPrompts[type as keyof typeof systemPrompts]}
    ${projectContext ? `Project context: ${JSON.stringify(projectContext)}` : ''}

${requirements} [/INST]</s>`;

  const response = await together.complete({
    prompt: fullPrompt,
    model: 'togethercomputer/llama-2-70b-chat',
    max_tokens: 4000,
    temperature: 0.5,
    top_p: 0.7,
    stream: true,
  });

  return new StreamingTextResponse(response);
}
```