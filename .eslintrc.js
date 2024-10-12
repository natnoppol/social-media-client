module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Integrate Prettier with ESLint
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        // Customize your ESLint rules here
    },
};
