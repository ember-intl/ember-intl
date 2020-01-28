import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';
import links from './links';
import IntlService from '../services/intl';

export type MissingMessageOptions = Record<string, any>;
export interface MissingMessage {
  (this: IntlService, key: string, locales: string[], options?: MissingMessageOptions): string;
}

// @ts-ignore ignore that options is not used
export default function missingMessage(key: string, locales: string[] /*, options */) {
  if (isEmpty(locales)) {
    warn(`[ember-intl] no locale has been set. Documentation: ${links.unsetLocale}`, false, {
      id: 'ember-intl-no-locale-set'
    });

    return `No locale defined.  Unable to resolve translation: "${key}"`;
  }

  const localeNames = locales.join(', ');

  warn(`[ember-intl] translation: "${key}" on locale: "${localeNames}" was not found.`, false, {
    id: 'ember-intl-missing-translation'
  });

  return `Missing translation "${key}" for locale "${localeNames}"`;
}
