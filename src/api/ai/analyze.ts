```typescript
import { Together } from '@together-ai/sdk';
import { StreamingTextResponse } from 'ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { code, type } = await req.json();

  const systemPrompts = {
    security: `Analyze this smart contract for security vulnerabilities. Focus on:
      1. Reentrancy vulnerabilities
      2. Integer overflow/underflow
      3. Access control issues
      4. Gas limitations
      5. Front-running possibilities`,
    gas: `Analyze this smart contract for gas optimization opportunities. Focus on:
      1. Storage optimization
      2. Loop optimization
      3. Function optimization
      4. State variable access patterns`,
    audit: `Perform a comprehensive smart contract audit. Include:
      1. Security vulnerabilities
      2. Gas optimization
      3. Code quality
      4. Best practices
      5. Documentation completeness`
  };

  const fullPrompt = `<s>[INST] ${systemPrompts[type as keyof typeof systemPrompts]}

${code} [/INST]</s>`;

  const response = await together.complete({
    prompt: fullPrompt,
    model: 'togethercomputer/llama-2-70b-chat',
    max_tokens: 4000,
    temperature: 0.3,
    top_p: 0.7,
    stream: true,
  });

  return new StreamingTextResponse(response);
}
```