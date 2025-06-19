/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment */
import { settled } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

async function loadTranslations(intl: IntlService, locale: 'de-de' | 'en-us') {
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
