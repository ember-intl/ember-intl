import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

/**
 * Updates the locale as if the user had changed their preferred language.
 *
 * @function setLocale
 * @param {string} locale
 */
export async function setLocale(locale: string): Promise<void> {
  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl') as IntlService;

  intl.setLocale(locale);

  await settled();
}
