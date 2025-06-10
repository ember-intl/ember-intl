import { getContext, settled, type TestContext } from '@ember/test-helpers';

/**
 * Updates the locale as if the user had changed their preferred language.
 *
 * @function setLocale
 * @param {string} locale
 */
export async function setLocale(locale: string): Promise<void> {
  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl');

  intl.setLocale(locale);

  await settled();
}
