module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', 'vite.config.ts', 'tests', '*.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['import', 'react-refresh', 'prettier', '@typescript-eslint', 'react-compiler'],
  rules: {
    '@typescript-eslint/consistent-type-exports': 'error', // Ensures consistent use of type exports
    '@typescript-eslint/consistent-type-imports': 'error', // Enforces consistent style for importing types
    'no-underscore-dangle': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'react/prefer-stateless-function': 'off',
    'react-compiler/react-compiler': 'error',
    'no-console': 0,
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines': ['error', 300],
    '@typescript-eslint/no-inferrable-types': 'error',
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
    'import/named': 'error',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/order': [
      // Enforces a consistent order for import declarations
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      // Enforces naming conventions for variables and interfaces
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'], // Allows specific prefixes for boolean variables
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'], // Requires interfaces to start with 'I'
      },
    ],
  },
};
