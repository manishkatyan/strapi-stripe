'use strict';

const frontPaths = ['admin/src/**/*.js', 'admin/src/**/**/*.js'];

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  overrides: [
    {
      files: ['server/**/*.js', 'server/*.js'],
      excludedFiles: frontPaths,
      ...require('./.eslintrc.back.js'),
    },
    {
      files: frontPaths,
      ...require('./.eslintrc.front.js'),
    },
  ],
};
