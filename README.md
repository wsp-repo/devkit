# Пакет `@zalib/devkit`

Предустановленное окружение для ведения разработки на NodeJS/React/NextJS

## Установка пакета

```bash
npm i -D @zalib/devkit
```

---

# Конфигурирование кода с помощью ESLint

Набор предустановленных пакетрв как зависимости

- ESLint 9 flat config
- Prettier for formatting
- `@typescript-eslint`
- `eslint-plugin-import-x`
- `eslint-plugin-security`
- `eslint-plugin-perfectionist`
- `eslint-plugin-fsd-lint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-unused-imports`
- `@next/eslint-plugin-next`
- Stylelint for lint css/scss files
- `stylelint-config-standard`
- `stylelint-config-standard-scss`

## Предустановленные конфигурации для сборки eslint.config.js

| Функция             | Описание                                                               |
| ------------------- | ---------------------------------------------------------------------- |
| `getCoreJsConfig()` | Возвращает общую базовую конфигурацию для JavaScript кода              |
| `getCoreTsConfig()` | Возвращает общую базовую конфигурацию для TypeScript кода              |
| ------------------- | ---------------------------------------------------------------------- |
| `getBackConfig()`   | Возвращает базовую конфигурацию для Backend кода (включает CoreTs)     |
| `getNestjsConfig()` | Возвращает рабочую конфигурацию для NestJS кода (включает BackConfig)  |
| ------------------- | ---------------------------------------------------------------------- |
| `getFrontConfig()`  | Возвращает базовую конфигурацию для Frontend кода (включает CoreTs)    |
| `getNextjsConfig()` | Возвращает рабочую конфигурацию для NextJS кода (включает FrontConfig) |
| `getReactConfig()`  | Возвращает рабочую конфигурацию для React кода (включает FrontConfig)  |
| ------------------- | ---------------------------------------------------------------------- |
| `getTestsConfig()`  | Возвращает рабочую конфигурацию для файлов тестирования                |

### `eslint.config.js` (вариант для backend-кода)

```js
const {
  defineConfig,
  getNestjsConfig,
  getTestsConfig,
} = require('@zalib/devkit/eslint');

module.exports = defineConfig([
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  ...getNestjsConfig(),
  ...getTestsConfig(),
]);
```

### `eslint.config.js` (вариант для frontend-кода)

```js
const {
  defineConfig,
  getNextjsConfig,
  getTestsConfig,
} = require('@zalib/devkit/eslint');

module.exports = defineConfig([
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  ...getNextjsConfig(),
  ...getTestsConfig(),
]);
```

---

# Пример конфигурации для форматирования кода

### `prettier.config.js`

```js
const prettierConfig = require('@zalib/devkit/prettier');

module.exports = { ...prettierConfig };
```

---

# Stylelint configurations

### `stylelint.config.js`

```js
const stylelintConfig = require('@zalib/devkit/stylelint');

module.exports = { ...stylelintConfig };
```

---

# VSCode Integration

### `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript"]
}
```

---

# Requirements

| Tool       | Version |
| ---------- | ------- |
| Node.js    | 22.22+  |
| TypeScript | 5.9+    |
