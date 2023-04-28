module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/parser',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',

    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'react*/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@/pages/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/components/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/apis/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/store/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/hooks/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/utils/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/mocks/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/types/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/assets/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/constants/*',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react*', 'react*/**'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-alert': 'off',
    'no-var': 'error', // var 금지
    'no-multiple-empty-lines': 'error', // 여러 줄 공백 금지
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }], // console.log() 금지
    'dot-notation': 'error', // 가능하다면 dot notation 사용
    'no-unused-vars': 'error', // 사용하지 않는 변수 금지
    'react/react-in-jsx-scope': 'off',
    'consistent-return': 'off',
  },
};
