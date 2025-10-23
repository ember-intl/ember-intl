const { readFileSync } = require('node:fs');
const { extname } = require('node:path');
const yaml = require('js-yaml');

function getTranslations(filePath) {
  const file = readFileSync(filePath);
  const ext = extname(filePath);

  switch (ext) {
    case '.json': {
      return JSON.parse(file);
    }

    case '.yaml':
    case '.yml': {
      return yaml.load(file);
    }
  }
}

module.exports = getTranslations;
