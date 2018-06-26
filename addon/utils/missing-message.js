import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';
import links from './links';

export default function missingMessage(key, locales, options) {
  if (isEmpty(locales)) {
    warn(`[ember-intl] no locale has been set. Documentation: ${links.unsetLocale}`, false, {
      id: 'ember-intl-no-locale-set'
    });

    return `No locale defined.  Unable to resolve translation: "${key}"`;
  }

  if (options.default.length > 0) {
    return undefined; // make `lookup` continue trying the other fallback defaults
  }

  if (options.resilient) {
    return ''; // return empty string in order to not crash consumers
  }

  const localeNames = locales.join(', ');

  warn(`[ember-intl] translation: "${key}" on locale: "${localeNames}" was not found.`, false, {
    id: 'ember-intl-missing-translation'
  });

  return `Missing translation "${key}" for locale "${localeNames}"`;
}
