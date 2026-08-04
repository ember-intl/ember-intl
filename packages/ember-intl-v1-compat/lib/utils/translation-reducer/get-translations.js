const { readFileSync } = require('node:fs');
const { extname } = require('node:path');
const { load } = require('js-yaml');

function getTranslations(filePath) {
  const file = readFileSync(filePath, 'utf8');
  const translationJson = {};

  if (file === '') {
    return translationJson;
  }

  const ext = extname(filePath);

  switch (ext) {
    case '.json': {
      return JSON.parse(file);
    }

    case '.yaml':
    case '.yml': {
      let translationJson = {};

      try {
        translationJson = load(file);
      } catch {
        // Do nothing
      }

      return translationJson;
    }
  }
}

module.exports = getTranslations;
