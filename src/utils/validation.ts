import { TSchema } from '@sinclair/typebox';
import Ajv, { ErrorObject } from 'ajv';

const ajv = new Ajv({ allErrors: true });

/**
 * Validate data against a Typebox schema.
 *
 * @param schema - The Typebox schema to validate against.
 * @param data - The data to validate.
 * @returns The validated data with the specified type `T`.
 * @throws An error with validation details if validation fails.
 */
export const validate = <T>(schema: TSchema, data: unknown): T => {
    const validateFunction = ajv.compile(schema);
    const valid = validateFunction(data);

    if (!valid) {
        const errors = formatAjvErrors(validateFunction.errors);
        throw new Error(`Validation failed: ${errors}`);
    }

    return data as T;
};

/**
 * Format validation errors from Ajv.
 *
 * @param errors - Array of Ajv error objects.
 * @returns A formatted string describing the validation errors.
 */
const formatAjvErrors = (errors: ErrorObject[] | null | undefined): string => {
    if (!errors) return 'Unknown validation error';
    return errors
        .map((error) => {
            const path = error.instancePath || '(root)';
            const message = error.message || 'Invalid value';
            return `${path} ${message}`;
        })
        .join(', ');
};
