import Ember from 'ember';

const { Logger:logger } = Ember;

export default function missingMessage(key, locales) {
  logger.warn(`translation: '${key}' on locale: '${locales.join(', ')}' was not found.`);

  return `Missing translation: ${key}`;
}
