import { z } from 'zod';

export const validateInput = <T>(schema: z.Schema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Invalid input' };
  }
};

export const handleFormValidation = <T>(
  schema: z.Schema<T>,
  onSuccess: (data: T) => void,
  onError: (error: string) => void
) => {
  return (formData: unknown) => {
    const result = validateInput(schema, formData);
    if (result.success) {
      onSuccess(result.data);
    } else {
      onError(result.error);
    }
  };
};