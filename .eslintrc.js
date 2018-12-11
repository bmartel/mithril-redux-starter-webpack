module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // enable prettier
    "prettier/prettier": "error",
  },
  globals: {
    requestAnimationFrame: true,
    cancelAnimationFrame: true,
    Promise: true,
  },
};
