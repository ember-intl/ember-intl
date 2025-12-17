/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel() {
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
