module.exports = {
  defineConfig: require('eslint/config').defineConfig,
  getNestjsConfig: require('./getNestjsConfig'),
  getNodeJsConfig: require('./getNodeJsConfig'),
  getNodeTsConfig: require('./getNodeTsConfig'),
  getTestsConfig: require('./getTestsConfig'),
  isModuleInstalled: require('./helpers/isModuleInstalled'),
  resolvePackageDirs: require('./helpers/resolvePackageDirs'),
};
