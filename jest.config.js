/** @type {import('jest').Config } */

module.exports = {
  verbose: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'html', 'lcov'],
  collectCoverageFrom: [
    'src/**'
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!uuid)'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};