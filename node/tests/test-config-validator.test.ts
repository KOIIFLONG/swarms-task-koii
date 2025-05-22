import { describe, it, expect } from 'vitest';
import { TestConfigValidator } from './test-config-validator';

describe('TestConfigValidator', () => {
    const validator = new TestConfigValidator();

    const validConfig = {
        testType: 'unit',
        component: 'node',
        version: '1.0.0',
        dependencies: [
            { name: 'vitest', version: '0.30.1' }
        ],
        testCases: [
            {
                name: 'Basic Unit Test',
                priority: 'medium',
                description: 'Validate basic functionality'
            }
        ],
        environmentConfig: {
            nodeVersion: '16.x',
            requiredEnvVars: ['TEST_ENV']
        }
    };

    const invalidConfigs = [
        {
            // Missing required fields
            testType: 'unit'
        },
        {
            // Invalid test type
            testType: 'unknown',
            component: 'node',
            version: '1.0.0'
        },
        {
            // Invalid version format
            testType: 'unit',
            component: 'node',
            version: 'invalid-version'
        }
    ];

    it('should validate a correct configuration', () => {
        const result = validator.validate(validConfig);
        expect(result.isValid).toBe(true);
        expect(result.errors).toBeNull();
    });

    it.each(invalidConfigs)('should detect invalid configurations', (config) => {
        const result = validator.validate(config);
        expect(result.isValid).toBe(false);
        expect(result.errors).not.toBeNull();
    });

    it('should generate error messages for invalid configurations', () => {
        const invalidConfig = {
            testType: 'unknown',
            component: 'invalid'
        };

        const errorMessages = validator.getErrorMessages(invalidConfig);
        expect(errorMessages.length).toBeGreaterThan(0);
    });
});