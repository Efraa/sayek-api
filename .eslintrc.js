module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended',, 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'linebreak-style': 0,
    'semi': 'off',
  }
}
