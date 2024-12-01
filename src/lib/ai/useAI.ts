import { useCallback } from 'react';
import { useCurrentProject } from '../hooks/useCurrentProject';
import { generateCompletion } from './together';

export const useAI = () => {
  const { currentProject } = useCurrentProject();

  const complete = useCallback(async (prompt: string) => {
    const projectContext = currentProject ? {
      name: currentProject.name,
      type: currentProject.type,
      tokenConfig: currentProject.tokenConfig,
      tokenomics: currentProject.tokenomics,
      completedSteps: currentProject.completedSteps,
    } : null;

    const systemPrompt = `You are an AI assistant specialized in blockchain development, smart contracts, and tokenomics. 
      You help developers create secure and efficient smart contracts, analyze tokenomics, and generate technical documentation.
      ${projectContext ? `Current project context: ${JSON.stringify(projectContext)}` : ''}`;

    const fullPrompt = `<s>[INST] ${systemPrompt}\n\n${prompt} [/INST]</s>`;

    const response = await generateCompletion(fullPrompt);
    return response;
  }, [currentProject]);

  return {
    complete,
    isLoading: false,
  };
};