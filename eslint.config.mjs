import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	{
		env: {
			browser: true,
			es2021: true,
			node: true
		},
		extends: [ 
			'eslint:recommended', 
			'prettier'
		],
		files: ['**/*.js'],
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'no-unused-vars': 'warn', 
      		'prettier/prettier': ['error', { endOfLine: 'auto' }],
			'no-console':'error'
		},
	},
];
