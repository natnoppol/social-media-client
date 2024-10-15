import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['src/**/*.js'],
    ignores: [
      'node_modules/*', // ignore its content
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      indent: ['error', 2],
      quotes: ['error', 'single'],
    },
  },
  pluginJs.configs.recommended,
];