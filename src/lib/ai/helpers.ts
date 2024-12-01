```typescript
import { PROMPTS } from './prompts';

export const formatPrompt = (template: string, variables: Record<string, any>) => {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key) => variables[key]?.toString() || match
  );
};

export const parseAIResponse = (response: string) => {
  try {
    return JSON.parse(response);
  } catch (error) {
    return {
      error: 'Failed to parse AI response',
      raw: response
    };
  }
};

export const sanitizeCode = (code: string) => {
  return code
    .replace(/```[a-z]*\n/g, '')
    .replace(/```/g, '')
    .trim();
};

export const generatePrompt = (type: keyof typeof PROMPTS, variables: Record<string, any>) => {
  const template = PROMPTS[type];
  if (!template) {
    throw new Error(`Unknown prompt type: ${type}`);
  }
  return formatPrompt(template, variables);
};

export const estimateTokens = (text: string) => {
  // Rough estimation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
};

export const truncatePrompt = (prompt: string, maxTokens = 4000) => {
  const estimatedTokens = estimateTokens(prompt);
  if (estimatedTokens <= maxTokens) {
    return prompt;
  }

  const ratio = maxTokens / estimatedTokens;
  const truncatedLength = Math.floor(prompt.length * ratio);
  return prompt.slice(0, truncatedLength) + '...';
};
```