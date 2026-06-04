const { nestjsPlugin } = require('../plugins');

module.exports = ({ cwd, files } = {}) => [
  ...require('./getBackConfig')({ cwd, files }),
  {
    files: files || ['**/*.controller.ts'],
    plugins: { nestjs: nestjsPlugin },
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              allowTypeImports: true,
              importNames: ['Controller'],
              message: 'Use ApiController from @common/nest',
              name: '@nestjs/common',
            },
          ],
        },
      ],
      'nestjs/api-response': 'error',
    },
  },
];
