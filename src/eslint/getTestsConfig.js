module.exports = ({ files } = {}) => [
  {
    files: files || ['**/*.spec.{js,ts}', '**/*.test.{js,ts}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
];
