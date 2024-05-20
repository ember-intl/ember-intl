import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel() {
    this.intl.setLocale(['de-DE', 'en-US']);

    this.intl.setOnMissingTranslation((key, locales) => {
      return `🐹🐹🐹 Missing: ${key} (${locales.join(',')}) 🐹🐹🐹`;
    });
  }
}
