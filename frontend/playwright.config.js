// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  testDir: './tests',
};

module.exports = config; 