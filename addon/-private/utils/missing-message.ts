import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';
import type { TOptions } from '../../services/intl';

/**
 * @private
 * @hide
 */
export default function missingMessage(key: string, locales: string[], _options: TOptions): string {
  if (isEmpty(locales)) {
    warn(
      `[ember-intl] no locale has been set!  See: https://ember-intl.github.io/ember-intl/docs/quickstart#4-configure-ember-intl`,
      false,
      {
        id: 'ember-intl-no-locale-set',
      }
    );

    return `No locale defined.  Unable to resolve translation: "${key}"`;
  }

  const localeNames = locales.join(', ');

  warn(`[ember-intl] translation: "${key}" on locale: "${localeNames}" was not found.`, false, {
    id: 'ember-intl-missing-translation',
  });

  return `Missing translation "${key}" for locale "${localeNames}"`;
}
