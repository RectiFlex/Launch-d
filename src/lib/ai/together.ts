import { Together } from '@together-ai/sdk';

const together = new Together({
  apiKey: import.meta.env.VITE_TOGETHER_API_KEY,
});

export const generateCompletion = async (
  prompt: string,
  options: {
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    model?: string;
  } = {}
) => {
  const {
    maxTokens = 4000,
    temperature = 0.7,
    topP = 0.7,
    model = 'togethercomputer/llama-2-70b-chat'
  } = options;

  try {
    const response = await together.complete({
      prompt,
      model,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
    });

    return response.output.text;
  } catch (error) {
    console.error('AI completion error:', error);
    throw error;
  }
};