const js = require('@eslint/js');
const fsdPlugin = require('eslint-plugin-fsd-lint');
const globals = require('globals');
const tsEslint = require('typescript-eslint');

module.exports = ({ cwd, files } = {}) => [
  ...require('./getCoreTsConfig')({ cwd, files }),
  {
    extends: [js.configs.recommended, tsEslint.configs.recommended],
    files: files || ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      fsd: fsdPlugin,
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'forbid',
          selector: 'variable',
          trailingUnderscore: 'forbid',
        },
      ],
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/unbound-method': 'off',

      // FSD rules
      'fsd/forbidden-imports': 'error',
      'fsd/no-cross-slice-dependency': 'error',
      'fsd/no-global-store-imports': 'error',
      'fsd/no-public-api-sidestep': 'error',
      'fsd/no-relative-imports': 'error',
      'fsd/no-ui-in-business-logic': 'error',
      'fsd/ordered-imports': 'warn',
    },
  },
];
