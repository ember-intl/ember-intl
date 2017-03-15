module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
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
