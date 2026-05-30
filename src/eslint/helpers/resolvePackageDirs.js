const { existsSync } = require('node:fs');
const { dirname, join } = require('node:path');

/**
 * Хелпер для построения массива директорий с package.json
 */
function resolvePackageDirs(cwdDir = process.cwd()) {
  const packageDirs = [];

  let currentDir = cwdDir;

  while (true) {
    const packageJsonPath = join(currentDir, 'package.json');

    // eslint-disable-next-line
    if (existsSync(packageJsonPath)) {
      packageDirs.push(currentDir);
    }

    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) break;

    currentDir = parentDir;
  }

  return packageDirs;
}

module.exports = resolvePackageDirs;
