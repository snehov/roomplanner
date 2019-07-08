'use strict'

// Put this file to the directory where your browser code is located. This could be the root
// directory, or a subdirectory if your project consists of both node.js and browser code.
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:react/recommended' /* 'eslint:recommended', */],
  rules: {
    'template-tag-spacing': 0,
    'import/no-extraneous-dependencies': 0,
    'no-warning-comments': 0,
    'no-unused-vars': 1,
    'no-use-before-define': 1,
    'import/no-webpack-loader-syntax': 0,
    'import/newline-after-import': 0,
    'no-extra-parens': 0,
    'no-implicit-coercion': 0,
    'arrow-parens': 'off',
    'newline-per-chained-call': 0,
    'react/react-in-jsx-scope': 'off',
    'no-inline-comments': 'off',
    eqeqeq: ['error', 'smart'],
    semi: 'off',
    'max-len': ['error', 110, { ignoreStrings: true, ignoreComments: true }],
    'react/require-default-props': 'off',
    'operator-linebreak': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        //"config": "./internals/webpack/webpack.base.babel.js"
      },
      'babel-module': {},
    },
  },
}
