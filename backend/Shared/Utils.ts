import dotenv from 'dotenv';

export function getEnvironmentVariable(key: string) {
  if (!process.env[key])
    throw new Error(`[3182323]: Environment variable [${key}] not set.`);
  return process.env[key]!;
}

export function ensureEnvironment(dirname: string) {
  dotenv.config({ path: '.env' });
  process.env.ROOT_PATH = dirname;
}

export function isNodeDevelopment() {
  return getEnvironmentVariable('NODE_ENV') === 'development';
}
