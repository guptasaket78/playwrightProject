import { readFileSync } from 'node:fs';
import TestUtils from '../utils/TestUtils.js';

const configPath = new URL('../testDataConfig.json', import.meta.url);
const rawConfig = readFileSync(configPath, 'utf-8');
const testDataConfig = JSON.parse(rawConfig);

export const selectedEnvironment = testDataConfig.selectedEnvironment;
export const browserName = testDataConfig.browserName || 'chromium';
export const runMode = process.env.PW_RUN_MODE || testDataConfig.runMode || 'headless';
export const isHeadless = runMode !== 'head';
export const explicitTimestamp =
  process.env.TEST_DATA_TIMESTAMP || testDataConfig.explicitTimestamp || '';

function buildToken() {
  const timestamp = explicitTimestamp || Date.now().toString();
  return `${timestamp}_${TestUtils.generateRandomString(6)}`;
}

export function buildSignupUser() {
  const token = buildToken();

  return {
    name: `User ${token}`,
    email: `playwright_${token}@example.com`,
    ...testDataConfig.signupDefaults,
  };
}

export function buildInvalidLoginUser() {
  const token = buildToken();

  return {
    email: `invalid_${token}@example.com`,
    ...testDataConfig.invalidLoginDefaults,
  };
}
