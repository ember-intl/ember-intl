/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';
// @ts-expect-error: Incorrect type
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
// @ts-expect-error: Incorrect type
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.intl.addTranslations('de-de', translationsForDeDe);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.intl.addTranslations('en-us', translationsForEnUs);

    this.intl.setLocale(['de-de', 'en-us']);

    this.intl.setOnFormatjsError((error) => {
      switch (error.code) {
        case 'FORMAT_ERROR':
        case 'MISSING_TRANSLATION': {
          // Do nothing
          break;
        }

        default: {
          throw error;
        }
      }
    });

    this.intl.setOnMissingTranslation((key, locales) => {
      return `🐹🐹🐹 Missing: ${key} (${locales.join(', ')}) 🐹🐹🐹`;
    });
  }
}
