import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  async beforeModel() {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['en-us']);
  }

  private async loadTranslations(locale: 'de-de' | 'en-us') {
    const response = await fetch(`/translations/${locale}.json`);
    const translations = await response.json();

    this.intl.addTranslations(locale, translations);
  }
}
