import { z } from 'zod';

export const tokenConfigSchema = z.object({
  name: z.string()
    .min(1, 'Token name is required')
    .max(50, 'Token name must be less than 50 characters'),
  symbol: z.string()
    .min(1, 'Token symbol is required')
    .max(10, 'Token symbol must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Symbol must contain only uppercase letters and numbers'),
  initialSupply: z.string()
    .min(1, 'Initial supply is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Initial supply must be a positive number',
    }),
  features: z.object({
    mintable: z.boolean(),
    burnable: z.boolean(),
    pausable: z.boolean(),
    staking: z.boolean(),
    governance: z.boolean(),
    deflation: z.boolean(),
  }),
});

export const tokenomicsSchema = z.object({
  allocations: z.array(z.object({
    category: z.string().min(1, 'Category is required'),
    percentage: z.number()
      .min(0, 'Percentage must be between 0 and 100')
      .max(100, 'Percentage must be between 0 and 100'),
    lockPeriod: z.number()
      .min(0, 'Lock period must be 0 or greater'),
  }))
    .min(1, 'At least one allocation is required')
    .refine((data) => {
      const total = data.reduce((sum, item) => sum + item.percentage, 0);
      return total === 100;
    }, { message: 'Total allocation must equal 100%' }),
  totalSupply: z.string()
    .min(1, 'Total supply is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Total supply must be a positive number',
    }),
});

export type TokenConfig = z.infer<typeof tokenConfigSchema>;
export type Tokenomics = z.infer<typeof tokenomicsSchema>;