require('global-jsdom/register');

module.exports = {
  timeout: 15000,
  exit: true,
  reporter: 'spec',
  spec: ['src/__tests__/**/*.{spec.ts,spec.tsx}']
};
