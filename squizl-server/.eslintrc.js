module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint-config-semistandard',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: [
            'error',
            4
        ],
        'no-useless-constructor': 0
    }
};
