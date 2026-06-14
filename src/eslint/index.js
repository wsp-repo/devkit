const { defineConfig, globalIgnores } = require('eslint/config');
const prettierConfig = require('eslint-config-prettier');

function localDefineConfig(rulesSections = []) {
  return defineConfig([
    globalIgnores(['node_modules', 'dist']),
    ...rulesSections,
    prettierConfig,
  ]);
}

module.exports = {
  defineConfig: localDefineConfig,
  // функции генерации секций конфигураций
  getBackTsConfig: require('./configs/getBackTsConfig'),
  getCoreJsConfig: require('./configs/getCoreJsConfig'),
  getCoreTsConfig: require('./configs/getCoreTsConfig'),
  getFrontConfig: require('./configs/getFrontConfig'),
  getNestjsConfig: require('./configs/getNestjsConfig'),
  getNextjsConfig: require('./configs/getNextjsConfig'),
  getReactConfig: require('./configs/getReactConfig'),
  getTestsConfig: require('./configs/getTestsConfig'),
  globalIgnores: require('eslint/config').globalIgnores,
  // экспортируемые хелперы для кастомизации
  ...require('./helpers/resolveDirectories'),
  ...require('./helpers/isModuleInstalled'),
};
