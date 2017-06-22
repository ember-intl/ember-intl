module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  plugins: [
    "prettier"
  ],
  env: {
    browser: true
  },
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "printWidth": 120
    }]
  }
};
