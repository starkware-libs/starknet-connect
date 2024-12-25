import base from 'eslint-config-base';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import typescript from 'typescript-eslint';

export default [
  ...base,
  ...typescript.configs.recommended,
  {
    plugins: {
      'no-only-tests': noOnlyTestsPlugin
    },
    // TODO: check if remove these (first 2)
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-only-tests/no-only-tests': 'error'
    }
  }
];
