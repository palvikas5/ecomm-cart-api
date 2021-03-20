module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  ignorePatterns: [".eslintrc.js"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    /* ESLINT COMMONS */
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
