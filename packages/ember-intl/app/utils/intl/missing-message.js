import Ember from 'ember';
import links from 'ember-intl/utils/links';

const { Logger:logger } = Ember;

export default function missingMessage(key, locales) {
  if (!locales) {
    logger.warn(`ember-intl: no locale has been set. Documentation: ${links.unsetLocale}`)
  }
  else {
    logger.warn(`ember-intl: translation: '${key}' on locale: '${locales.join(', ')}' was not found.`);
  }

  return `Missing translation: ${key}`;
}
