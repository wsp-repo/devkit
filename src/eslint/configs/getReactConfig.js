const js = require('@eslint/js');
const fsdPlugin = require('eslint-plugin-fsd-lint');
const reactHooks = require('eslint-plugin-react-hooks');
const { reactRefresh } = require('eslint-plugin-react-refresh');
const globals = require('globals');
const tsEslint = require('typescript-eslint');

module.exports = ({ cwd, files } = {}) => [
  ...require('./getFrontConfig')({ cwd, files }),
  {
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    files: files || ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      fsd: fsdPlugin,
    },
    rules: {
      // FSD rules
      'fsd/no-relative-imports': 'error',
    },
  },
];
