'use strict';

module.exports = {
  extends: ['plugin:yml/standard'],
  rules: {
    'yml/key-name-casing': [
      'error',
      {
        camelCase: false,
        'kebab-case': true,
        PascalCase: false,
        SCREAMING_SNAKE_CASE: false,
        snake_case: false,
        ignores: ['^[a-z0-9\\.-]+$'],
      },
    ],
    'yml/no-empty-document': 'off',
    'yml/no-multiple-empty-lines': 'error',
    'yml/sort-keys': 'error',
  },
};
