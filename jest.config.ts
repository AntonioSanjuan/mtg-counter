import type { Config } from '@jest/types';

const config = async (): Promise<Config.InitialOptions> => ({
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  collectCoverage: true,
});

export default config;
