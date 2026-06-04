const {
  defineConfig,
  getCoreJsConfig,
  getCoreTsConfig,
  getTestsConfig,
} = require('./src/eslint');

module.exports = defineConfig([
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  ...getCoreJsConfig(),
  ...getCoreTsConfig(),
  ...getTestsConfig(),
]);
