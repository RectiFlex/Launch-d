```typescript
export const PROMPTS = {
  TOKEN_GENERATION: `
Generate a secure ERC20 smart contract with the following specifications:
- Token Name: {{name}}
- Symbol: {{symbol}}
- Initial Supply: {{initialSupply}}
- Features: {{features}}

Include the following security considerations:
- Reentrancy protection
- Integer overflow protection
- Access control
- Events for all important state changes
`,

  CONTRACT_ANALYSIS: `
Analyze this smart contract for:
1. Security vulnerabilities
2. Gas optimization opportunities
3. Best practices compliance
4. Code quality and maintainability

Provide detailed feedback in the following format:
{
  "vulnerabilities": [],
  "optimizations": [],
  "bestPractices": [],
  "score": 0
}
`,

  WHITEPAPER_GENERATION: `
Create a comprehensive whitepaper for {{projectName}} including:
1. Executive Summary
2. Problem Statement
3. Solution Overview
4. Technical Architecture
5. Tokenomics
6. Team & Roadmap
7. Token Utility
8. Market Analysis
`,

  TOKENOMICS_ANALYSIS: `
Analyze the following tokenomics model:
{{tokenomics}}

Provide feedback on:
1. Token distribution fairness
2. Vesting schedules
3. Market impact
4. Long-term sustainability
`,

  GAS_OPTIMIZATION: `
Optimize the following smart contract for gas efficiency:
{{code}}

Focus on:
1. Storage optimization
2. Loop optimization
3. Function optimization
4. State variable access patterns
`
};
```