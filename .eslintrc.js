module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  overrides: [
    {
      files: ['**/*.ts?(x)'],
    },
  ],
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
