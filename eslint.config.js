const {
  defineConfig,
  getNodeJsConfig,
  getNodeTsConfig,
} = require('./src/eslint');

module.exports = defineConfig([
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  ...getNodeJsConfig(),
  ...getNodeTsConfig(),
]);
