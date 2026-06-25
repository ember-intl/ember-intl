const { readFileSync } = require('node:fs');
const { extname } = require('node:path');
const { load } = require('js-yaml');

function getTranslations(filePath) {
  const file = readFileSync(filePath, 'utf8');

  if (file === '') {
    return {};
  }

  const ext = extname(filePath);

  switch (ext) {
    case '.json': {
      return JSON.parse(file);
    }

    case '.yaml':
    case '.yml': {
      let translations = {};

      try {
        translations = load(file);
      } catch {
        // Do nothing
      }

      return translations;
    }
  }
}

module.exports = getTranslations;
