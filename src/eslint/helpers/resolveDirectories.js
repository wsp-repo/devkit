const { existsSync } = require('node:fs');
const { dirname, join } = require('node:path');

/**
 * Хелпер для построения массива директорий с файлом fileName
 */
function resolveDirectories(fileName, cwdDir = process.cwd()) {
  const packageDirs = [];

  let currentDir = cwdDir;

  while (true) {
    const packageJsonPath = join(currentDir, fileName);

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

/**
 * Хелпер для построения массива директорий с package.json
 */
function resolvePackageDirs(cwdDir = process.cwd()) {
  return resolveDirectories('package.json', cwdDir);
}

/**
 * Хелпер для построения массива директорий с tsconfig.json
 */
function getTsconfigRootDir(cwdDir = process.cwd()) {
  const dirs = resolveDirectories('tsconfig.json', cwdDir);

  return dirs[0] || cwdDir;
}

module.exports = {
  getTsconfigRootDir,
  resolveDirectories,
  resolvePackageDirs,
};
