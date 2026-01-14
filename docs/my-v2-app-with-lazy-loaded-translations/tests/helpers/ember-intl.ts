/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment */
import type { Registry as Services } from '@ember/service';
import { settled } from '@ember/test-helpers';

async function loadTranslations(
  intl: Services['intl'],
  locale: 'de-de' | 'en-us',
) {
  const { default: translations } = await import(
    `../../translations/${locale}.json`
  );

  intl.addTranslations(locale, translations);
}

export function setupIntl(hooks: NestedHooks, locale: string) {
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
