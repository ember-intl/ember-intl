import Ember from 'ember';
import links from 'ember-intl/utils/links';

const { warn } = Ember;

export default function missingMessage(key, locales) {
  if (!locales) {
    warn(`[ember-intl] no locale has been set. Documentation: ${links.unsetLocale}`, false, {
      id: 'ember-intl-no-locale-set'
    })
  }
  else {
    warn(`[ember-intl] translation: '${key}' on locale: '${locales.join(', ')}' was not found.`, false, {
      id: 'ember-intl-missing-translation'
    });
  }

  return `Missing translation: ${key}`;
}
