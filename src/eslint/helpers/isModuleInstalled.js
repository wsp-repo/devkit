/**
 * Хелпер для проверки установки плагина
 */
const isModuleInstalled = (moduleName) => {
  try {
    require.resolve(moduleName);

    return true;
  } catch {
    return false;
  }
};

module.exports = isModuleInstalled;
