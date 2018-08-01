/* eslint-env node */
const path = require('path');

const allowedExtensions = ['.json', '.yaml', '.yml'];

function validLocaleFile(filename) {
  if (typeof filename !== 'string') return false;

  return allowedExtensions.includes(path.extname(filename));
}

module.exports = validLocaleFile;
