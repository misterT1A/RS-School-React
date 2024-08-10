/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testMatch: ['**/tests/**/*.(test|spec).[jt]s?(x)'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  setupFiles: ['./app/mock/fetchSetup.ts'],
  setupFilesAfterEnv: ['./app/mock/setupTests.ts'],
  collectCoverageFrom: ['./app/**', '!app/**/*.d.ts'],
};
