const importXPlugin = require('eslint-plugin-import-x');
const perfectionistPlugin = require('eslint-plugin-perfectionist');

module.exports = ({ files } = {}) => [
  {
    files: files || ['**/*.js'],
    plugins: {
      'import-x': importXPlugin,
      perfectionist: perfectionistPlugin,
    },
    rules: {
      'arrow-parens': [
        'warn',
        'always',
        {
          requireForBlockBody: true,
        },
      ],
      'class-methods-use-this': 'off',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],
      complexity: ['error', { max: 10 }],
      'function-paren-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'import-x/extensions': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'type',
          ],
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
        },
      ],
      'jest/no-deprecated-functions': 'off',
      'max-lines': [
        'error',
        {
          max: 500,
          skipBlankLines: false,
          skipComments: true,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 200,
          skipBlankLines: false,
          skipComments: true,
        },
      ],
      'max-params': ['error', { max: 3 }],
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      'no-empty-function': 'off',
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      'no-promise-executor-return': 'off',
      'no-restricted-syntax': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: ['block-like'],
        },
        {
          blankLine: 'always',
          next: 'if',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: 'if',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'require-await': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
      strict: 'off',
    },
  },
];
