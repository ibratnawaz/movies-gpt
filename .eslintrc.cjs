module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'trailing-comma': 'off',
    'no-duplicate-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    camelcase: 'error',
    quotes: ['error', 'single'],
    indent: ['error', 2, { ignoredNodes: ['JSXElement', 'JSXElement *'] }]
  }
};
