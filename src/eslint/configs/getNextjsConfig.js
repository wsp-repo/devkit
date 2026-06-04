const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const fsdPlugin = require('eslint-plugin-fsd-lint');
const globals = require('globals');
const tsEslint = require('typescript-eslint');

module.exports = ({ cwd, files, pagesLayerPattern } = {}) => [
  ...require('./getFrontConfig')({ cwd, files }),
  {
    extends: [js.configs.recommended, tsEslint.configs.recommended],
    files: files || ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@next/next': nextPlugin,
      fsd: fsdPlugin,
    },
    rules: {
      // Next rules
      ...(nextPlugin.configs.recommended?.rules || {}),
      ...(nextPlugin.configs['core-web-vitals']?.rules || {}),

      // FSD rules
      'fsd/no-relative-imports': [
        'error',
        {
          layers: {
            pages: {
              pattern: pagesLayerPattern || 'pagesLayer',
            },
          },
        },
      ],
    },
  },
];
