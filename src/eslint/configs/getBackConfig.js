const {
  createTypeScriptImportResolver,
} = require('eslint-import-resolver-typescript');
const importXPlugin = require('eslint-plugin-import-x');
const tsPerfectionistPlugin = require('eslint-plugin-perfectionist');
const tsEslint = require('typescript-eslint');

const { getTsconfigRootDir } = require('../helpers/resolveDirectories');

function eslintImportSortCustomGroups(prefix, selectors, pattern) {
  return selectors.map((selector) => ({
    elementNamePattern: pattern,
    groupName: `${prefix}-${selector}`,
    selector,
  }));
}

module.exports = ({ cwd, files } = {}) => [
  ...require('./getCoreTsConfig')({ cwd, files }),
  {
    extends: [
      tsEslint.configs.recommended,
      tsEslint.configs.recommendedTypeChecked,
    ],
    files: files || ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: getTsconfigRootDir(cwd),
      },
    },
    plugins: {
      'import-x': importXPlugin,
      perfectionist: tsPerfectionistPlugin,
    },
    rules: {
      // переопределения базовых правил плагинов
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: [
            'constructors',
            'private-constructors',
            'protected-constructors',
            'decoratedFunctions',
            'overrideMethods',
            'setters',
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: [
            ...eslintImportSortCustomGroups(
              'types',
              ['parent', 'sibling', 'index', 'internal'],
              '.*(interfaces?|types?|typings?).*',
            ),
            ...eslintImportSortCustomGroups(
              'const',
              ['parent', 'sibling', 'index', 'internal'],
              '.*(constants?|configs?).*',
            ),
          ],
          groups: [
            'side-effect',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            ['types-internal', 'types-parent', 'types-sibling', 'types-index'],
            ['const-internal', 'const-parent', 'const-sibling', 'const-index'],
            'unknown',
          ],
          ignoreCase: true,
          internalPattern: ['^@/', '^src/', '^shared/'],
          newlinesBetween: 1,
          order: 'asc',
          sortSideEffects: false,
          type: 'alphabetical',
        },
      ],
      'unusedImports/no-unused-imports': 'error',
      'unusedImports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },
  },
];
