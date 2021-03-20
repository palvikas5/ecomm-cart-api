module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:jest/all', 'plugin:prettier/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    /* ESLINT COMMONS */
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jest/no-hooks': 'off',
    'jest/no-conditional-expect': 'off',
    'no-console': 'error',
  },
};
