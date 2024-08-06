import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  setupFiles: ['./mock/fetchSetup.ts'],
  setupFilesAfterEnv: ['./mock/setupTests.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
    '!src/**/test-utils/**',
    '!src/**/types/**',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
