import Ajv from 'ajv';
import testConfigSchema from './test-config-schema.json';

export class TestConfigValidator {
    private ajv: Ajv;

    constructor() {
        this.ajv = new Ajv({ 
            allErrors: true, 
            strict: true 
        });
    }

    /**
     * Validate test configuration against defined schema
     * @param config - Test configuration object
     * @returns Validation result with boolean and error details
     */
    validate(config: any): { 
        isValid: boolean, 
        errors?: Ajv.ErrorObject[] | null 
    } {
        const validate = this.ajv.compile(testConfigSchema);
        const isValid = validate(config);

        return {
            isValid: isValid || false,
            errors: validate.errors || null
        };
    }

    /**
     * Generate detailed error messages
     * @param config - Test configuration object
     * @returns Array of human-readable error messages
     */
    getErrorMessages(config: any): string[] {
        const { isValid, errors } = this.validate(config);
        
        if (isValid) return [];

        return (errors || []).map(error => 
            `${error.instancePath} ${error.message || 'Invalid configuration'}`
        );
    }
}