import Ember from 'ember';

const { Logger:logger } = Ember;

export default function missingMessage(key, locales) {
  if (!locales) {
    logger.warn('ember-intl: no locale has been set. https://github.com/yahoo/ember-intl#configure-application-wide-locale')
  }
  else {
    logger.warn(`ember-intl: translation: '${key}' on locale: '${locales.join(', ')}' was not found.`);
  }

  return `Missing translation: ${key}`;
}
