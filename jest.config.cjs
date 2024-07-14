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
  testMatch: ['**/tests/**/*.+(js|ts|tsx)'],
  // testMatch: ['<rootDir>/src/**/*.test.tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  collectCoverageFrom: ['./src/**', '!src/**/*.d.ts'],
};
