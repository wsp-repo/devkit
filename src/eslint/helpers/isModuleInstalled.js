/**
 * Хелпер для проверки установки плагина
 */
function isModuleInstalled(moduleName) {
  try {
    require.resolve(moduleName);

    return true;
  } catch {
    return false;
  }
}

module.exports = {
  isModuleInstalled,
};
