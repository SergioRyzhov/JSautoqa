import { Validator } from 'jsonschema';

const validator = new Validator();

export const validateSchema = (data: any, schema: object): boolean => {
    const validationResult = validator.validate(data, schema);
    return validationResult.valid;
};
