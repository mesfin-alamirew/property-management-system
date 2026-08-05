import { z } from 'zod';

/**
 * Required text field validator
 */
export const requiredString = (field: string) =>
  z.string().trim().min(1, `${field} is required`);

/**
 * Optional text field validator
 * Converts empty strings to undefined
 */
export const optionalString = () =>
  z
    .string()
    .trim()
    .optional()
    .transform((value) => {
      return value === '' ? undefined : value;
    });

/**
 * Optional decimal number validator
 */
export const optionalDecimal = () => z.number().optional();

/**
 * Optional integer validator
 */
export const optionalInteger = () => z.number().int().optional();

/**
 * UUID validator
 */
export const idSchema = z.string().cuid();
