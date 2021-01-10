/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globals: {
    PropertiesService: {},
    SpreadsheetApp: {},
    UrlFetchApp: {},
  },
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
};
