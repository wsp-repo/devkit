module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['theme'],
      },
    ],
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*(?:-[a-z0-9]+)*$',
  },
};
