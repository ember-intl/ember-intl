import type { Registry as Services } from '@ember/service';
import { settled } from '@ember/test-helpers';

const translationModules = {
  'de-de': () => import('virtual:ember-intl/translations/de-de'),
  'en-us': () => import('virtual:ember-intl/translations/en-us'),
} as const;

async function loadTranslations(
  intl: Services['intl'],
  locale: 'de-de' | 'en-us',
): Promise<void> {
  const { default: translations } = await translationModules[locale]();

  intl.addTranslations(locale, translations);
}

export function setupIntl(hooks: NestedHooks, locale: string): void {
  hooks.beforeEach(async function () {
    const intl = this.owner.lookup('service:intl');

    await Promise.allSettled([
      loadTranslations(intl, 'de-de'),
      loadTranslations(intl, 'en-us'),
    ]);

    intl.setLocale([locale]);

    await settled();
  });
}
