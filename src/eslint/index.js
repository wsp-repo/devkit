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
  getNestjsConfig: require('./configs/getNestjsConfig'),
  getNodeJsConfig: require('./configs/getNodeJsConfig'),
  getNodeTsConfig: require('./configs/getNodeTsConfig'),
  getTestsConfig: require('./configs/getTestsConfig'),
  // экспортируемые хелперы для кастомизации
  isModuleInstalled: require('./helpers/isModuleInstalled'),
  resolvePackageDirs: require('./helpers/resolvePackageDirs'),
};
