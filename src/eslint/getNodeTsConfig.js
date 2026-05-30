/* eslint-disable max-lines-per-function */

const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importXPlugin = require('eslint-plugin-import-x');
const tsPerfectionistPlugin = require('eslint-plugin-perfectionist');
const securityPlugin = require('eslint-plugin-security');

const nodeJsConfig = require('./getNodeJsConfig');
const resolvePackageDirs = require('./helpers/resolvePackageDirs');

function eslintMembersGroup(suffix) {
  return [
    `public-static-${suffix}`,
    `protected-static-${suffix}`,
    `private-static-${suffix}`,
    `#private-static-${suffix}`,

    `public-instance-${suffix}`,
    `protected-instance-${suffix}`,
    `private-instance-${suffix}`,
    `#private-instance-${suffix}`,

    `public-abstract-${suffix}`,
    `protected-abstract-${suffix}`,

    `public-${suffix}`,
    `protected-${suffix}`,
    `private-${suffix}`,
    `#private-${suffix}`,

    `static-${suffix}`,
    `instance-${suffix}`,
    `abstract-${suffix}`,

    suffix,
  ];
}

function eslintImportSortCustomGroups(prefix, selectors, pattern) {
  return selectors.map((selector) => ({
    elementNamePattern: pattern,
    groupName: `${prefix}-${selector}`,
    selector,
  }));
}

module.exports = ({ cwd, files, tsconfig } = {}) => [
  {
    files: files || ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        project: tsconfig || './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      'import-x': importXPlugin,
      perfectionist: tsPerfectionistPlugin,
      security: securityPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs['recommended-requiring-type-checking'].rules,

      // переопределения базовых правил плагинов
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            // Index signature
            'signature',
            'call-signature',

            // Fields
            ...eslintMembersGroup('field'),

            // Static initialization
            'static-initialization',

            // Constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',

            'constructor',

            // Getters
            ...eslintMembersGroup('get'),

            // Setters
            ...eslintMembersGroup('set'),

            // Methods
            ...eslintMembersGroup('method'),
          ],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          selector: 'default',
          trailingUnderscore: 'forbid',
        },
        {
          format: null,
          modifiers: ['requiresQuotes'],
          selector: [
            'accessor',
            'classMethod',
            'classProperty',
            'enumMember',
            'objectLiteralMethod',
            'objectLiteralProperty',
            'typeMethod',
            'typeProperty',
          ],
        },
        {
          format: null,
          modifiers: ['destructured', 'unused'],
          selector: 'variable',
        },
        {
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
          selector: 'variable',
          trailingUnderscore: 'forbid',
        },
        {
          format: ['camelCase', 'snake_case'],
          leadingUnderscore: 'forbid',
          selector: 'property',
          trailingUnderscore: 'forbid',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          selector: 'parameter',
          trailingUnderscore: 'forbid',
        },
        {
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          selector: 'typeLike',
          trailingUnderscore: 'forbid',
        },
        {
          format: ['PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
          selector: 'enum',
          trailingUnderscore: 'forbid',
        },
        {
          format: ['PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
          selector: 'enumMember',
          trailingUnderscore: 'forbid',
        },
      ],
      '@typescript-eslint/no-base-to-string': 'off',
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
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
        },
      ],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      'import-x/default': 'error',
      'import-x/export': 'error',
      'import-x/extensions': 'off',
      'import-x/first': 'error',
      'import-x/named': 'error',
      'import-x/namespace': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          packageDir: resolvePackageDirs(cwd),
        },
      ],
      'import-x/no-unresolved': 'off',
      'import-x/order': 'off',
      'import-x/prefer-default-export': 'off',
      'max-classes-per-file': 'off',
      // Сортировка enum (по имени или значению)
      'perfectionist/sort-enums': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
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
              '.*(constants?|config?).*',
            ),
          ],
          groups: [
            'side-effect',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            ['types-internal', 'types-parent', 'types-sibling', 'types-index'],
            ['const-internal', 'const-parent', 'const-sibling', 'const-index'],
            'unknown',
          ],
          ignoreCase: true,
          internalPattern: ['^@/', '^~/', '^src/'],
          newlinesBetween: 1,
          order: 'asc',
          sortSideEffects: false,
          type: 'alphabetical',
        },
      ],
      // Сортировка интерфейсов
      'perfectionist/sort-interfaces': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      // Сортировка свойств в типах объектов
      'perfectionist/sort-object-types': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'sort-imports': 'off',
    },
    settings: {
      'import/resolver': [
        {
          typescript: {
            project: tsconfig || './tsconfig.json',
          },
        },
      ],
    },
  },
];
