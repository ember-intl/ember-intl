import Ember from 'ember';
import links from 'ember-intl/utils/links';

const { warn } = Ember;

export default function missingMessage(key, locales) {
  if (!locales) {
    warn(`[ember-intl] no locale has been set. Documentation: ${links.unsetLocale}`)
  }
  else {
    warn(`[ember-intl] translation: '${key}' on locale: '${locales.join(', ')}' was not found.`);
  }

  return `Missing translation: ${key}`;
}
