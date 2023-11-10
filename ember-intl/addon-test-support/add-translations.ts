import { assert } from '@ember/debug';
import { get } from '@ember/object';
import type { TestContext } from '@ember/test-helpers';
import { getContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { Translations } from 'ember-intl/types';

function pickLastLocale(localeName: string | string[]): string {
  if (typeof localeName === 'string') {
    return localeName;
  }

  return localeName[localeName.length - 1]!;
}

/**
 * Invokes the `addTranslations` method of the `intl` service. The first
 * parameter, the `localeName`, is optional and will default to the last
 * currently enabled locale. This means, that if you invoke this helper with
 * just translations, they will be added to the last locale and all other
 * locales will be tried before.
 *
 * @function addTranslations
 * @param {string} [localeName]
 * @param {object} translations
 */
export default function addTranslations(translations: Translations): void;
export default function addTranslations(
  localeName: string,
  translations: Translations,
): void;
export default function addTranslations(
  localeNameOrTranslations: string | Translations,
  translations?: Translations,
): void {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test context has no owner. Did you forget to call `setupTest(hooks)`, `setupContext(this)` or some other test helper?',
    typeof owner === 'object' && typeof owner.lookup === 'function',
  );

  const intl = owner.lookup('service:intl') as IntlService;

  if (typeof localeNameOrTranslations === 'object') {
    const localeName = pickLastLocale(get(intl, 'locale'));
    const translations = localeNameOrTranslations;

    intl.addTranslations(localeName, translations);

    return;
  }

  intl.addTranslations(localeNameOrTranslations, translations!);
}
