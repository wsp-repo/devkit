# Package `@zalib/devkit`

Development tooling package.

## Installation

```bash
npm i -D @zalib/devkit
```

---

# ESLint configurations

The package uses:

- ESLint 9 flat config
- Prettier for formatting
- eslint-config-prettier
- eslint-import-resolver-typescript
- eslint-plugin-import-x
- eslint-plugin-perfectionist
- eslint-plugin-unused-imports
- typescript-eslint

## Included Configurations

| Config              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `getNodeJsConfig()` | Get ESLint config method for JavaScript projects |
| `getNodeTsConfig()` | Get ESLint config method for TypeScript projects |
| `getNestjsConfig()` | Get ESLint config method for NestJS projects     |
| `getTestsConfig()`  | Get ESLint config method for tests in projects   |

### `eslint.config.js`

```js
const {
  defineConfig,
  getNodeJsConfig,
  getNodeTsConfig,
  getTestsConfig,
} = require('@zalib/devkit/eslint');

module.exports = defineConfig([
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  ...getNodeJsConfig(),
  ...getNodeTsConfig(),
  ...getTestsConfig(),
]);
```

---

# Prettier configurations

### `prettier.config.js`

```js
const prettierConfig = require('@zalib/devkit/prettier');

module.exports = { ...prettierConfig };
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
